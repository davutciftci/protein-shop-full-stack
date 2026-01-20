import prisma from '../utils/prisma';
import { NotFoundError, UnauthorizedError, BadRequestError } from '../utils/customErrors';
import { ProductCommentWhereInput } from '../types';

export const getCommentsByProductId = async (productId: number, approvedOnly: boolean = true) => {
    console.log('[CommentService] getCommentsByProductId called with productId:', productId, 'approvedOnly:', approvedOnly);

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        console.log('[CommentService] Product not found:', productId);
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

    console.log('[CommentService] Found comments:', comments.length);
    return comments;
};

export const getCommentsByUserId = async (userId: number) => {
    console.log('[CommentService] getCommentsByUserId called with userId:', userId);

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

    console.log('[CommentService] Found comments:', comments.length);
    return comments;
};

export const getCommentById = async (id: number) => {
    console.log('[CommentService] getCommentById called with id:', id);

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
        console.log('[CommentService] Comment not found:', id);
        throw new NotFoundError('Yorum bulunamadı');
    }

    console.log('[CommentService] Comment found:', comment.id);
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
    console.log('[CommentService] createComment called with data:', data, 'userId:', userId);

    const product = await prisma.product.findUnique({
        where: { id: data.productId },
    });

    if (!product) {
        console.log('[CommentService] Product not found:', data.productId);
        throw new NotFoundError('Ürün bulunamadı');
    }

    if (!product.isActive) {
        console.log('[CommentService] Product is not active:', data.productId);
        throw new BadRequestError('Pasif bir ürüne yorum yapılamaz');
    }

    const existingComment = await prisma.productComment.findFirst({
        where: {
            userId,
            productId: data.productId,
        },
    });

    if (existingComment) {
        console.log('[CommentService] User already commented on this product');
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

    console.log('[CommentService] Comment created successfully:', comment.id);
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
    console.log('[CommentService] updateComment called with id:', id, 'data:', data, 'userId:', userId);

    const existingComment = await getCommentById(id);

    if (existingComment.userId !== userId) {
        console.log('[CommentService] User is not the owner of this comment');
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

    console.log('[CommentService] Comment updated successfully:', comment.id);
    return comment;
};

export const deleteComment = async (id: number, userId: number, isAdmin: boolean = false) => {
    console.log('[CommentService] deleteComment called with id:', id, 'userId:', userId, 'isAdmin:', isAdmin);

    const existingComment = await getCommentById(id);

    if (!isAdmin && existingComment.userId !== userId) {
        console.log('[CommentService] User is not authorized to delete this comment');
        throw new UnauthorizedError('Bu yorumu silme yetkiniz yok');
    }

    const comment = await prisma.productComment.delete({
        where: { id },
    });

    console.log('[CommentService] Comment deleted successfully:', id);
    return comment;
};

export const approveComment = async (id: number, isApproved: boolean) => {
    console.log('[CommentService] approveComment called with id:', id, 'isApproved:', isApproved);

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

    console.log('[CommentService] Comment approval status updated:', comment.id, 'isApproved:', isApproved);
    return comment;
};