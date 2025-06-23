import './App.css'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {createBrowserRouter, RouterProvider} from "react-routes";
import NotFound from "./components/NotFound.tsx";
import routes from "./routes.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Layout from "./components/Layout.tsx";

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

      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  )
}

export default App
