import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { check_authenticated, refreshToken, load_user } from "../redux/actions/auth";
import { connect } from "react-redux";
import { useEffect } from "react";

const Layout = (props) => {

    useEffect(() => {
        props.refreshToken();
        props.check_authenticated();
        props.load_user();
    }, []); // Incluye las funciones en la lista de dependencias

    return (
        <div>
            <Navbar />
            <ToastContainer autoClose={3000} />
            {props.children}
            <Footer />
        </div>
    );
};

export default connect(null, {
    refreshToken,
    check_authenticated,
    load_user,
})(Layout);
