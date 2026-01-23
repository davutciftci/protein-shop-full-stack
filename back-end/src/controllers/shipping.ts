import prisma from '../utils/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';

export const getAllShippingMethods = asyncHandler(async (req: Request, res: Response) => {
    const shippingMethods = await prisma.shippingMethod.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            price: 'asc'
        }
    });

    const fixedMethods = shippingMethods.map(method => ({
        ...method,
        deliveryDays: method.deliveryDays
            .replace(/i\?\?/g, 'iş')
            .replace(/g\?\?n\?\?/g, 'günü')
    }));

    return res.status(200).json({
        status: 'success',
        data: fixedMethods
    });
});
