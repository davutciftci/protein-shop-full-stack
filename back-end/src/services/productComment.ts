import prisma from '../utils/prisma';
import { NotFoundError, UnauthorizedError, BadRequestError } from '../utils/customErrors';
import { ProductCommentWhereInput } from '../types';

export const getCommentsByProductId = async (productId: number, approvedOnly: boolean = true) => {
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        throw new NotFoundError('Ürün bulunamadı');
    }

    const where: ProductCommentWhereInput = { productId };
    if (approvedOnly) {
        where.isApproved = true;
    }

    const comments = await prisma.productComment.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return comments;
};

export const getCommentsByUserId = async (userId: number) => {

    const comments = await prisma.productComment.findMany({
        where: { userId },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return comments;
};

export const getCommentById = async (id: number) => {
    const comment = await prisma.productComment.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    if (!comment) {
        throw new NotFoundError('Yorum bulunamadı');
    }

    return comment;
};


export const createComment = async (
    data: {
        rating: number;
        comment: string;
        productId: number;
    },
    userId: number
) => {
    const product = await prisma.product.findUnique({
        where: { id: data.productId },
    });

    if (!product) {
        throw new NotFoundError('Ürün bulunamadı');
    }

    if (!product.isActive) {
        throw new BadRequestError('Pasif bir ürüne yorum yapılamaz');
    }

    const existingComment = await prisma.productComment.findFirst({
        where: {
            userId,
            productId: data.productId,
        },
    });

    if (existingComment) {
        throw new BadRequestError('Bu ürüne zaten yorum yaptınız. Yorumunuzu güncelleyebilirsiniz.');
    }

    const comment = await prisma.productComment.create({
        data: {
            rating: data.rating,
            comment: data.comment,
            productId: data.productId,
            userId,
            isApproved: false,
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    return comment;
};

export const updateComment = async (
    id: number,
    data: {
        rating?: number;
        comment?: string;
    },
    userId: number
) => {
    const existingComment = await getCommentById(id);

    if (existingComment.userId !== userId) {
        throw new UnauthorizedError('Bu yorumu güncelleme yetkiniz yok');
    }

    const comment = await prisma.productComment.update({
        where: { id },
        data: {
            ...data,
            isApproved: false,
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    return comment;
};

export const deleteComment = async (id: number, userId: number, isAdmin: boolean = false) => {
    const existingComment = await getCommentById(id);

    if (!isAdmin && existingComment.userId !== userId) {
        throw new UnauthorizedError('Bu yorumu silme yetkiniz yok');
    }

    const comment = await prisma.productComment.delete({
        where: { id },
    });

    return comment;
};

export const approveComment = async (id: number, isApproved: boolean) => {
    await getCommentById(id);

    const comment = await prisma.productComment.update({
        where: { id },
        data: { isApproved },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    return comment;
};