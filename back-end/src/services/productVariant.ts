import prisma from '../utils/prisma';
import { ConflictError, NotFoundError, BadRequestError } from '../utils/customErrors';


export const getVariantsByProductId = async (productId: number) => {
    console.log('[VariantService] getVariantsByProductId called with productId:', productId);


    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        console.log('[VariantService] Product not found:', productId);
        throw new NotFoundError('Ürün bulunamadı');
    }

    const variants = await prisma.productVariant.findMany({
        where: { productId },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    console.log('[VariantService] Found variants:', variants.length);
    return variants;
};


export const getVariantById = async (id: number) => {
    console.log('[VariantService] getVariantById called with id:', id);

    const variant = await prisma.productVariant.findUnique({
        where: { id },
        include: {
            product: true,
        },
    });

    if (!variant) {
        console.log('[VariantService] Variant not found:', id);
        throw new NotFoundError('Varyant bulunamadı');
    }

    console.log('[VariantService] Variant found:', variant.id);
    return variant;
};

export const createVariant = async (data: {
    name: string;
    sku: string;
    price: number;
    stockCount?: number;
    productId: number;
    discount?: number;
    aroma?: string;
    size?: string;
    servings?: string;
    isActive?: boolean;
}) => {
    console.log('[VariantService] createVariant called with data:', data);


    const existingVariant = await prisma.productVariant.findUnique({
        where: { sku: data.sku },
    });

    if (existingVariant) {
        console.log('[VariantService] SKU already exists:', data.sku);
        throw new ConflictError('Bu SKU zaten kullanılıyor');
    }

    const product = await prisma.product.findUnique({
        where: { id: data.productId },
    });

    if (!product) {
        console.log('[VariantService] Product not found:', data.productId);
        throw new NotFoundError('Ürün bulunamadı');
    }

    if (!product.isActive) {
        console.log('[VariantService] Product is not active:', data.productId);
        throw new BadRequestError('Pasif bir ürüne varyant eklenemez');
    }

    const variant = await prisma.productVariant.create({
        data: {
            name: data.name,
            sku: data.sku,
            price: data.price,
            stockCount: data.stockCount ?? 0,
            productId: data.productId,
            discount: data.discount,
            aroma: data.aroma,
            size: data.size,
            servings: data.servings,
            isActive: data.isActive ?? true,
        },
        include: {
            product: true,
        },
    });

    console.log('[VariantService] Variant created successfully:', variant.id);
    return variant;
};

export const updateVariant = async (
    id: number,
    data: {
        name?: string;
        sku?: string;
        price?: number;
        stockCount?: number;
        discount?: number;
        aroma?: string;
        size?: string;
        servings?: string;
        isActive?: boolean;
    }
) => {
    console.log('[VariantService] updateVariant called with id:', id, 'data:', data);

    await getVariantById(id);

    if (data.sku) {
        const existingVariant = await prisma.productVariant.findUnique({
            where: { sku: data.sku },
        });

        if (existingVariant && existingVariant.id !== id) {
            console.log('[VariantService] SKU already exists on another variant:', data.sku);
            throw new ConflictError('Bu SKU zaten başka bir varyantта kullanılıyor');
        }
    }

    const variant = await prisma.productVariant.update({
        where: { id },
        data,
        include: {
            product: true,
        },
    });

    console.log('[VariantService] Variant updated successfully:', variant.id);
    return variant;
};


export const deleteVariant = async (id: number) => {
    console.log('[VariantService] deleteVariant called with id:', id);

    await getVariantById(id);

    const variant = await prisma.productVariant.delete({
        where: { id },
    });

    console.log('[VariantService] Variant deleted successfully:', id);
    return variant;
};