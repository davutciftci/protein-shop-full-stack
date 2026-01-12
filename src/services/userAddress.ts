import prisma from '../utils/prisma';
import { NotFoundError, UnauthorizedError } from '../utils/customErrors';


export const getAddressesByUserId = async (userId: number) => {
    console.log('[AddressService] getAddressesByUserId called with userId:', userId);

    const addresses = await prisma.userAddress.findMany({
        where: { userId },
        orderBy: [
            { isDefault: 'desc' },
            { createdAt: 'desc' },
        ],
    });

    console.log('[AddressService] Found addresses:', addresses.length);
    return addresses;
};

export const getAddressById = async (id: number) => {
    console.log('[AddressService] getAddressById called with id:', id);

    const address = await prisma.userAddress.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });

    if (!address) {
        console.log('[AddressService] Address not found:', id);
        throw new NotFoundError('Adres bulunamadı');
    }

    console.log('[AddressService] Address found:', address.id);
    return address;
};

export const createAddress = async (
    data: {
        title: string;
        fullName: string;
        phoneNumber: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        district: string;
        postalCode?: string;
        isDefault?: boolean;
    },
    userId: number
) => {
    console.log('[AddressService] createAddress called with data:', data, 'userId:', userId);

    const existingAddressCount = await prisma.userAddress.count({
        where: { userId },
    });

    const isFirstAddress = existingAddressCount === 0;
    const shouldBeDefault = data.isDefault || isFirstAddress;

    if (shouldBeDefault) {
        console.log('[AddressService] Setting other addresses isDefault to false for user:', userId);
        await prisma.userAddress.updateMany({
            where: {
                userId,
                isDefault: true,
            },
            data: { isDefault: false },
        });
    }

    const address = await prisma.userAddress.create({
        data: {
            ...data,
            userId,
            isDefault: shouldBeDefault,
        },
    });

    console.log('[AddressService] Address created successfully:', address.id);
    return address;
};

export const updateAddress = async (
    id: number,
    data: {
        title?: string;
        fullName?: string;
        phoneNumber?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        district?: string;
        postalCode?: string;
        isDefault?: boolean;
    },
    userId: number
) => {
    console.log('[AddressService] updateAddress called with id:', id, 'data:', data, 'userId:', userId);

    const existingAddress = await getAddressById(id);

    if (existingAddress.userId !== userId) {
        console.log('[AddressService] User is not the owner of this address');
        throw new UnauthorizedError('Bu adresi güncelleme yetkiniz yok');
    }

    if (data.isDefault === true) {
        console.log('[AddressService] Setting other addresses isDefault to false for user:', userId);
        await prisma.userAddress.updateMany({
            where: {
                userId,
                isDefault: true,
                id: { not: id },
            },
            data: { isDefault: false },
        });
    }

    const address = await prisma.userAddress.update({
        where: { id },
        data,
    });

    console.log('[AddressService] Address updated successfully:', address.id);
    return address;
};

export const deleteAddress = async (id: number, userId: number) => {
    console.log('[AddressService] deleteAddress called with id:', id, 'userId:', userId);

    const existingAddress = await getAddressById(id);

    if (existingAddress.userId !== userId) {
        console.log('[AddressService] User is not authorized to delete this address');
        throw new UnauthorizedError('Bu adresi silme yetkiniz yok');
    }

    const address = await prisma.userAddress.delete({
        where: { id },
    });


    if (existingAddress.isDefault) {
        console.log('[AddressService] Deleted address was default, setting another address as default');
        const anotherAddress = await prisma.userAddress.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        if (anotherAddress) {
            await prisma.userAddress.update({
                where: { id: anotherAddress.id },
                data: { isDefault: true },
            });
            console.log('[AddressService] Set address', anotherAddress.id, 'as new default');
        }
    }

    console.log('[AddressService] Address deleted successfully:', id);
    return address;
};