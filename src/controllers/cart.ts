import { Request, Response, NextFunction } from 'express';
import {
    getOrCreateCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
} from '../services/cart';
import { AuthenticatedRequest } from 'src/middlewares/auth';


export const getCart = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[CartController] getCart - User ID:', userId);

        const cart = await getOrCreateCart(userId);


        const totalPrice = cart.items.reduce((total, item) => {
            return total + (Number(item.variant.price) * item.quantity);
        }, 0);

        console.log('[CartController] getCart - Success, cart has', cart.items.length, 'items');

        res.status(200).json({
            status: 'success',
            data: {
                cart,
                summary: {
                    itemCount: cart.items.length,
                    totalPrice: totalPrice.toFixed(2),
                },
            },
        });
    } catch (error) {
        console.log('[CartController] getCart - Error:', error);
        next(error);
    }
};

export const addItemToCart = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        const { variantId, quantity } = req.body;
        console.log('[CartController] addItemToCart - User ID:', userId, 'Body:', req.body);

        const cart = await addToCart(userId, variantId, quantity);

        console.log('[CartController] addItemToCart - Success');

        res.status(200).json({
            status: 'success',
            message: 'Ürün sepete eklendi',
            data: cart,
        });
    } catch (error) {
        console.log('[CartController] addItemToCart - Error:', error);
        next(error);
    }
};


export const updateCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        const itemId = parseInt(req.params.itemId);
        const { quantity } = req.body;
        console.log('[CartController] updateCartItem - User ID:', userId, 'Item ID:', itemId, 'Quantity:', quantity);

        const cart = await updateCartItemQuantity(userId, itemId, quantity);

        console.log('[CartController] updateCartItem - Success');

        res.status(200).json({
            status: 'success',
            message: 'Ürün miktarı güncellendi',
            data: cart,
        });
    } catch (error) {
        console.log('[CartController] updateCartItem - Error:', error);
        next(error);
    }
};


export const removeCartItem = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        const itemId = parseInt(req.params.itemId);
        console.log('[CartController] removeCartItem - User ID:', userId, 'Item ID:', itemId);

        const cart = await removeFromCart(userId, itemId);

        console.log('[CartController] removeCartItem - Success');

        res.status(200).json({
            status: 'success',
            message: 'Ürün sepetten çıkarıldı',
            data: cart,
        });
    } catch (error) {
        console.log('[CartController] removeCartItem - Error:', error);
        next(error);
    }
};

export const clearUserCart = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[CartController] clearUserCart - User ID:', userId);

        const cart = await clearCart(userId);

        console.log('[CartController] clearUserCart - Success');

        res.status(200).json({
            status: 'success',
            message: 'Sepet temizlendi',
            data: cart,
        });
    } catch (error) {
        console.log('[CartController] clearUserCart - Error:', error);
        next(error);
    }
};