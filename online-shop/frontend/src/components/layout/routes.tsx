import Home from "../../pages/Home.tsx";
import About from "../../pages/About.tsx";
import type {RouteInterface} from "../../types/common.ts";
import Products from "../../pages/Products.tsx";
import SignUp from "../../pages/SignUp.tsx";
import SignIn from "../../pages/SignIn.tsx";
import Profile from "../../pages/Profile.tsx";
import AdminAddProduct from "../../pages/AdminAddProduct.tsx";
import AdminManageProducts from "../../pages/AdminManageProducts.tsx";
import AdminEditProduct from "../../pages/AdminEditProduct.tsx";

export const routes:RouteInterface[] = [
    {
        title: 'Home',
        path: '',
        element: <Home />,
        label: 'Home',
    },
    {
        title: 'About',
        path: 'about',
        element: <About />,
        label: 'About',
    },
    {
        title: 'Products',
        path: 'products',
        element: <Products />,
        label: 'Products'
    },
    {
        title: 'Cart',
        path: 'profile',
        element: <Profile />,
        label: '🛍️ Cart',
    },

];

export const authRoutes: RouteInterface[] = [
    {
        title: 'SignUp',
        path: 'auth/signup',
        element: <SignUp />,
        label: 'SignUp',
    },
    {
        title: 'SignIn',
        path: 'auth/signin',
        element: <SignIn />,
        label: 'SignIn',
    },
    {
        title: 'Profile',
        path: 'profile',
        element: <Profile />,
        label: 'Profile',
    },
];

export const adminRoutes: RouteInterface[] = [
    {
        title: 'Add Product',
        path: '/admin/add',
        element: <AdminAddProduct />,
        label: 'Add Product',
    },
    {
        title: 'Manage Products',
        path: '/admin/manage',
        element: <AdminManageProducts />,
        label: 'Manage Products',
    },
    {
        title: 'Edit Product',
        path: '/admin/edit/:id',
        element: <AdminEditProduct/>,
        label: 'Edit Product',
    }
]