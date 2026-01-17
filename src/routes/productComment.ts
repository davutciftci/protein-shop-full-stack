import { Router } from 'express';
import {
    getProductComments,
    getMyComments,
    getAllComments,
    getComment,
    createNewComment,
    updateCommentById,
    deleteCommentById,
    approveCommentById,
} from '../controllers/productComment';
import { authenticate } from '../middlewares/auth';
import { requireRole } from '../middlewares/role';
import { validate } from '../middlewares/validate';
import { createCommentSchema, updateCommentSchema, approveCommentSchema } from '../validators/productComment';
import { UserRole } from '../../generated/prisma';

const router = Router();

router.use((req, res, next) => {
    console.log(`[CommentRoutes] ${req.method} ${req.originalUrl}`);
    next();
});

router.get('/product/:productId', getProductComments);
router.get('/:id', getComment);

router.get('/my/comments', authenticate, getMyComments);
router.post(
    '/',
    authenticate,
    validate(createCommentSchema),
    createNewComment
);
router.put(
    '/:id',
    authenticate,
    validate(updateCommentSchema),
    updateCommentById
);
router.delete('/:id', authenticate, deleteCommentById);

router.get(
    '/admin/all',
    authenticate,
    requireRole(UserRole.ADMIN),
    getAllComments
);

router.patch(
    '/:id/approve',
    authenticate,
    requireRole(UserRole.ADMIN),
    validate(approveCommentSchema),
    approveCommentById
);

export default router;