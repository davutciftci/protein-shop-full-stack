import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FooterBanner from './FooterBanner';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <FooterBanner />
            <Footer />
        </div>
    );
}
