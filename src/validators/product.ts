import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string({ message: "Ürün adı gerekli" })
        .min(2, "Ürün adı en az 2 karakter olmalı")
        .max(200, "Ürün adı en fazla 200 karakter olmalı"),

    slug: z.string({ message: "Slug gerekli" })
        .min(2, "Slug en az 2 karakter olmalı")
        .max(200, "Slug en fazla 200 karakter olmalı")
        .regex(/^[a-z0-9-]+$/, "Slug sadece küçük harf, rakam ve kısa çizgi içerebilir"),

    description: z.string({ message: "Açıklama gerekli" })
        .max(500, "açıklama en fazla 500 karakter olmalı")
        .optional(),

    price: z.number({ message: "Fiyat gerekli" })
        .positive("Fiyat 0\dan büyük olmalı")
        .max(999999.99, "Fiyat çok yüksek"),

    stockCount: z.number({ message: "Stok gerekli" })
        .int("Stok tam sayı olmalı")
        .nonnegative("Stok 0\dan büyük olmalı")
        .optional()
        .default(0),

    isActive: z.boolean()
        .optional()
        .default(true),
})

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
    categoryId: z.string()
        .transform((val) => parseInt(val))
        .pipe(z.number().int().positive())
        .optional(),

    activeOnly: z.string()
        .transform((val) => val === "true")
        .optional(),

    minPrice: z.string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().nonnegative())
        .optional(),

    maxPrice: z.string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive())
        .optional(),
})
