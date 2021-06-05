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
import UserListScreen from "../pages/UserListScreen";
import UserEditScreen from "../pages/UserEditScreen";
import SellerRoute from "./SellerRoute";

import SellerScreen from "../pages/SellerScreen";

const App = () => {
  return (
    <BrowserRouter>
      <div className="body">
        <div className="body__nav">
          <Navbar />
        </div>
        <div className="body__content">
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
          <Route path="/seller/:id" exact component={SellerScreen} />
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
          <AdminRoute path="/userlist" exact component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" exact component={UserEditScreen} />
          <SellerRoute
            path="/productslist/seller"
            exact
            component={AdminProductListScreen}
          />
          <SellerRoute
            path="/orderlist/seller"
            exact
            component={OrderListScreen}
          />
        </div>
        <div className="body__footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
