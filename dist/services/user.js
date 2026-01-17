"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (userData) => {
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            hashedPassword,
            tcNo: userData.tcNo,
            birthDay: userData.birthDay
        }
    });
    return user;
};
exports.createUser = createUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error('Email veya şifre hatalı');
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
        throw new Error('Email veya şifre hatalı');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { hashedPassword, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
exports.loginUser = loginUser;
