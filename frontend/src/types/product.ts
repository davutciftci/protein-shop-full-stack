export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductVariant {
    id: number;
    productId: number;
    name: string;
    sku: string;
    price: number;
    stockCount: number;
    discount?: number;
    aroma?: string;
    size?: string;
    servings?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductPhoto {
    id: number;
    url: string;
    altText?: string;
    isPrimary: boolean;
    displayOrder: number;
    productId: number;
}

export interface ProductComment {
    id: number;
    rating: number;
    comment: string;
    isApproved: boolean;
    userId: number;
    productId: number;
    createdAt: string;
    updatedAt?: string;
    user?: {
        id: number;
        firstName: string;
        lastName: string;
    };
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    basePrice?: number;
    taxRate?: number;
    stockCount: number;
    isActive: boolean;
    categoryId: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    features?: string[];
    nutritionInfo?: string[];
    usage?: string[];
    expirationDate?: string;
    servingSize?: string;
    ingredients?: string;
    nutritionValues?: any;
    aminoAcids?: any;
    createdAt: string;
    updatedAt: string;
    variants?: ProductVariant[];
    photos?: ProductPhoto[];
    comments?: ProductComment[];

    // Frontend-specific fields (some moved to main Product interface)
    image?: string; // Primary image URL
    images?: string[]; // All image URLs
    aromas?: Array<{ id: number; name: string; color: string }>; // For flavor options
    sizes?: Array<{ id: number; weight: string; servings?: number; price: number; discount?: number }>; // For size/variant options
    pricePerServing?: string; // Price per serving
    reviews?: number; // Number of reviews
    rating?: number; // Average rating
    tags?: string[]; // Product tags
}

export interface ProductSearchParams {
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    activeOnly?: boolean;
    sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'oldest';
}

export interface ProductPaginationParams extends ProductSearchParams {
    page?: number;
    limit?: number;
}

export interface CreateCommentRequest {
    rating: number;
    comment: string;
    productId: number;
}
