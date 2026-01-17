import { z } from 'zod';

export const createAddressSchema = z.object({
    title: z
        .string({ message: 'Adres başlığı gerekli' })
        .min(2, 'Adres başlığı en az 2 karakter olmalı')
        .max(50, 'Adres başlığı en fazla 50 karakter olmalı'),

    fullName: z
        .string({ message: 'Ad Soyad gerekli' })
        .min(3, 'Ad Soyad en az 3 karakter olmalı')
        .max(100, 'Ad Soyad en fazla 100 karakter olmalı'),

    phoneNumber: z
        .string({ message: 'Telefon numarası gerekli' })
        .regex(/^[0-9]{10}$/, 'Telefon numarası 10 haneli olmalı (örn: 5551234567)'),

    addressLine1: z
        .string({ message: 'Adres satırı gerekli' })
        .min(10, 'Adres en az 10 karakter olmalı')
        .max(500, 'Adres en fazla 500 karakter olmalı'),

    addressLine2: z
        .string()
        .max(500, 'Ek adres en fazla 500 karakter olmalı')
        .optional(),

    city: z
        .string({ message: 'Şehir gerekli' })
        .min(2, 'Şehir en az 2 karakter olmalı')
        .max(50, 'Şehir en fazla 50 karakter olmalı'),

    district: z
        .string({ message: 'İlçe gerekli' })
        .min(2, 'İlçe en az 2 karakter olmalı')
        .max(50, 'İlçe en fazla 50 karakter olmalı'),

    postalCode: z
        .string()
        .regex(/^[0-9]{5}$/, 'Posta kodu 5 haneli olmalı')
        .optional(),

    isDefault: z
        .boolean()
        .optional()
        .default(false),
});

export const updateAddressSchema = createAddressSchema.partial();