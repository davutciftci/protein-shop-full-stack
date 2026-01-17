import { NextFunction, Request, Response } from 'express';
import { createUser, loginUser } from '../services/user';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth';
import prisma from '../utils/prisma';
import { NotFoundError } from '../utils/customErrors';


interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    tcNo: string;
    password: string;
    birth_date: string;
}

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, tcNo, password, birth_date } = req.body as RegisterRequest;
        const user = await createUser({
            firstName,
            lastName,
            email,
            tcNo,
            password,
            birthDay: new Date(birth_date)
        });

        const { hashedPassword, ...userWithoutPassword } = user;

        return res.status(201).json({
            status: "success",
            message: 'Kullanıcı başarıyla oluşturuldu',
            data: userWithoutPassword
        });
    } catch (error) {
        next(error)
    }

});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser(email, password);

        return res.status(200).json({
            status: 'success',
            message: 'Giriş yapıldı',
            data: { user, token },
        });
    } catch (error) {
        next(error)
    }
});

export const getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = (req as AuthenticatedRequest).user?.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                tcNo: true,
                birthDay: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!userId) {
            throw new NotFoundError('Kullanıcı bulunamadı');
        }

        return res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        next(error)
    }

});