import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import './index.css';

const Layout = () => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main id="layout">
                <Outlet />
            </main >
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout;