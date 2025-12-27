import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Pages
import HomePage from '../pages/home/HomePage';
import ProductDetailPage from '../pages/products/ProductDetailPage';

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
            }
        ]
    },
]);
