import { Request, Response, NextFunction } from 'express';
import {
    getVariantsByProductId,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant,
} from '../services/productVariant';
import { AuthenticatedRequest } from 'src/middlewares/auth';

export const getProductVariants = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const productId = parseInt(req.params.productId);
        console.log('[VariantController] getProductVariants - Product ID:', productId);

        const variants = await getVariantsByProductId(productId);

        console.log('[VariantController] getProductVariants - Success, returned:', variants.length, 'variants');

        res.status(200).json({
            status: 'success',
            results: variants.length,
            data: variants,
        });
    } catch (error) {
        console.log('[VariantController] getProductVariants - Error:', error);
        next(error);
    }
};


export const getVariant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[VariantController] getVariant - ID:', id);

        const variant = await getVariantById(id);

        console.log('[VariantController] getVariant - Success');

        res.status(200).json({
            status: 'success',
            data: variant,
        });
    } catch (error) {
        console.log('[VariantController] getVariant - Error:', error);
        next(error);
    }
};


export const createNewVariant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[VariantController] createNewVariant - Body:', req.body);
        console.log('[VariantController] createNewVariant - User:', (req as AuthenticatedRequest).user);

        const variant = await createVariant(req.body);

        console.log('[VariantController] createNewVariant - Success, variant ID:', variant.id);

        res.status(201).json({
            status: 'success',
            message: 'Varyant başarıyla oluşturuldu',
            data: variant,
        });
    } catch (error) {
        console.log('[VariantController] createNewVariant - Error:', error);
        next(error);
    }
};


export const updateVariantById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[VariantController] updateVariantById - ID:', id, 'Body:', req.body);

        const variant = await updateVariant(id, req.body);

        console.log('[VariantController] updateVariantById - Success');

        res.status(200).json({
            status: 'success',
            message: 'Varyant başarıyla güncellendi',
            data: variant,
        });
    } catch (error) {
        console.log('[VariantController] updateVariantById - Error:', error);
        next(error);
    }
};


export const deleteVariantById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[VariantController] deleteVariantById - ID:', id);

        await deleteVariant(id);

        console.log('[VariantController] deleteVariantById - Success');

        res.status(204).send();
    } catch (error) {
        console.log('[VariantController] deleteVariantById - Error:', error);
        next(error);
    }
};