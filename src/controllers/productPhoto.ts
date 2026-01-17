import { Request, Response, NextFunction } from 'express';
import {
    getPhotosByProductId,
    getPhotoById,
    createPhoto,
    updatePhoto,
    deletePhoto,
} from '../services/productPhoto';
import { AuthenticatedRequest } from '../middlewares/auth';
import { BadRequestError } from '../utils/customErrors';


export const getProductPhotos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const productId = parseInt(req.params.productId);
        console.log('[PhotoController] getProductPhotos - Product ID:', productId);

        const photos = await getPhotosByProductId(productId);

        console.log('[PhotoController] getProductPhotos - Success, returned:', photos.length, 'photos');

        res.status(200).json({
            status: 'success',
            results: photos.length,
            data: photos,
        });
    } catch (error) {
        console.log('[PhotoController] getProductPhotos - Error:', error);
        next(error);
    }
};

export const getPhoto = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[PhotoController] getPhoto - ID:', id);

        const photo = await getPhotoById(id);

        console.log('[PhotoController] getPhoto - Success');

        res.status(200).json({
            status: 'success',
            data: photo,
        });
    } catch (error) {
        console.log('[PhotoController] getPhoto - Error:', error);
        next(error);
    }
};

export const createNewPhoto = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[PhotoController] createNewPhoto - Body:', req.body);
        console.log('[PhotoController] createNewPhoto - User:', (req as AuthenticatedRequest).user);

        const photo = await createPhoto(req.body);

        console.log('[PhotoController] createNewPhoto - Success, photo ID:', photo.id);

        res.status(201).json({
            status: 'success',
            message: 'Fotoğraf başarıyla eklendi',
            data: photo,
        });
    } catch (error) {
        console.log('[PhotoController] createNewPhoto - Error:', error);
        next(error);
    }
};

export const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('[PhotoController] uploadPhoto - File:', req.file);
        console.log('[PhotoController] uploadPhoto - Body', req.body)

        if (!req.file) {
            throw new BadRequestError("Dosya yüklenemedi")
        }

        const { productId, altText, isPrimary, displayOrder } = req.body;

        const fileUrl = `/uploads/${req.file.filename}`;
        console.log(`[PhotoController] uploadPhoto - File Url:`, fileUrl);

        const photo = await createPhoto({
            url: fileUrl,
            altText,
            isPrimary: isPrimary === "true",
            displayOrder: displayOrder ? parseInt(displayOrder) : 0,
            productId: parseInt(productId)
        });
        console.log('[PhotoController] uploadPhoto - Success, photo ID:', photo.id);

        res.status(202).json({
            status: 'success',
            message: 'Fotoğraf başarıyla yüklendi',
            data: photo,
        })
    } catch (error) {
        console.log('[PhotoController] uploadPhoto - Error:', error);
        next(error);
    }
}

export const updatePhotoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[PhotoController] updatePhotoById - ID:', id, 'Body:', req.body);

        const photo = await updatePhoto(id, req.body);

        console.log('[PhotoController] updatePhotoById - Success');

        res.status(200).json({
            status: 'success',
            message: 'Fotoğraf başarıyla güncellendi',
            data: photo,
        });
    } catch (error) {
        console.log('[PhotoController] updatePhotoById - Error:', error);
        next(error);
    }
};


export const deletePhotoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[PhotoController] deletePhotoById - ID:', id);

        await deletePhoto(id);

        console.log('[PhotoController] deletePhotoById - Success');

        res.status(204).send();
    } catch (error) {
        console.log('[PhotoController] deletePhotoById - Error:', error);
        next(error);
    }
};