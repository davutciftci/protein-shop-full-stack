import prisma from '../utils/prisma';
import { ConflictError, NotFoundError, BadRequestError } from '../utils/customErrors';

interface ProductFilters {
    search?: string;
    categoryId?: number;
    activeOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
}

export const searchAndFilterProducts = async (filters: ProductFilters = {}) => {
    console.log('[ProductService] getAllProducts called with filters:', filters);

    const where: any = {};

    if (filters.search) {
        where.name = {
            contains: filters.search,
            mode: 'insensitive'
        }
    }

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

    let orderBy: any = { createdAt: 'desc' };

    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price_asc':
                orderBy = { price: 'asc' };
                break;
            case 'price_desc':
                orderBy = { price: ' desc' }
                break
            case 'name_asc':
                orderBy = { name: 'asc' }
                break;
            case 'name_desc':
                orderBy = { name: 'desc' }
                break;
            case 'newest':
                orderBy = { name: 'desc' }
                break;
            case 'oldest':
                orderBy = { createdAt: 'asc' }
                break;
        }
    }

    const products = await prisma.product.findMany({
        where,
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            photos: {
                where: { isPrimary: true },
                take: 1,
            },
            variants: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    stockCount: true,
                }
            }
        },
        orderBy,
    });

    console.log('[ProductService] Found products:', products.length);
    return products;
};

export const getPaginatedProducts = async (filters: ProductFilters, page: number = 1, limit: number = 12) => {
    console.log('[ProductService] getpaginatedProducts - Page:', page, 'Limit:', limit, 'Filters:', filters);
    const where: any = {};

    if (filters.search) {
        where.name = {
            contains: filters.search,
            mode: 'insensitive'
        };
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

    let orderBy: any = { createdAt: 'desc' };

    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price_asc':
                orderBy = { price: 'asc' };
                break;
            case 'price_desc':
                orderBy = { price: 'desc' };
                break;
            case 'name_asc':
                orderBy = { name: 'asc' };
                break;
            case 'name_desc':
                orderBy = { name: 'desc' };
                break;
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            case 'oldest':
                orderBy = { createdAt: 'asc' };
                break;
        }
    }

    const totalProducts = await prisma.product.count({ where });

    const totalPages = Math.ceil(totalProducts / limit);
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
        where,
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                }
            },
            photos: {
                where:
                    { isPrimary: true },
                take: 1,
            },
            variants: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    stockCount: true,
                },
            },
        },
        orderBy,
        skip,
        take: limit,
    });

    console.log('[ProductService] Found paginated products:', products.length, '/', totalProducts);

    return {
        products,
        pagination: {
            currentPage: page,
            totalPages,
            totalProducts,
            productsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        }
    }
}


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