import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FooterBanner from './FooterBanner';

export default function Layout() {
    const location = useLocation();
    const isProductPage = location.pathname.startsWith('/urun/');

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            {!isProductPage && <FooterBanner />}
            <Footer />
        </div>
    );
}
