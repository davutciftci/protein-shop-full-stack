import prisma from '../utils/prisma';
import { NotFoundError, BadRequestError } from '../utils/customErrors';

export const getOrCreateCart = async (userId: number) => {
    console.log('[CartService] getOrCreateCart called with userId:', userId);

    let cart = await prisma.cart.findUnique({
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
                orderBy: { createdAt: 'desc' },
            },
        },
    });

    if (!cart) {
        console.log('[CartService] Cart not found, creating new cart for user:', userId);
        cart = await prisma.cart.create({
            data: { userId },
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
        });
    }

    console.log('[CartService] Cart retrieved/created with', cart.items.length, 'items');
    return cart;
};


export const addToCart = async (userId: number, variantId: number, quantity: number) => {
    console.log('[CartService] addToCart called with userId:', userId, 'variantId:', variantId, 'quantity:', quantity);

    const variant = await prisma.productVariant.findUnique({
        where: { id: variantId },
        include: {
            product: true,
        },
    });

    if (!variant) {
        console.log('[CartService] Variant not found:', variantId);
        throw new NotFoundError('Ürün varyantı bulunamadı');
    }

    if (!variant.isActive || !variant.product.isActive) {
        console.log('[CartService] Variant or product is not active');
        throw new BadRequestError('Bu ürün şu an satışta değil');
    }

    if (variant.stockCount < quantity) {
        console.log('[CartService] Insufficient stock. Available:', variant.stockCount, 'Requested:', quantity);
        throw new BadRequestError(`Yetersiz stok. Mevcut: ${variant.stockCount}`);
    }

    const cart = await getOrCreateCart(userId);

    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_variantId: {
                cartId: cart.id,
                variantId,
            },
        },
    });

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (variant.stockCount < newQuantity) {
            console.log('[CartService] Insufficient stock for update. Available:', variant.stockCount, 'Requested:', newQuantity);
            throw new BadRequestError(`Yetersiz stok. Mevcut: ${variant.stockCount}`);
        }

        console.log('[CartService] Item already in cart, updating quantity from', existingItem.quantity, 'to', newQuantity);

        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: newQuantity },
        });
    } else {
        console.log('[CartService] Adding new item to cart');

        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                variantId,
                quantity,
            },
        });
    }

    return await getOrCreateCart(userId);
};


export const updateCartItemQuantity = async (userId: number, itemId: number, quantity: number) => {
    console.log('[CartService] updateCartItemQuantity called with userId:', userId, 'itemId:', itemId, 'quantity:', quantity);

    const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
            cart: true,
            variant: true,
        },
    });

    if (!cartItem) {
        console.log('[CartService] Cart item not found:', itemId);
        throw new NotFoundError('Sepet ürünü bulunamadı');
    }

    if (cartItem.cart.userId !== userId) {
        console.log('[CartService] Cart does not belong to user');
        throw new BadRequestError('Bu sepet size ait değil');
    }

    if (cartItem.variant.stockCount < quantity) {
        console.log('[CartService] Insufficient stock. Available:', cartItem.variant.stockCount, 'Requested:', quantity);
        throw new BadRequestError(`Yetersiz stok. Mevcut: ${cartItem.variant.stockCount}`);
    }

    await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
    });

    console.log('[CartService] Cart item quantity updated');
    return await getOrCreateCart(userId);
};


export const removeFromCart = async (userId: number, itemId: number) => {
    console.log('[CartService] removeFromCart called with userId:', userId, 'itemId:', itemId);

    const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
            cart: true,
        },
    });

    if (!cartItem) {
        console.log('[CartService] Cart item not found:', itemId);
        throw new NotFoundError('Sepet ürünü bulunamadı');
    }

    if (cartItem.cart.userId !== userId) {
        console.log('[CartService] Cart does not belong to user');
        throw new BadRequestError('Bu sepet size ait değil');
    }

    await prisma.cartItem.delete({
        where: { id: itemId },
    });

    console.log('[CartService] Item removed from cart');
    return await getOrCreateCart(userId);
};

export const clearCart = async (userId: number) => {
    console.log('[CartService] clearCart called with userId:', userId);

    const cart = await getOrCreateCart(userId);

    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });

    console.log('[CartService] Cart cleared');
    return await getOrCreateCart(userId);
};