import './App.css'
import './routes.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import routes from "./routes.tsx";
import Layout from './components/Layout.tsx'
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import NotFound from "./components/NotFound.tsx";

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

    return (
        <>
                <RouterProvider router={router} />
        </>
    )
}

export default App
