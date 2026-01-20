import prisma from '../utils/prisma';
import { ConflictError, NotFoundError, BadRequestError } from '../utils/customErrors';
import { ProductWhereInput, ProductOrderByInput } from '../types';

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

    const where: ProductWhereInput = {};

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
        where.basePrice = {};

        if (filters.minPrice !== undefined) {
            where.basePrice.gte = filters.minPrice;
        }

        if (filters.maxPrice !== undefined) {
            where.basePrice.lte = filters.maxPrice;
        }
    }

    let orderBy: ProductOrderByInput = { createdAt: 'desc' };

    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price_asc':
                orderBy = { basePrice: 'asc' };
                break;
            case 'price_desc':
                orderBy = { basePrice: 'desc' }
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
                    sku: true,
                    price: true,
                    stockCount: true,
                    discount: true,
                    aroma: true,
                    size: true,
                    servings: true,
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
    const where: ProductWhereInput = {};

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
        where.basePrice = {};

        if (filters.minPrice !== undefined) {
            where.basePrice.gte = filters.minPrice;
        }

        if (filters.maxPrice !== undefined) {
            where.basePrice.lte = filters.maxPrice;
        }
    }

    let orderBy: ProductOrderByInput = { createdAt: 'desc' };

    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price_asc':
                orderBy = { basePrice: 'asc' };
                break;
            case 'price_desc':
                orderBy = { basePrice: 'desc' };
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
                    sku: true,
                    price: true,
                    stockCount: true,
                    discount: true,
                    aroma: true,
                    size: true,
                    servings: true,
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
            variants: {
                select: {
                    id: true,
                    name: true,
                    sku: true,
                    price: true,
                    stockCount: true,
                    discount: true,
                    aroma: true,
                    size: true,
                    servings: true,
                }
            },
            photos: true,
        },
    });

    if (!product) {
        console.log('[ProductService] Product not found with id:', id);
        throw new NotFoundError('Ürün bulunamadı');
    }

    console.log('[ProductService] Product found:', product.id);
    return product;
};

export const getProductBySlugService = async (slug: string) => {
    console.log('[ProductService] getProductBySlugService called with slug:', slug);

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            variants: {
                select: {
                    id: true,
                    name: true,
                    sku: true,
                    price: true,
                    stockCount: true,
                    discount: true,
                    aroma: true,
                    size: true,
                    servings: true,
                }
            },
            photos: true,
        },
    });

    if (!product) {
        console.log('[ProductService] Product not found with slug:', slug);
        throw new NotFoundError('Ürün bulunamadı');
    }

    console.log('[ProductService] Product found by slug:', product.id);
    return product;
};

export const createProduct = async (data: {
    name: string;
    slug: string;
    description?: string;
    basePrice?: number;
    stockCount?: number;
    categoryId: number;
    isActive?: boolean;
    features?: string[];
    nutritionInfo?: string[];
    usage?: string[];
    expirationDate?: Date | string;
    taxRate?: number;
    servingSize?: string;
    ingredients?: string;
    nutritionValues?: any;
    aminoAcids?: any;
    variants?: Array<{
        name: string;
        sku: string;
        price: number;
        stockCount?: number;
        discount?: number;
        aroma?: string;
        size?: string;
        servings?: string;
    }>;
    photos?: Array<{
        url: string;
        altText?: string;
        isPrimary?: boolean;
        displayOrder?: number;
    }>;
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

    // Varyantları ve fotoğrafları oluşturmak için prisma transaction kullan
    const product = await prisma.product.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            basePrice: data.basePrice,
            stockCount: data.stockCount ?? 0,
            categoryId: data.categoryId,
            isActive: data.isActive ?? true,
            features: data.features,
            nutritionInfo: data.nutritionInfo,
            usage: data.usage,
            expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
            taxRate: data.taxRate ?? 20,
            servingSize: data.servingSize,
            ingredients: data.ingredients,
            nutritionValues: data.nutritionValues,
            aminoAcids: data.aminoAcids,
            // Varyantları ürünle birlikte oluştur
            variants: data.variants && data.variants.length > 0 ? {
                create: data.variants.map(v => ({
                    name: v.name,
                    sku: v.sku,
                    price: v.price,
                    stockCount: v.stockCount ?? 0,
                    discount: v.discount,
                    aroma: v.aroma,
                    size: v.size,
                    servings: v.servings,
                }))
            } : undefined,
            // Fotoğrafları ürünle birlikte oluştur
            photos: data.photos && data.photos.length > 0 ? {
                create: data.photos.map((p, index) => ({
                    url: p.url,
                    altText: p.altText || data.name,
                    isPrimary: p.isPrimary ?? (index === 0),
                    displayOrder: p.displayOrder ?? index,
                }))
            } : undefined,
        },
        include: {
            category: true,
            variants: true,
            photos: true,
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
        basePrice?: number;
        stockCount?: number;
        categoryId?: number;
        isActive?: boolean;
        features?: string[];
        nutritionInfo?: string[];
        usage?: string[];
        expirationDate?: Date | string;
        taxRate?: number;
        servingSize?: string;
        ingredients?: string;
        nutritionValues?: any;
        aminoAcids?: any;
        variants?: Array<{
            name: string;
            sku: string;
            price: number;
            stockCount?: number;
            discount?: number;
            aroma?: string;
            size?: string;
            servings?: string;
        }>;
        photos?: Array<{
            url: string;
            altText?: string;
            isPrimary?: boolean;
            displayOrder?: number;
        }>;
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

    // Extract variants and photos from data to handle separately
    const { variants, photos, ...productData } = data;

    // Convert expirationDate string to Date object if it's a string
    const updateData = {
        ...productData,
        expirationDate: productData.expirationDate
            ? new Date(productData.expirationDate)
            : undefined,
    };

    // If variants are provided, delete existing and create new ones
    if (variants && variants.length > 0) {
        // Delete existing variants
        await prisma.productVariant.deleteMany({
            where: { productId: id },
        });

        // Create new variants
        await prisma.productVariant.createMany({
            data: variants.map(v => ({
                productId: id,
                name: v.name,
                sku: v.sku,
                price: v.price,
                stockCount: v.stockCount ?? 0,
                discount: v.discount,
                aroma: v.aroma,
                size: v.size,
                servings: v.servings,
            })),
        });
    }

    // If photos are provided, delete existing and create new ones
    if (photos && photos.length > 0) {
        // Delete existing photos
        await prisma.productPhoto.deleteMany({
            where: { productId: id },
        });

        // Create new photos
        await prisma.productPhoto.createMany({
            data: photos.map((p, index) => ({
                productId: id,
                url: p.url,
                altText: p.altText || '',
                isPrimary: p.isPrimary ?? (index === 0),
                displayOrder: p.displayOrder ?? index,
            })),
        });
    }

    const product = await prisma.product.update({
        where: { id },
        data: updateData,
        include: {
            category: true,
            variants: true,
            photos: true,
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