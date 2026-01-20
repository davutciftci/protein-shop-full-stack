import { Router } from 'express';
import {
    getMyOrders,
    getOrders,
    getOrder,
    createNewOrder,
    updateStatus,
    cancelUserOrder,
} from '../controllers/order';
import { authenticate } from '../middlewares/auth';
import { requireRole } from '../middlewares/role';
import { validate } from '../middlewares/validate';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/order';
import { UserRole } from '../../generated/prisma';

const router = Router();

// Route logging middleware
router.use((req, res, next) => {
    console.log(`[OrderRoutes] ${req.method} ${req.originalUrl}`);
    next();
});

// Tüm route'lar private (authenticate gerekli)
router.use(authenticate);

// Customer routes
router.get('/my', getMyOrders); // Kendi siparişlerim
router.get('/:id', getOrder); // Tek sipariş (kendi siparişi veya admin)
router.post('/', validate(createOrderSchema), createNewOrder); // Sipariş oluştur
router.post('/:id/cancel', cancelUserOrder); // Sipariş iptal et

// Admin-only routes
router.get(
    '/',
    requireRole(UserRole.ADMIN),
    getOrders
); // Tüm siparişler

router.patch(
    '/:id/status',
    requireRole(UserRole.ADMIN),
    validate(updateOrderStatusSchema),
    updateStatus
); // Sipariş durumu güncelle

export default router;