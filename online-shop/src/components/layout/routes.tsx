import Home from "../../pages/Home.tsx";
import About from "../../pages/About.tsx";
import Cart from "../../pages/Cart.tsx";
import type {RouteInterface} from "../../types/common.ts";
import Products from "../../pages/Products.tsx";

const routes:RouteInterface[] = [
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
        path: 'cart',
        element: <Cart />,
        label: 'Cart',
    },
];
export default routes;