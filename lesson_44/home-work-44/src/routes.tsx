import Home from './components/Home.tsx'
import About from './components/About.tsx'
import Contact from './components/Contact.tsx'
import Products from './components/Products.tsx'
import { Route } from "./interfaces.js";

const routes:Route[] = [
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
        title: 'Contact',
        path: 'contact',
        element: <Contact />,
        label: 'Contact',
    },
    {
        title: 'Products',
        path: 'products',
        element: <Products />,
        label: 'Products',
    }
];
export default routes;