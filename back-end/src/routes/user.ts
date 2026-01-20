import { Router } from "express";
import { getProfile, login, register, requestPasswordResetController, resetPasswordController } from "../controllers/user";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth";
import { loginSchema, registerSchema, requestPasswordResetSchema, resetPasswordSchema } from "../validators/user";
import { validate } from "../middlewares/validate";
import { UserRole } from '../../generated/prisma';
import { requireRole } from "../middlewares/role";

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(requestPasswordResetSchema), requestPasswordResetController);
router.post('/reset-password', validate(resetPasswordSchema), resetPasswordController);
router.get('/profile', authenticate, getProfile);
router.get('/me', authenticate, getProfile);
router.get('/admin-only', authenticate, requireRole(UserRole.ADMIN), (req, res) => {
    res.json({
        status: 'success',
        user: (req as AuthenticatedRequest).user
    })
})

export default router;