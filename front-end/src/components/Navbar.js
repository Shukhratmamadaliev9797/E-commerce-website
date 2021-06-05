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
  /* <div className="navbar__container">
      <div className="navbar__logo">
        <Link className="navbar__logo-link" to="/">
          S<span>h</span>opify
        </Link>
      </div>
      <div className="navbar__menu">
        <ul className="navbar__menu-items">
          <li>
            <Link className="navbar__menu-link" to="/cart">
              <i className="fas fa-shopping-cart"></i>
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
                  <i className="fas fa-user-circle"></i>
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
            {userInfo && userInfo.isSeller && (
              <>
                <Link className="navbar__menu-link" to="/profile">
                  <i className="fas fa-user-circle"></i>
                  Seller
                </Link>
                <ul className="navbar__dropdown">
                  <li>
                    <Link
                      to="/productslist/seller"
                      className="navbar__menu-link"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar__menu-link" to="/orderlist/seller">
                      Orders
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </li>
          <li>
            {userInfo && userInfo.isAdmin && (
              <>
                <Link className="navbar__menu-link" to="/profile">
                  <i className="fas fa-user-circle"></i>
                  Admin
                </Link>
                <ul className="navbar__dropdown">
                  <li>
                    <Link to="/dashboard" className="navbar__menu-link">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/productslist" className="navbar__menu-link">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar__menu-link" to="/orderlist">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar__menu-link" to="/userlist">
                      Users
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </div>
    </div> */

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="./images/cart4.gif" alt="logo" />
        </Link>
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="navbar__menu">
        <ul>
          <li>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && (
                <span className="navbar__badge">{cartItems.length}</span>
              )}
              Cart
            </Link>
          </li>
          <li>
            {userInfo ? (
              <>
                <Link to="/profile">
                  <i className="fas fa-user-circle"></i>
                  {userInfo.name}
                </Link>
                <ul className="navbar__dropdown">
                  <li style={{ animationDelay: ".3s" }}>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li style={{ animationDelay: ".6s" }}>
                    <Link to="/orderhistory">Order history</Link>
                  </li>
                  <li style={{ animationDelay: ".9s" }}>
                    <Link to="/" onClick={signOutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <li>
                <i className="fas fa-user-circle"></i>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
          </li>
          <li>
            {userInfo && userInfo.isSeller && (
              <>
                <Link to="/profile">
                  <i className="fas fa-dolly"></i>
                  Seller
                </Link>
                <ul className="navbar__dropdown">
                  <li style={{ animationDelay: ".3s" }}>
                    <Link to="/productslist/seller">Products</Link>
                  </li>
                  <li style={{ animationDelay: ".6s" }}>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </>
            )}
          </li>
          <li>
            {userInfo && userInfo.isAdmin && (
              <>
                <Link to="/profile">
                  <i className="fas fa-eye"></i>
                  Admin
                </Link>
                <ul className="navbar__dropdown">
                  <li style={{ animationDelay: ".3s" }}>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li style={{ animationDelay: ".6s" }}>
                    <Link to="/productslist">Products</Link>
                  </li>
                  <li style={{ animationDelay: ".9s" }}>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li style={{ animationDelay: "1.2s" }}>
                    <Link to="/userlist">Users</Link>
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
