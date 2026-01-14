import prisma from "../utils/prisma"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { ConflictError, UnauthorizedError } from "../utils/customErrors";
import { sendWelcomeEmail } from "./mail";

export const createUser = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tcNo: string;
    birthDay: Date;
}) => {

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: userData.email },
                { tcNo: userData.tcNo }
            ]
        }
    });

    if (existingUser) {
        if (existingUser.email === userData.email) {
            throw new ConflictError('Bu email zaten kullanılıyor');
        }
        throw new ConflictError('Bu TC numarası zaten kullanılıyor');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            hashedPassword,
            tcNo: userData.tcNo,
            birthDay: userData.birthDay
        }
    })

    sendWelcomeEmail(user.email, user.firstName).catch(err => console.error(err));

    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new UnauthorizedError('Email veya şifre hatalı');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
        throw new UnauthorizedError('Email veya şifre hatalı');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    const { hashedPassword, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
}