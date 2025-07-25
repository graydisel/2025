import './css/App.css'
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import {routes, authRoutes} from "./components/layout/routes.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {ThemeProvider} from "@mui/material";
import {mainTheme} from "./css/themes.ts";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      errorElement: <ErrorBoundary/>,
      children: [
        ...routes, ...authRoutes,
        {
          path: '*',
          element: <NotFound/>
        },
      ]
    }
  ])

  return (
      <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
  )
}

export default App
