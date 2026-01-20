import { Request, Response, NextFunction } from 'express';
import {
    processPayment,
    getPaymentStatus,
    getTestCards,
} from '../services/payment';
import { AuthenticatedRequest } from '../middlewares/auth';


export const makePayment = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        const { orderId, cardDetails } = req.body;

        console.log('[PaymentController] makePayment - User ID:', userId, 'Order ID:', orderId);

        const payment = await processPayment(orderId, cardDetails, userId);

        console.log('[PaymentController] makePayment - Success, Status:', payment.status);

        res.status(payment.status === 'SUCCESS' ? 200 : 400).json({
            status: payment.status === 'SUCCESS' ? 'success' : 'error',
            message: payment.status === 'SUCCESS' ? 'Ödeme başarılı' : 'Ödeme başarısız',
            data: {
                paymentId: payment.paymentId,
                conversationId: payment.conversationId,
                status: payment.status,
                amount: payment.amount,
                paidPrice: payment.paidPrice,
                cardAssociation: payment.cardAssociation,
                lastFourDigits: payment.lastFourDigits,
                order: {
                    orderNumber: payment.order.orderNumber,
                    status: payment.order.status,
                },
            },
        });
    } catch (error) {
        console.log('[PaymentController] makePayment - Error:', error);
        next(error);
    }
};


export const checkPaymentStatus = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderId = parseInt(req.params.orderId);
        console.log('[PaymentController] checkPaymentStatus - Order ID:', orderId);

        const payment = await getPaymentStatus(orderId);

        console.log('[PaymentController] checkPaymentStatus - Success');

        res.status(200).json({
            status: 'success',
            data: payment,
        });
    } catch (error) {
        console.log('[PaymentController] checkPaymentStatus - Error:', error);
        next(error);
    }
};


export const listTestCards = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[PaymentController] listTestCards called');

        const cards = getTestCards();

        res.status(200).json({
            status: 'success',
            message: 'Test amaçlı kart bilgileri',
            data: cards,
        });
    } catch (error) {
        console.log('[PaymentController] listTestCards - Error:', error);
        next(error);
    }
};