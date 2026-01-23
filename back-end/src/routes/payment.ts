import { Router } from 'express';
import {
    makePayment,
    checkPaymentStatus,
    listTestCards,
} from '../controllers/payment';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { processPaymentSchema } from '../validators/payment';


const router = Router();

router.get('/test-cards', listTestCards);

router.post(
    '/process',
    authenticate,
    validate(processPaymentSchema),
    makePayment
);

router.get('/status/:orderId', authenticate, checkPaymentStatus);

export default router;