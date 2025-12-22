import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Pages
import HomePage from '../pages/home/HomePage';



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            }
        ]
    },
]);
