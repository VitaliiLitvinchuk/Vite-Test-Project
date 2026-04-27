import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { useAccessibleRouting } from "../../hooks/useAccessibleRouting";
import GlobalToast from "../GlobalToast";
import './index.css';

const Layout = () => {
    // Initialize accessible routing (title updates & focus management)
    useAccessibleRouting();

    return (
        <>
            <header>
                <Header />
            </header>
            <main id="layout" tabIndex={-1}>
                <Outlet />
            </main >
            <footer>
                <Footer />
            </footer>
            {/* Global toast notification with aria-live="polite" */}
            <GlobalToast />
        </>
    )
}

export default Layout;