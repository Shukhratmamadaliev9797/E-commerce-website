import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import Button from "../components/Button";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart__header">
        <h1>Shopping cart</h1>
      </div>
      <div className="cart__container">
        <div className="cart__items">
          {error && <MessageBox className="error">{error}</MessageBox>}
          {cartItems.length === 0 ? (
            <MessageBox className="info">
              Cart is empty. <Link to="/">Go shopping</Link>
            </MessageBox>
          ) : (
            cartItems.map((item) => {
              return (
                <div key={item.product} className="cart__item">
                  <img
                    className="cart__item-img"
                    src={item.image}
                    alt={item.name}
                  />
                  <Link
                    className="cart__item-name"
                    to={`/product/${item.product}`}
                  >
                    {item.name.substring(0, 50)}...
                  </Link>
                  <select
                    className=""
                    value={item.qty}
                    onChange={(e) => {
                      dispatch(addToCart(item.product, Number(e.target.value)));
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <span>£{item.price}</span>
                  <Button
                    className="btn__red0"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className="fas fa-trash-alt"></i>
                    Delete
                  </Button>
                </div>
              );
            })
          )}
        </div>
        <div className="cart__action">
          <div className="cart__action-box">
            <div className="cart__action-box-total">
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : £
              {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </div>
            <Button
              className="btn__yellow"
              onClick={checkOutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
