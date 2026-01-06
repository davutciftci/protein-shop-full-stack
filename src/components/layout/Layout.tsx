import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FooterBanner from './FooterBanner';
import { CartProvider } from '../../context/CartContext';
import CartSidepanel from '../cart/CartSidepanel';

export default function Layout() {
    const location = useLocation();
    const isProductPage = location.pathname.startsWith('/urun/');

    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Outlet />
                {!isProductPage && location.pathname !== '/iletisim' && location.pathname !== '/S.S.S' && <FooterBanner />}
                <Footer />
            </div>
            <CartSidepanel />
        </CartProvider>
    );
}
