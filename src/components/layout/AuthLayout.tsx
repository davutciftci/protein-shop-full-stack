import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { CartProvider } from '../../context/CartContext';
import CartSidepanel from '../cart/CartSidepanel';
import ScrollToTop from '../ScrollToTop';
import ScrollToTopButton from '../ScrollToTopButton';

export default function AuthLayout() {
    return (
        <CartProvider>
            <ScrollToTop />
            <ScrollToTopButton />
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
            <CartSidepanel />
        </CartProvider>
    );
}
