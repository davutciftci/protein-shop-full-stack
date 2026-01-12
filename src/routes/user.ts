import { Router } from "express";
import { getProfile, login, register } from "../controllers/user";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth";
import { loginSchema, registerSchema } from "../validators/user";
import { validate } from "../middlewares/validate";
import { UserRole } from '../../generated/prisma';
import { requireRole } from "../middlewares/roleMiddleware";

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
//korumalı route
router.get('/profile', authenticate, getProfile);
router.get('/admin-only', authenticate, requireRole(UserRole.ADMIN), (req, res) => {
    res.json({
        status: 'success',
        user: (req as AuthenticatedRequest).user
    })
})

export default router;