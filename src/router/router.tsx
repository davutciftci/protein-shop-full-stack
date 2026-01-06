import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Pages
import HomePage from '../pages/home/HomePage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import AllProductsPage from '../pages/products/AllProductsPage';
import ProteinPage from '../pages/categories/ProteinPage';
import ContactPage from '../pages/contact/ContactPage';
import ReviewsPage from '../pages/reviews/ReviewsPage';
import FAQPage from '../pages/faq/FAQPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'urun/:slug',
                element: <ProductDetailPage />,
            },
            {
                path: 'protein',
                element: <ProteinPage />,
            },
            {
                path: 'urunler',
                element: <AllProductsPage />,
            },
            {
                path: 'iletisim',
                element: <ContactPage />,
            },
            {
                path: 'yorumlar',
                element: <ReviewsPage />,
            },
            {
                path: 'S.S.S',
                element: <FAQPage />,
            }
        ]
    },
]);
