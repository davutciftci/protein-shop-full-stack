import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AuthLayout from '../components/layout/AuthLayout';
import AccountLayout from '../components/layout/AccountLayout';
import CheckoutLayout from '../components/layout/CheckoutLayout';
import AdminLayout from '../components/layout/AdminLayout';
import HomePage from '../pages/home/HomePage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import AllProductsPage from '../pages/products/AllProductsPage';
import ContactPage from '../pages/contact/ContactPage';
import ReviewsPage from '../pages/reviews/ReviewsPage';
import FAQPage from '../pages/faq/FAQPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import AccountPage from '../pages/account/AccountPage';
import OrderDetailPage from '../pages/orders/OrderDetailPage';
import OrderSuccessPage from '../pages/orders/OrderSuccessPage';
import AboutPage from '../pages/about/AboutPage';
import SalesAgreementPage from '../pages/policies/SalesAgreementPage';
import RefundPolicyPage from '../pages/policies/RefundPolicyPage';
import WorkPrinciplesPage from '../pages/policies/WorkPrinciplesPage';
import KVKKPage from '../pages/policies/KVKKPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductManagement from '../pages/admin/ProductManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import ProductCreatePage from '../pages/admin/ProductCreatePage';
import ProductEditPage from '../pages/admin/ProductEditPage';
import OrderManagement from '../pages/admin/OrderManagement';

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
                path: 'urun/:category/:slug',
                element: <ProductDetailPage />,
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
            },
            {
                path: 'hakkimizda',
                element: <AboutPage />,
            },
            {
                path: 'sozlesme',
                element: <SalesAgreementPage />,
            },
            {
                path: 'iade',
                element: <RefundPolicyPage />,
            },
            {
                path: 'ilkelerimiz',
                element: <WorkPrinciplesPage />,
            },
            {
                path: 'kvkk',
                element: <KVKKPage />,
            }
        ]
    },
    {
        path: '/giris',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            }
        ]
    },
    {
        path: '/kayit',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <RegisterPage />,
            }
        ]
    },
    {
        path: '/sifremi-unuttum',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <ForgotPasswordPage />,
            }
        ]
    },
    {
        path: '/sifre-sifirla',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <ResetPasswordPage />,
            }
        ]
    },
    {
        path: '/hesabim',
        element: <AccountLayout />,
        children: [
            {
                index: true,
                element: <AccountPage />,
            }
        ]
    },
    {
        path: '/siparis/:orderId',
        element: <AccountLayout />,
        children: [
            {
                index: true,
                element: <OrderDetailPage />,
            }
        ]
    },
    {
        path: '/siparis-basarili/:orderId',
        element: <OrderSuccessPage />,
    },
    {
        path: '/odeme',
        element: <CheckoutLayout />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: 'products',
                element: <ProductManagement />,
            },
            {
                path: 'products/new',
                element: <ProductCreatePage />,
            },
            {
                path: 'products/:id/edit',
                element: <ProductEditPage />,
            },
            {
                path: 'categories',
                element: <CategoryManagement />,
            },
            {
                path: 'orders',
                element: <OrderManagement />,
            },
        ]
    }
]);

