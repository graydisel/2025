import Home from "../../pages/Home.tsx";
import About from "../../pages/About.tsx";
import Books from "../../pages/Books.tsx";
import Cart from "../../pages/Cart.tsx";
import type {RouteInterface} from "../../types/common.ts";

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
        title: 'Books',
        path: 'books',
        element: <Books />,
        label: 'Books'
    },
    {
        title: 'Cart',
        path: 'cart',
        element: <Cart />,
        label: 'Cart',
    },
];
export default routes;