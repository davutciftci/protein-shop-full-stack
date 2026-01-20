import { z } from 'zod';
import { OrderStatus } from '../../generated/prisma';

export const createOrderSchema = z.object({
    addressId: z
        .number({ message: 'Adres ID gerekli' })
        .int('Adres ID tam sayı olmalı')
        .positive('Geçersiz adres ID'),

    paymentMethod: z
        .string({ message: 'Ödeme yöntemi gerekli' })
        .min(2, 'Ödeme yöntemi en az 2 karakter olmalı'),
});


export const updateOrderStatusSchema = z.object({
    status: z.nativeEnum(OrderStatus),

    trackingNumber: z
        .string()
        .optional(),

    cancelReason: z
        .string()
        .max(500, 'İptal nedeni en fazla 500 karakter olmalı')
        .optional(),
});