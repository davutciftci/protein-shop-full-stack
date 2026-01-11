import prisma from '../utils/prisma';
import { ConflictError, NotFoundError, BadRequestError } from '../utils/customErrors';

interface ProductFilters {
    categoryId?: number;
    activeOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
}

export const getAllProducts = async (filters: ProductFilters = {}) => {
    console.log('[ProductService] getAllProducts called with filters:', filters);

    const where: any = {};

    if (filters.categoryId) {
        where.categoryId = filters.categoryId;
    }

    if (filters.activeOnly) {
        where.isActive = true;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        where.price = {};

        if (filters.minPrice !== undefined) {
            where.price.gte = filters.minPrice;
        }

        if (filters.maxPrice !== undefined) {
            where.price.lte = filters.maxPrice;
        }
    }

    const products = await prisma.product.findMany({
        where,
        include: {
            category: true,
        },
        orderBy: { createdAt: 'desc' },
    });

    console.log('[ProductService] Found products:', products.length);
    return products;
};

export const getProductById = async (id: number) => {
    console.log('[ProductService] getProductById called with id:', id);

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });

    if (!product) {
        console.log('[ProductService] Product not found with id:', id);
        throw new NotFoundError('Ürün bulunamadı');
    }

    console.log('[ProductService] Product found:', product.id);
    return product;
};

export const createProduct = async (data: {
    name: string;
    slug: string;
    description?: string;
    price: number;
    stockCount?: number;
    categoryId: number;
    isActive?: boolean;
}) => {
    console.log('[ProductService] createProduct called with data:', data);

    const existingProduct = await prisma.product.findUnique({
        where: { slug: data.slug },
    });

    if (existingProduct) {
        console.log('[ProductService] Slug already exists:', data.slug);
        throw new ConflictError('Bu slug zaten kullanılıyor');
    }

    const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
    });

    if (!category) {
        console.log('[ProductService] Category not found:', data.categoryId);
        throw new NotFoundError('Kategori bulunamadı');
    }

    if (!category.isActive) {
        console.log('[ProductService] Category is not active:', data.categoryId);
        throw new BadRequestError('Pasif bir kategoriye ürün eklenemez');
    }

    const product = await prisma.product.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            stockCount: data.stockCount ?? 0,
            categoryId: data.categoryId,
            isActive: data.isActive ?? true,
        },
        include: {
            category: true,
        },
    });

    console.log('[ProductService] Product created successfully:', product.id);
    return product;
};

export const updateProduct = async (
    id: number,
    data: {
        name?: string;
        slug?: string;
        description?: string;
        price?: number;
        stockCount?: number;
        categoryId?: number;
        isActive?: boolean;
    }
) => {
    console.log('[ProductService] updateProduct called with id:', id, 'data:', data);

    await getProductById(id);

    if (data.slug) {
        const existingProduct = await prisma.product.findUnique({
            where: { slug: data.slug },
        });

        if (existingProduct && existingProduct.id !== id) {
            console.log('[ProductService] Slug already exists on another product:', data.slug);
            throw new ConflictError('Bu slug zaten başka bir üründe kullanılıyor');
        }
    }

    if (data.categoryId) {
        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
        });

        if (!category) {
            console.log('[ProductService] Category not found:', data.categoryId);
            throw new NotFoundError('Kategori bulunamadı');
        }

        if (!category.isActive) {
            console.log('[ProductService] Category is not active:', data.categoryId);
            throw new BadRequestError('Pasif bir kategoriye ürün taşınamaz');
        }
    }

    const product = await prisma.product.update({
        where: { id },
        data,
        include: {
            category: true,
        },
    });

    console.log('[ProductService] Product updated successfully:', product.id);
    return product;
};

export const deleteProduct = async (id: number) => {
    console.log('[ProductService] deleteProduct called with id:', id);

    await getProductById(id);

    const product = await prisma.product.delete({
        where: { id },
    });

    console.log('[ProductService] Product deleted successfully:', id);
    return product;
};