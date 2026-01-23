import { Request, Response, NextFunction } from 'express';
import {
    getDashboardStats,
    getOrderStatusStats,
    getLast7DaysSales,
    getTopSellingProducts,
    getRecentUsers,
    getLowStockProducts,
    getProductsByCategory,
    getMonthlyRevenue,
} from '../services/adminStats';
import { asyncHandler } from '../utils/asyncHandler';


export const getDashboard = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const stats = await getDashboardStats();

    res.status(200).json({
        status: 'success',
        data: stats,
    });
});


export const getOrderStatus = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const stats = await getOrderStatusStats();

    res.status(200).json({
        status: 'success',
        data: stats,
    });
});


export const get7DaysSales = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const sales = await getLast7DaysSales();

    res.status(200).json({
        status: 'success',
        data: sales,
    });
});


export const getTopProducts = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const products = await getTopSellingProducts(limit);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: products,
    });
});


export const getRecentUsersList = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const users = await getRecentUsers(limit);

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users,
    });
});


export const getLowStock = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const threshold = req.query.threshold ? parseInt(req.query.threshold as string) : 10;

    const products = await getLowStockProducts(threshold);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: products,
    });
});


export const getCategoryDistribution = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const distribution = await getProductsByCategory();

    res.status(200).json({
        status: 'success',
        data: distribution,
    });
});


export const getMonthlyReport = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    const report = await getMonthlyRevenue(year);

    res.status(200).json({
        status: 'success',
        data: report,
    });
});