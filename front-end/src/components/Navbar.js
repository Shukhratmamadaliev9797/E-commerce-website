import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <Link className="navbar__logo-link" to="/">
          S<span>h</span>opify
        </Link>
      </div>
      <div className="navbar__menu">
        <ul className="navbar__menu-items">
          <li>
            <Link className="navbar__menu-link" to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </li>

          <li>
            {userInfo ? (
              <>
                <Link className="navbar__menu-link" to="/profile">
                  <i class="fas fa-user-circle"></i>
                  {userInfo.name}
                </Link>
                <ul className="navbar__dropdown">
                  <li>
                    <Link to="/profile" className="navbar__menu-link">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderhistory" className="navbar__menu-link">
                      Order history
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navbar__menu-link"
                      to="/"
                      onClick={signOutHandler}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <li>
                <Link className="navbar__menu-link" to="/signin">
                  Sign In
                </Link>
              </li>
            )}
          </li>
          <li>
            {userInfo && userInfo.isAdmin && (
              <>
                <Link className="navbar__menu-link" to="/profile">
                  <i class="fas fa-user-circle"></i>
                  Admin
                </Link>
                <ul className="navbar__dropdown">
                  <li>
                    <Link to="/dashboard" className="navbar__menu-link">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="navbar__menu-link">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar__menu-link" to="/">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar__menu-link" to="/">
                      Users
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
