import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import {
    getAddressesByUserId,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
} from '../services/userAddress';


export const getMyAddresses = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[AddressController] getMyAddresses - User ID:', userId);

        const addresses = await getAddressesByUserId(userId);

        console.log('[AddressController] getMyAddresses - Success, returned:', addresses.length, 'addresses');

        res.status(200).json({
            status: 'success',
            results: addresses.length,
            data: addresses,
        });
    } catch (error) {
        console.log('[AddressController] getMyAddresses - Error:', error);
        next(error);
    }
};


export const getAddress = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        console.log('[AddressController] getAddress - ID:', id);

        const address = await getAddressById(id);

        console.log('[AddressController] getAddress - Success');

        res.status(200).json({
            status: 'success',
            data: address,
        });
    } catch (error) {
        console.log('[AddressController] getAddress - Error:', error);
        next(error);
    }
};


export const createNewAddress = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId!;
        console.log('[AddressController] createNewAddress - Body:', req.body, 'User ID:', userId);

        const address = await createAddress(req.body, userId);

        console.log('[AddressController] createNewAddress - Success, address ID:', address.id);

        res.status(201).json({
            status: 'success',
            message: 'Adres başarıyla oluşturuldu',
            data: address,
        });
    } catch (error) {
        console.log('[AddressController] createNewAddress - Error:', error);
        next(error);
    }
};

export const updateAddressById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user?.userId!;
        console.log('[AddressController] updateAddressById - ID:', id, 'Body:', req.body, 'User ID:', userId);

        const address = await updateAddress(id, req.body, userId);

        console.log('[AddressController] updateAddressById - Success');

        res.status(200).json({
            status: 'success',
            message: 'Adres başarıyla güncellendi',
            data: address,
        });
    } catch (error) {
        console.log('[AddressController] updateAddressById - Error:', error);
        next(error);
    }
};


export const deleteAddressById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user?.userId!;
        console.log('[AddressController] deleteAddressById - ID:', id, 'User ID:', userId);

        await deleteAddress(id, userId);

        console.log('[AddressController] deleteAddressById - Success');

        res.status(204).send();
    } catch (error) {
        console.log('[AddressController] deleteAddressById - Error:', error);
        next(error);
    }
};