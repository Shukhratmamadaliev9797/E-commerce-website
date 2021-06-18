import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";

export default function ResponsiveNavbar({
  userInfo,
  cartItems,
  onClick,
  responsiveNavbar,
}) {
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  };
  return (
    <div
      className={`responsiveNavbar  ${
        responsiveNavbar
          ? "responsiveNavbar-active"
          : "responsiveNavbar-inactive"
      }`}
    >
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
            <>
              <i class="fas fa-sign-in-alt"></i>
              <Link to="/signin"> Sign In</Link>
            </>
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
        <li>
          <button onClick={onClick}>+</button>
        </li>
      </ul>
    </div>
  );
}
