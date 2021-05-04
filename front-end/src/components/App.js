import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomeScreen from "../pages/HomeScreen";
import ProductScreen from "../pages/ProductScreen";
import Footer from "./Footer";
import CartScreen from "../pages/CartScreen";
import SignInScreen from "../pages/SignInScreen";
import RegisterScreen from "../pages/RegisterScreen";
import CheckoutScreenAddress from "../pages/CheckoutScreenAddress";
import PaymentMethodScreen from "../pages/PaymentMethodScreen";
import PlaceOrderScreen from "../pages/PlaceOrderScreen";
import OrderScreen from "../pages/OrderScreen";
import OrderHistoryScreen from "../pages/OrderHistoryScreen";
import ProfileScreen from "../pages/ProfileScreen";
import UpdateProfileScreen from "../pages/UpdateProfileScreen";
import AdminProductListScreen from "../pages/AdminProductListScreen";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ProductEditScreen from "../pages/ProductEditScreen";
import OrderListScreen from "../pages/OrderListScreen";
import "../styles/app.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="body__container">
        <Navbar />
        <Route path="/" exact component={HomeScreen}></Route>
        <Route path="/product/:id" exact component={ProductScreen}></Route>
        <Route
          path="/product/:id/edit"
          exact
          component={ProductEditScreen}
        ></Route>
        <Route path="/cart/:id?" exact component={CartScreen} />
        <Route path="/signin" exact component={SignInScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/shipping" exact component={CheckoutScreenAddress} />
        <Route path="/payment" exact component={PaymentMethodScreen} />
        <Route path="/placeorder" exact component={PlaceOrderScreen} />
        <Route path="/order/:id" exact component={OrderScreen} />
        <Route path="/orderhistory" exact component={OrderHistoryScreen} />
        <Route path="/profile" exact component={ProfileScreen} />
        <PrivateRoute
          path="/updateprofile"
          exact
          component={UpdateProfileScreen}
        />
        <AdminRoute
          path="/productslist"
          exact
          component={AdminProductListScreen}
        />
        <AdminRoute path="/orderlist" exact component={OrderListScreen} />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
