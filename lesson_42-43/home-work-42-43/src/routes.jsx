import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Products from './components/Products.jsx'

const routes = [
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