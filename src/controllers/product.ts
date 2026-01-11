import { Request, Response, NextFunction } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../services/product';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[ProductController] getProducts - Query params:', req.query);

        const filters = {
            categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
            activeOnly: req.query.activeOnly === 'true',
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        };

        const products = await getAllProducts(filters);

        console.log('[ProductController] getProducts - Success, returned:', products.length, 'products');

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products,
        });
    } catch (error) {
        console.log('[ProductController] getProducts - Error:', error);
        next(error);
    }
};

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[ProductController] getProduct - ID:', id);

        const product = await getProductById(id);

        console.log('[ProductController] getProduct - Success');

        res.status(200).json({
            status: 'success',
            data: product,
        });
    } catch (error) {
        console.log('[ProductController] getProduct - Error:', error);
        next(error);
    }
};

export const createNewProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[ProductController] createNewProduct - Body:', req.body);
        console.log('[ProductController] createNewProduct - User:', (req as AuthenticatedRequest).user);

        const product = await createProduct(req.body);

        console.log('[ProductController] createNewProduct - Success, product ID:', product.id);

        res.status(201).json({
            status: 'success',
            message: 'Ürün başarıyla oluşturuldu',
            data: product,
        });
    } catch (error) {
        console.log('[ProductController] createNewProduct - Error:', error);
        next(error);
    }
};

export const updateProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[ProductController] updateProductById - ID:', id, 'Body:', req.body);

        const product = await updateProduct(id, req.body);

        console.log('[ProductController] updateProductById - Success');

        res.status(200).json({
            status: 'success',
            message: 'Ürün başarıyla güncellendi',
            data: product,
        });
    } catch (error) {
        console.log('[ProductController] updateProductById - Error:', error);
        next(error);
    }
};

export const deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[ProductController] deleteProductById - ID:', id);

        await deleteProduct(id);

        console.log('[ProductController] deleteProductById - Success');

        res.status(204).send();
    } catch (error) {
        console.log('[ProductController] deleteProductById - Error:', error);
        next(error);
    }
};