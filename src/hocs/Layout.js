import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { check_authenticated, refresh, load_user } from "../redux/actions/auth";
import { connect } from "react-redux";
import { useEffect } from "react";

const Layout = ({ refresh, check_authenticated, load_user, children }) => {

    useEffect(() => {
        refresh();
        check_authenticated();
        load_user();
    }, [refresh, check_authenticated, load_user]); // Incluye las funciones en la lista de dependencias

    return (
        <div>
            <Navbar />
            <ToastContainer autoClose={3000} />
            {children}
            <Footer />
        </div>
    );
};

export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
})(Layout);
