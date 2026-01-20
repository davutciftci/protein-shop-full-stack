import { Request, Response, NextFunction } from 'express';
import {
    getOrdersByUserId,
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
} from '../services/order';
import { OrderStatus } from '../../generated/prisma';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getMyOrders = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[OrderController] getMyOrders - User ID:', userId);

        const orders = await getOrdersByUserId(userId);

        console.log('[OrderController] getMyOrders - Success, returned:', orders.length, 'orders');

        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: orders,
        });
    } catch (error) {
        console.log('[OrderController] getMyOrders - Error:', error);
        next(error);
    }
};


export const getOrders = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[OrderController] getOrders - Admin request');

        const orders = await getAllOrders();

        console.log('[OrderController] getOrders - Success, returned:', orders.length, 'orders');

        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: orders,
        });
    } catch (error) {
        console.log('[OrderController] getOrders - Error:', error);
        next(error);
    }
};


export const getOrder = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user?.userId!;
        const isAdmin = req.user?.role === 'ADMIN';
        console.log('[OrderController] getOrder - ID:', id, 'User ID:', userId, 'Is Admin:', isAdmin);

        const order = await getOrderById(id);


        if (!isAdmin && order.userId !== userId) {
            console.log('[OrderController] getOrder - Unauthorized access attempt');
            return res.status(403).json({
                status: 'error',
                message: 'Bu siparişe erişim yetkiniz yok',
            });
        }

        console.log('[OrderController] getOrder - Success');

        res.status(200).json({
            status: 'success',
            data: order,
        });
    } catch (error) {
        console.log('[OrderController] getOrder - Error:', error);
        next(error);
    }
};

export const createNewOrder = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        const { addressId, paymentMethod } = req.body;
        console.log('[OrderController] createNewOrder - User ID:', userId, 'Body:', req.body);

        const order = await createOrder(userId, addressId, paymentMethod);

        console.log('[OrderController] createNewOrder - Success, order ID:', order.id);

        res.status(201).json({
            status: 'success',
            message: 'Siparişiniz başarıyla oluşturuldu',
            data: order,
        });
    } catch (error) {
        console.log('[OrderController] createNewOrder - Error:', error);
        next(error);
    }
};


export const updateStatus = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const { status, trackingNumber, cancelReason } = req.body;
        console.log('[OrderController] updateStatus - ID:', id, 'Body:', req.body);

        const order = await updateOrderStatus(id, status as OrderStatus, trackingNumber, cancelReason);

        console.log('[OrderController] updateStatus - Success');

        res.status(200).json({
            status: 'success',
            message: 'Sipariş durumu güncellendi',
            data: order,
        });
    } catch (error) {
        console.log('[OrderController] updateStatus - Error:', error);
        next(error);
    }
};


export const cancelUserOrder = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user?.userId!;
        const { cancelReason } = req.body;
        console.log('[OrderController] cancelUserOrder - ID:', id, 'User ID:', userId, 'Reason:', cancelReason);

        const order = await cancelOrder(id, userId, cancelReason);

        console.log('[OrderController] cancelUserOrder - Success');

        res.status(200).json({
            status: 'success',
            message: 'Sipariş iptal edildi',
            data: order,
        });
    } catch (error) {
        console.log('[OrderController] cancelUserOrder - Error:', error);
        next(error);
    }
};