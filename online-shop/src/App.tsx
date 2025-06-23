import './App.css'
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import routes from "./components/layout/routes.tsx";


function App() {
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

  return (
        <RouterProvider router={router} />
  )
}

export default App
