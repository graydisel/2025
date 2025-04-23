import { Outlet } from "react-router";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const Layout = () => {
    return(
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    )
}

export default Layout