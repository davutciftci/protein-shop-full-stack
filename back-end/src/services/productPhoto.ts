import prisma from '../utils/prisma';
import { NotFoundError, BadRequestError } from '../utils/customErrors';

export const getPhotosByProductId = async (productId: number) => {
    console.log('[PhotoService] getPhotosByProductId called with productId:', productId);

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        console.log('[PhotoService] Product not found:', productId);
        throw new NotFoundError('Ürün bulunamadı');
    }

    const photos = await prisma.productPhoto.findMany({
        where: { productId },
        orderBy: [
            { isPrimary: 'desc' },
            { displayOrder: 'asc' },
        ],
    });

    console.log('[PhotoService] Found photos:', photos.length);
    return photos;
};

export const getPhotoById = async (id: number) => {
    console.log('[PhotoService] getPhotoById called with id:', id);

    const photo = await prisma.productPhoto.findUnique({
        where: { id },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    if (!photo) {
        console.log('[PhotoService] Photo not found:', id);
        throw new NotFoundError('Fotoğraf bulunamadı');
    }

    console.log('[PhotoService] Photo found:', photo.id);
    return photo;
};

export const createPhoto = async (data: {
    url: string;
    altText?: string;
    isPrimary?: boolean;
    displayOrder?: number;
    productId: number;
}) => {
    console.log('[PhotoService] createPhoto called with data:', data);

    const product = await prisma.product.findUnique({
        where: { id: data.productId },
    });

    if (!product) {
        console.log('[PhotoService] Product not found:', data.productId);
        throw new NotFoundError('Ürün bulunamadı');
    }

    if (!product.isActive) {
        console.log('[PhotoService] Product is not active:', data.productId);
        throw new BadRequestError('Pasif bir ürüne fotoğraf eklenemez');
    }

    if (data.isPrimary) {
        console.log('[PhotoService] Setting other photos isPrimary to false for product:', data.productId);
        await prisma.productPhoto.updateMany({
            where: {
                productId: data.productId,
                isPrimary: true,
            },
            data: { isPrimary: false },
        });
    }

    const photo = await prisma.productPhoto.create({
        data: {
            url: data.url,
            altText: data.altText,
            isPrimary: data.isPrimary ?? false,
            displayOrder: data.displayOrder ?? 0,
            productId: data.productId,
        },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    console.log('[PhotoService] Photo created successfully:', photo.id);
    return photo;
};

export const updatePhoto = async (
    id: number,
    data: {
        url?: string;
        altText?: string;
        isPrimary?: boolean;
        displayOrder?: number;
    }
) => {
    console.log('[PhotoService] updatePhoto called with id:', id, 'data:', data);

    const existingPhoto = await getPhotoById(id);

    if (data.isPrimary === true) {
        console.log('[PhotoService] Setting other photos isPrimary to false for product:', existingPhoto.productId);
        await prisma.productPhoto.updateMany({
            where: {
                productId: existingPhoto.productId,
                isPrimary: true,
                id: { not: id },
            },
            data: { isPrimary: false },
        });
    }

    const photo = await prisma.productPhoto.update({
        where: { id },
        data,
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    console.log('[PhotoService] Photo updated successfully:', photo.id);
    return photo;
};

export const deletePhoto = async (id: number) => {
    console.log('[PhotoService] deletePhoto called with id:', id);

    await getPhotoById(id);

    const photo = await prisma.productPhoto.delete({
        where: { id },
    });

    console.log('[PhotoService] Photo deleted successfully:', id);
    // TODO: Fiziksel dosyayı da sil (S3, Cloudinary vs.)

    return photo;
};