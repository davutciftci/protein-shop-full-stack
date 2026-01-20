import { Router } from 'express';
import { getAllShippingMethods } from '../controllers/shipping';

const router = Router();

router.get('/', getAllShippingMethods);

export default router;
