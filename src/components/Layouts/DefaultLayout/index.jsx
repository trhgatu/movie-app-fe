import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet } from "react-router-dom";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="bg-white pt-20">
                <div className="content">
                    {children}
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
