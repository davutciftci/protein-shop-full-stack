import prisma from '../utils/prisma';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../utils/customErrors';
import { OrderStatus } from '../../generated/prisma';
import { sendOrderCancelledEmail, sendOrderConfirmationEmail, sendOrderShippedEmail } from './mail';
import { OrderWithRelations } from '../types';

const generateOrderNumber = async (): Promise<string> => {
    const year = new Date().getFullYear();
    const prefix = `ORD-${year}-`;

    const count = await prisma.order.count({
        where: {
            orderNumber: {
                startsWith: prefix,
            },
        },
    });


    const sequence = String(count + 1).padStart(4, '0');

    return `${prefix}${sequence}`;
};


export const getOrdersByUserId = async (userId: number) => {
    console.log('[OrderService] getOrdersByUserId called with userId:', userId);

    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: {
                    variant: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    console.log('[OrderService] Found orders:', orders.length);
    return orders;
};


export const getAllOrders = async () => {
    console.log('[OrderService] getAllOrders called');

    const orders = await prisma.order.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            items: {
                include: {
                    variant: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    console.log('[OrderService] Found orders:', orders.length);
    return orders;
};


export const getOrderById = async (id: number) => {
    console.log('[OrderService] getOrderById called with id:', id);

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            items: {
                include: {
                    variant: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!order) {
        console.log('[OrderService] Order not found:', id);
        throw new NotFoundError('Sipariş bulunamadı');
    }

    console.log('[OrderService] Order found:', order.id);
    return order;
};


export const createOrder = async (
    userId: number,
    addressId: number,
    paymentMethod: string
) => {
    console.log('[OrderService] createOrder called with userId:', userId, 'addressId:', addressId, 'paymentMethod:', paymentMethod);

    const address = await prisma.userAddress.findUnique({
        where: { id: addressId },
    });

    if (!address) {
        console.log('[OrderService] Address not found:', addressId);
        throw new NotFoundError('Adres bulunamadı');
    }

    if (address.userId !== userId) {
        console.log('[OrderService] Address does not belong to user');
        throw new UnauthorizedError('Bu adres size ait değil');
    }

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    variant: {
                        include: {
                            product: true,
                        },
                    },
                },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        console.log('[OrderService] Cart is empty');
        throw new BadRequestError('Sepetiniz boş');
    }

    for (const item of cart.items) {
        if (item.variant.stockCount < item.quantity) {
            console.log('[OrderService] Insufficient stock for variant:', item.variant.id);
            throw new BadRequestError(`Yetersiz stok: ${item.variant.name}`);
        }

        if (!item.variant.isActive || !item.variant.product.isActive) {
            console.log('[OrderService] Variant or product is not active:', item.variant.id);
            throw new BadRequestError(`Bu ürün artık satışta değil: ${item.variant.name}`);
        }
    }

    const subtotal = cart.items.reduce((total, item) => {
        return total + (Number(item.variant.price) * item.quantity);
    }, 0);

    const shippingCost = subtotal > 500 ? 0 : 50;
    const taxAmount = subtotal * 0.18;
    const totalAmount = subtotal + shippingCost + taxAmount;

    const shippingAddressSnapshot = {
        title: address.title,
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        addressLine1: address.addressLine1,
        city: address.city,
        district: address.district,
        postalCode: address.postalCode,
    };

    const orderNumber = await generateOrderNumber();

    const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                orderNumber,
                userId,
                subtotal,
                shippingCost,
                taxAmount,
                totalAmount,
                shippingAddress: shippingAddressSnapshot,
                paymentMethod,
                status: OrderStatus.PENDING,
            },
        });

        for (const item of cart.items) {
            const productSnapshot = {
                productId: item.variant.product.id,
                productName: item.variant.product.name,
                productSlug: item.variant.product.slug,
                variantId: item.variant.id,
                variantName: item.variant.name,
                variantSku: item.variant.sku,
                variantAttributes: item.variant.attributes,
            };

            await tx.orderItem.create({
                data: {
                    orderId: newOrder.id,
                    variantId: item.variant.id,
                    productName: item.variant.product.name,
                    variantName: item.variant.name,
                    sku: item.variant.sku,
                    price: item.variant.price,
                    quantity: item.quantity,
                    subtotal: Number(item.variant.price) * item.quantity,
                    productSnapshot,
                },
            });

            await tx.productVariant.update({
                where: { id: item.variant.id },
                data: {
                    stockCount: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        return newOrder;
    });

    console.log('[OrderService] Order created successfully:', order.id, 'Order number:', orderNumber);

    // Sipariş detaylarını al
    const fullOrder = await getOrderById(order.id);

    // Sipariş onay emaili gönder (asenkron)
    sendOrderConfirmationEmail(fullOrder as OrderWithRelations).catch(err => {
        console.error('[OrderService] Order confirmation email failed:', err);
    });

    return fullOrder;
};

export const updateOrderStatus = async (
    orderId: number,
    status: OrderStatus,
    trackingNumber?: string,
    cancelReason?: string
) => {
    console.log('[OrderService] updateOrderStatus called with orderId:', orderId, 'status:', status);

    const order = await getOrderById(orderId);

    const updateData: any = { status };

    if (status === OrderStatus.CONFIRMED) {
        updateData.paidAt = new Date();
        updateData.paymentStatus = 'paid';
    }

    if (status === OrderStatus.SHIPPED) {
        updateData.shippedAt = new Date();
        if (trackingNumber) {
            updateData.trackingNumber = trackingNumber;
        }
    }

    if (status === OrderStatus.DELIVERED) {
        updateData.deliveredAt = new Date();
    }

    if (status === OrderStatus.CANCELLED) {
        updateData.cancelledAt = new Date();
        if (cancelReason) {
            updateData.cancelReason = cancelReason;
        }

        console.log('[OrderService] Restoring stock for cancelled order');
        await prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                await tx.productVariant.update({
                    where: { id: item.variantId },
                    data: {
                        stockCount: {
                            increment: item.quantity,
                        },
                    },
                });
            }
        });
    }

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: updateData,
    });

    console.log('[OrderService] Order status updated:', updatedOrder.id);
    const fullOrder = await getOrderById(orderId);

    if (status === OrderStatus.SHIPPED) {
        sendOrderShippedEmail(fullOrder as OrderWithRelations).catch(err => {
            console.error('[OrderService] Failed to send order shipped email: ', err);
        });
    }

    if (status === OrderStatus.CANCELLED) {
        sendOrderCancelledEmail(fullOrder as OrderWithRelations).catch(err => {
            console.error('[OrderService] Failed to send order cancelled email: ', err);
        });
    }
    return fullOrder;
};

export const cancelOrder = async (orderId: number, userId: number, cancelReason: string) => {
    console.log('[OrderService] cancelOrder called with orderId:', orderId, 'userId:', userId);

    const order = await getOrderById(orderId);

    if (order.userId !== userId) {
        console.log('[OrderService] Order does not belong to user');
        throw new UnauthorizedError('Bu sipariş size ait değil');
    }

    const cancellableStatuses: OrderStatus[] = [OrderStatus.PENDING, OrderStatus.CONFIRMED];
    if (!cancellableStatuses.includes(order.status)) {
        console.log('[OrderService] Order cannot be cancelled, status:', order.status);
        throw new BadRequestError('Bu sipariş artık iptal edilemez');
    }

    return await updateOrderStatus(orderId, OrderStatus.CANCELLED, undefined, cancelReason);
};