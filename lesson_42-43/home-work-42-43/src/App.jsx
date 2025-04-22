import {useState} from 'react'
import './App.css'
import './routes.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import routes from "./routes.jsx";
import Layout from './components/Layout.jsx'
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./components/NotFound.jsx";
import {CountryContext} from "./components/CountryContext.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorBoundary/>,
        children: [
            ...routes,
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    }
])

function App() {
    const [country, setCountry] = useState('-');

    return (
        <>
            <CountryContext.Provider value={{country, setCountry}}>.
                <RouterProvider router={router} />
            </CountryContext.Provider>
        </>
    )
}

export default App
