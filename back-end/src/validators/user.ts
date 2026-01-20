import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z
        .string({ message: 'İsim gerekli' })
        .min(2, 'İsim en az 2 karakter olmalı')
        .max(25, 'İsim en fazla 25 karakter olmalı'),

    lastName: z
        .string({ message: 'Soyisim gerekli' })
        .min(2, 'Soyisim en az 2 karakter olmalı')
        .max(25, 'Soyisim en fazla 25 karakter olmalı'),

    email: z
        .string({ message: 'Email gerekli' })
        .email('Geçerli bir email adresi girin'),

    tcNo: z
        .string({ message: 'TC Kimlik numarası gerekli' })
        .length(11, 'TC Kimlik numarası 11 haneli olmalı')
        .regex(/^\d+$/, 'TC Kimlik numarası sadece rakamlardan oluşmalı'),

    password: z
        .string({ message: 'Şifre gerekli' })
        .min(6, 'Şifre en az 6 karakter olmalı')
        .max(50, 'Şifre en fazla 50 karakter olmalı'),

    birth_date: z
        .string({ message: 'Doğum tarihi gerekli' })
        .refine((date) => !isNaN(Date.parse(date)), {
            message: 'Geçerli bir tarih formatı girin',
        })
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18;
        }, {
            message: 'En az 18 yaşında olmalısınız',
        })
})

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email gerekli')
        .email('Geçerli bir email adresi girin'),

    password: z
        .string()
        .min(1, 'Şifre boş olamaz')
})

export const requestPasswordResetSchema = z.object({
    email: z
        .string({ message: 'Email gerekli' })
        .email('Geçerli bir email adresi girin')
})

export const resetPasswordSchema = z.object({
    token: z
        .string({ message: 'Reset token gerekli' })
        .min(1, 'Reset token boş olamaz'),

    newPassword: z
        .string({ message: 'Yeni şifre gerekli' })
        .min(6, 'Şifre en az 6 karakter olmalı')
        .max(50, 'Şifre en fazla 50 karakter olmalı')
})