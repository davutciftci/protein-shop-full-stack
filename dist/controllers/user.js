"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const user_1 = require("../services/user");
const errorHandler_1 = require("../utils/errorHandler");
const prisma_1 = __importDefault(require("../utils/prisma"));
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, tcNo, password, birth_date } = req.body;
        if (!firstName || !lastName || !email || !tcNo || !password || !birth_date) {
            return res.status(400).json({
                status: "error",
                message: 'Tüm alanları doldurun'
            });
        }
        const user = await (0, user_1.createUser)({
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
    }
    catch (error) {
        console.error('Register error:', error);
        if (error.code === 'P2002') {
            return res.status(409).json({
                status: "error",
                message: 'Bu TC Kimlik No veya E-posta adresi ile zaten bir kayıt mevcut.'
            });
        }
        return res.status(500).json({
            status: "error",
            message: 'Bir hata oluştu',
            error: error.message || 'Unknown error'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'email ve şifre gerekli'
            });
        }
        const { user, token } = await (0, user_1.loginUser)(email, password);
        return res.status(200).json({
            status: 'success',
            message: 'Giriş yapıldı',
            data: { user, token },
        });
    }
    catch (error) {
        console.error('Login error');
        const message = (0, errorHandler_1.getErrorMessage)(error);
        res.status(401).json({
            status: 'error',
            message,
        });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const user = await prisma_1.default.user.findUnique({
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
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Kullanıcı bulunamadı',
            });
        }
        res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
        console.error('Get profile error');
        res.status(500).json({
            status: 'error',
            message: (0, errorHandler_1.getErrorMessage)(error),
        });
    }
};
exports.getProfile = getProfile;
