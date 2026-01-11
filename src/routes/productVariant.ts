import { Router } from 'express';
import {
    getProductVariants,
    getVariant,
    createNewVariant,
    updateVariantById,
    deleteVariantById,
} from '../controllers/productVariant';
import { authenticate } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validate';
import { createVariantSchema, updateVariantSchema } from '../validators/productVariant';
import { UserRole } from "../../generated/prisma";

const router = Router();


router.use((req, res, next) => {
    console.log(`[VariantRoutes] ${req.method} ${req.originalUrl}`);
    next();
});


router.get('/product/:productId', getProductVariants);
router.get('/:id', getVariant);

router.post(
    '/',
    authenticate,
    requireRole(UserRole.ADMIN),
    validate(createVariantSchema),
    createNewVariant
);

router.put(
    '/:id',
    authenticate,
    requireRole(UserRole.ADMIN),
    validate(updateVariantSchema),
    updateVariantById
);

router.delete(
    '/:id',
    authenticate,
    requireRole(UserRole.ADMIN),
    deleteVariantById
);

export default router;