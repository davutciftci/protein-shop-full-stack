import { Request, Response, NextFunction } from 'express';
import {
    getCommentsByProductId,
    getCommentsByUserId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    approveComment,
} from '../services/productComment';
import { UserRole } from '../../generated/prisma';
import prisma from '../utils/prisma';
import { AuthenticatedRequest } from '../middlewares/auth';


export const getProductComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const productId = parseInt(req.params.productId);
        console.log('[CommentController] getProductComments - Product ID:', productId);

        const comments = await getCommentsByProductId(productId, true);

        console.log('[CommentController] getProductComments - Success, returned:', comments.length, 'comments');

        res.status(200).json({
            status: 'success',
            results: comments.length,
            data: comments,
        });
    } catch (error) {
        console.log('[CommentController] getProductComments - Error:', error);
        next(error);
    }
};


export const getMyComments = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[CommentController] getMyComments - User ID:', userId);

        const comments = await getCommentsByUserId(userId);

        console.log('[CommentController] getMyComments - Success, returned:', comments.length, 'comments');

        res.status(200).json({
            status: 'success',
            results: comments.length,
            data: comments,
        });
    } catch (error) {
        console.log('[CommentController] getMyComments - Error:', error);
        next(error);
    }
};

export const getAllComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const productId = req.query.productId ? parseInt(req.query.productId as string) : undefined;
        console.log('[CommentController] getAllComments - Product ID:', productId);

        let comments;
        if (productId) {
            comments = await getCommentsByProductId(productId, false);
        } else {
            comments = await prisma.productComment.findMany({
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
                orderBy: { createdAt: 'desc' },
            });
        }

        console.log('[CommentController] getAllComments - Success, returned:', comments.length, 'comments');

        res.status(200).json({
            status: 'success',
            results: comments.length,
            data: comments,
        });
    } catch (error) {
        console.log('[CommentController] getAllComments - Error:', error);
        next(error);
    }
};

export const getComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[CommentController] getComment - ID:', id);

        const comment = await getCommentById(id);

        console.log('[CommentController] getComment - Success');

        res.status(200).json({
            status: 'success',
            data: comment,
        });
    } catch (error) {
        console.log('[CommentController] getComment - Error:', error);
        next(error);
    }
};

export const createNewComment = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[CommentController] createNewComment - Body:', req.body, 'User ID:', userId);

        const comment = await createComment(req.body, userId);

        console.log('[CommentController] createNewComment - Success, comment ID:', comment.id);

        res.status(201).json({
            status: 'success',
            message: 'Yorumunuz başarıyla oluşturuldu. Admin onayından sonra yayınlanacaktır.',
            data: comment,
        });
    } catch (error) {
        console.log('[CommentController] createNewComment - Error:', error);
        next(error);
    }
};

export const updateCommentById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user?.userId!;
        console.log('[CommentController] updateCommentById - ID:', id, 'Body:', req.body, 'User ID:', userId);

        const comment = await updateComment(id, req.body, userId);

        console.log('[CommentController] updateCommentById - Success');

        res.status(200).json({
            status: 'success',
            message: 'Yorumunuz güncellendi. Admin onayından sonra yayınlanacaktır.',
            data: comment,
        });
    } catch (error) {
        console.log('[CommentController] updateCommentById - Error:', error);
        next(error);
    }
};


export const deleteCommentById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user?.userId!;
        const isAdmin = req.user?.role === UserRole.ADMIN;
        console.log('[CommentController] deleteCommentById - ID:', id, 'User ID:', userId, 'Is Admin:', isAdmin);

        await deleteComment(id, userId, isAdmin);

        console.log('[CommentController] deleteCommentById - Success');

        res.status(204).send();
    } catch (error) {
        console.log('[CommentController] deleteCommentById - Error:', error);
        next(error);
    }
};

export const approveCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const { isApproved } = req.body;
        console.log('[CommentController] approveCommentById - ID:', id, 'isApproved:', isApproved);

        const comment = await approveComment(id, isApproved);

        console.log('[CommentController] approveCommentById - Success');

        res.status(200).json({
            status: 'success',
            message: isApproved ? 'Yorum onaylandı' : 'Yorum reddedildi',
            data: comment,
        });
    } catch (error) {
        console.log('[CommentController] approveCommentById - Error:', error);
        next(error);
    }
};