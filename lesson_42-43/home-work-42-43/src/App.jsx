import {useState} from 'react'
import './App.css'
import './routes.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import routes from "./routes.jsx";
import Layout from './components/Layout.jsx'
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./components/NotFound.jsx";
import {CountryContext} from "./components/CountryContext.js";

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
    const [count, setCount] = useState(0)

    return (
        <>
            {/*<CountryContext.Provider value={value}>.*/}
                <RouterProvider router={router}/>
            {/*</CountryContext.Provider>*/}
        </>
    )
}

export default App
