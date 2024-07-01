import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";
import Login from "./containers/Auth/Login";
import Signup from "./containers/Auth/Signup";
import Activate from "./containers/Auth/Activate";
import ResetPassword from "./containers/Auth/ResetPassword";
import ResetPasswordConfirm from "./containers/Auth/ResetPasswordConfirm";
import Shop from "./containers/Shop";
import ProductDetail from "./containers/pages/productDetail";
import Search from "./containers/pages/Search";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
            {/*Error Display*/}
            <Route path="*" element={<Error404/>}/>
            
            <Route exact path='/' element={<Home/>}/>
            
            {/* Authentication */}
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
            <Route exact path='/reset_password' Component={ResetPassword}/>
            <Route exact path='/password/reset/confirm/:uid/:token' Component={ResetPasswordConfirm}/>
            <Route exact path='/shop' element={<Shop/>}/>
            <Route exact path='/search' element={<Search/>}/>
            <Route exact path='/product/:productId' element={<ProductDetail/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
