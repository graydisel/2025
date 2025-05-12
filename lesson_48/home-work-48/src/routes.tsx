import Home from './components/Home.tsx'
import About from './components/About.tsx'
import Contact from './components/Contact.tsx'
import { type RouteInterface } from "./types/interfaces.js";
import {News} from "./components/News.tsx";

const routes:RouteInterface[] = [
    {
        title: 'Home',
        path: '',
        element: <Home />,
        label: 'Home',
    },
    {
        title: 'News',
        path: 'News',
        element: <News/>,
        label: 'News'
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
];
export default routes;