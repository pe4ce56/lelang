import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Layouts/Footer";
import ViewProductByCategory from "./components/Product/ViewProductByCategory";
import ScrollToTop from "./ScrollToTop";
import DetailProduct from "./components/Product/DetailProduct";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/product-category/:category">
          <ViewProductByCategory />
        </Route>
        <Route exact path="/products/:product">
          <DetailProduct />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
