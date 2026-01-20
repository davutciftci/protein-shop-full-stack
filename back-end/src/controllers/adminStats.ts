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


export const getDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[AdminStatsController] getDashboard called');

        const stats = await getDashboardStats();

        console.log('[AdminStatsController] getDashboard - Success');

        res.status(200).json({
            status: 'success',
            data: stats,
        });
    } catch (error) {
        console.log('[AdminStatsController] getDashboard - Error:', error);
        next(error);
    }
};


export const getOrderStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[AdminStatsController] getOrderStatus called');

        const stats = await getOrderStatusStats();

        console.log('[AdminStatsController] getOrderStatus - Success');

        res.status(200).json({
            status: 'success',
            data: stats,
        });
    } catch (error) {
        console.log('[AdminStatsController] getOrderStatus - Error:', error);
        next(error);
    }
};


export const get7DaysSales = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[AdminStatsController] get7DaysSales called');

        const sales = await getLast7DaysSales();

        console.log('[AdminStatsController] get7DaysSales - Success');

        res.status(200).json({
            status: 'success',
            data: sales,
        });
    } catch (error) {
        console.log('[AdminStatsController] get7DaysSales - Error:', error);
        next(error);
    }
};


export const getTopProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        console.log('[AdminStatsController] getTopProducts called with limit:', limit);

        const products = await getTopSellingProducts(limit);

        console.log('[AdminStatsController] getTopProducts - Success');

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products,
        });
    } catch (error) {
        console.log('[AdminStatsController] getTopProducts - Error:', error);
        next(error);
    }
};


export const getRecentUsersList = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        console.log('[AdminStatsController] getRecentUsersList called with limit:', limit);

        const users = await getRecentUsers(limit);

        console.log('[AdminStatsController] getRecentUsersList - Success');

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users,
        });
    } catch (error) {
        console.log('[AdminStatsController] getRecentUsersList - Error:', error);
        next(error);
    }
};


export const getLowStock = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const threshold = req.query.threshold ? parseInt(req.query.threshold as string) : 10;
        console.log('[AdminStatsController] getLowStock called with threshold:', threshold);

        const products = await getLowStockProducts(threshold);

        console.log('[AdminStatsController] getLowStock - Success');

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products,
        });
    } catch (error) {
        console.log('[AdminStatsController] getLowStock - Error:', error);
        next(error);
    }
};


export const getCategoryDistribution = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log('[AdminStatsController] getCategoryDistribution called');

        const distribution = await getProductsByCategory();

        console.log('[AdminStatsController] getCategoryDistribution - Success');

        res.status(200).json({
            status: 'success',
            data: distribution,
        });
    } catch (error) {
        console.log('[AdminStatsController] getCategoryDistribution - Error:', error);
        next(error);
    }
};


export const getMonthlyReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const year = req.query.year ? parseInt(req.query.year as string) : undefined;
        console.log('[AdminStatsController] getMonthlyReport called for year:', year || 'current');

        const report = await getMonthlyRevenue(year);

        console.log('[AdminStatsController] getMonthlyReport - Success');

        res.status(200).json({
            status: 'success',
            data: report,
        });
    } catch (error) {
        console.log('[AdminStatsController] getMonthlyReport - Error:', error);
        next(error);
    }
};