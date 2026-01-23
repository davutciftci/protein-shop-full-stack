import prisma from '../utils/prisma';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../utils/customErrors';
import { OrderStatus } from '../../generated/prisma';

export const canUserReviewProduct = async (userId: number, productId: number, orderId: number): Promise<boolean> => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId,
            status: OrderStatus.DELIVERED,
            items: {
                some: {
                    productId
                }
            }
        }
    });

    return !!order;
};

export const createReview = async (
    userId: number,
    productId: number,
    orderId: number,
    orderItemId: number,
    rating: number,
    comment: string
) => {
    const canReview = await canUserReviewProduct(userId, productId, orderId);
    if (!canReview) {
        throw new BadRequestError('Bu ürün için yorum yapamazsınız. Ürün satın alınmalı ve teslim edilmiş olmalıdır.');
    }

    const existingReview = await prisma.productComment.findFirst({
        where: { userId, productId, orderId, orderItemId }
    });

    if (existingReview) {
        throw new BadRequestError('Bu ürün için zaten yorum yaptınız');
    }

    return await prisma.productComment.create({
        data: {
            userId,
            productId,
            orderId,
            orderItemId,
            rating,
            comment,
            isApproved: false
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
};

export const getProductReviews = async (productId: number) => {
    return await prisma.productComment.findMany({
        where: {
            productId,
            isApproved: true
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getAllApprovedReviews = async (limit: number = 10) => {
    return await prisma.productComment.findMany({
        where: {
            isApproved: true
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
};

export const getUserReviewableOrders = async (userId: number) => {
    const orders = await prisma.order.findMany({
        where: {
            userId,
            status: OrderStatus.DELIVERED
        },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    },
                    variant: true,
                    productComments: {
                        where: {
                            userId
                        }
                    }
                }
            }
        },
        orderBy: {
            deliveredAt: 'desc'
        }
    });

    return orders;
};
