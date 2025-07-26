import Home from "../../pages/Home.tsx";
import About from "../../pages/About.tsx";
import type {RouteInterface} from "../../types/common.ts";
import Products from "../../pages/Products.tsx";
import SignUp from "../../pages/SignUp.tsx";
import SignIn from "../../pages/SignIn.tsx";
import Profile from "../../pages/Profile.tsx";

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
]