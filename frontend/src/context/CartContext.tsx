import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiClient } from '../api/client';
import type { CartUIItem, CartItem } from '../types/cart';

interface CartContextType {
    items: CartUIItem[];
    isOpen: boolean;
    showAlert: boolean;
    addToCart: (item: Omit<CartUIItem, 'quantity' | 'cartItemId'>, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartUIItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.log('fetchCart: Token yok');
                return;
            }

            console.log('fetchCart: Backend\'den cart çekiliyor...');
            const response = await apiClient.get('/cart');
            console.log('fetchCart response:', response.data);

            const backendItems = response.data.data?.cart?.items || [];
            console.log('fetchCart backend items:', backendItems);

            const formattedItems: CartUIItem[] = backendItems.map((item: CartItem) => {
                console.log('Mapping item:', item);
                return {
                    id: item.variant.product.id,
                    name: item.variant.product.name,
                    description: item.variant.product.description || '',
                    price: Number(item.variant.price),
                    image: item.variant.product.photos?.[0]?.url || '/placeholder.png',
                    quantity: item.quantity,
                    aroma: item.variant.aroma,
                    size: item.variant.size || item.variantId,
                    variantId: item.variantId,
                    slug: item.variant.product.slug,
                    categorySlug: '',
                    cartItemId: item.id
                };
            });

            console.log('fetchCart formatted items:', formattedItems);
            setItems(formattedItems);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (newItem: Omit<CartUIItem, 'quantity' | 'cartItemId'>, quantity: number = 1) => {
        console.log('addToCart çağrıldı:', { newItem, quantity });
        try {
            const token = localStorage.getItem('authToken');
            console.log('Token:', token ? 'VAR' : 'YOK');
            console.log('variantId:', newItem.variantId);

            if (!token || !newItem.variantId) {
                console.error('No token or variantId', { token: !!token, variantId: newItem.variantId });
                return;
            }

            console.log('Backend\'e cart item ekleniyor...');
            const response = await apiClient.post('/cart/items', {
                variantId: newItem.variantId,
                quantity
            });
            console.log('Backend response:', response.data);

            await fetchCart();
            setIsOpen(true);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.error('Backend cart add failed:', error);
        }
    };

    const removeFromCart = async (variantId: number) => {
        try {
            await apiClient.delete(`/cart/items/${variantId}`);
            await fetchCart();
        } catch (error) {
            console.error('Backend cart remove failed:', error);
        }
    };

    const updateQuantity = async (variantId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(variantId);
            return;
        }

        try {
            await apiClient.put(`/cart/items/${variantId}`, { quantity });
            await fetchCart();
        } catch (error) {
            console.error('Backend cart update failed:', error);
        }
    };

    const clearCart = async () => {
        try {
            await apiClient.delete('/cart');
            setItems([]);
        } catch (error) {
            console.error('Backend cart clear failed:', error);
        }
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                showAlert,
                addToCart,
                removeFromCart,
                updateQuantity,
                openCart,
                closeCart,
                clearCart,
                totalPrice,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
