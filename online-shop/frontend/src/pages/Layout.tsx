import Header from "../components/layout/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/layout/Footer.tsx";
import Menu from "../components/layout/Menu.tsx";


const Layout = () => {
    return(
        <>
            <Header />
            <main>
                <Menu />
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout