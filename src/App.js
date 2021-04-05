import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Layouts/Footer";
import ViewProductByCategory from "./components/Product/ViewProductByCategory";
import ScrollToTop from "./ScrollToTop";
import DetailProduct from "./components/Product/DetailProduct";
import ViewAll from "./components/Product/ViewAll";
import Wishlist from "./components/page/Wishlist";

import { API } from "./config/config";
import { connect } from "react-redux";
import ModalLogin from "./components/Layouts/ModalLogin";
import actionType from "./redux/reducer/globalType";
import axios from "axios";
import Register from "./components/page/Register";
import SuccessRegiister from "./components/page/SuccessRegister";
import Profile from "./components/page/Profile";
import NotFound from "./components/page/NotFound";

function App({ toggleLogin, fetchWishlist }) {
  // fetch wishlist

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios(
        `${API}/api/auctions/wishlist/${
          JSON.parse(localStorage.getItem("user")).client_id
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          console.log(res.data.data);
          fetchWishlist(res.data.data);
        })
        .catch((e) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    }
  }, []);
  return (
    <React.Fragment>
      <Router>
        {toggleLogin && <ModalLogin />}
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={ViewAll} />
          <Route
            exact
            path="/products/category/:category"
            component={ViewProductByCategory}
          />
          <Route exact path="/products/:auction_id" component={DetailProduct} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/registrasi" component={Register} />
          <Route exact path="/success/" component={SuccessRegiister} />
          <Route exact path="/profile/" component={Profile} />
          <Route path="*" exact component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    toggleLogin: state.toggleLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWishlist: (value) =>
      dispatch({ type: actionType.FETCH_WISHLIST, value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
