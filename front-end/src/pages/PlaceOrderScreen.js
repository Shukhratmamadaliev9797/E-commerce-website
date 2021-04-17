import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Button from "../components/Button";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder__container">
        <div className="placeorder__details">
          <div className="placeorder__details-box">
            <h3>Shipping</h3>
            <p>
              <strong>Name: </strong> {cart.shippingAddress.fullname}
            </p>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address
                .toLowerCase()
                .split(" ")
                .map((ad) => ad.charAt(0).toUpperCase() + ad.slice(1))
                .join(" ")}{" "}
              {cart.shippingAddress.city} {cart.shippingAddress.country}{" "}
              {cart.shippingAddress.postcode}
            </p>
          </div>
          <div className="placeorder__details-box">
            <h3>Payment</h3>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>
          <div className="placeorder__details-box">
            <h3>Order items</h3>
            {cart.cartItems.map((item) => {
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
                    {item.name}
                  </Link>
                  <span>{item.qty}</span>
                  <span>{item.price}£</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="placeorder__action">
          <div className="placeorder__action-box">
            <h3>Order Summary</h3>
            <div>
              <span>Items</span>
              <span>{cart.itemsPrice.toFixed(2)}£</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{cart.shippingPrice.toFixed(2)}£</span>
            </div>
            <div>
              <span>Tax</span>
              <span>{cart.taxPrice.toFixed(2)}£</span>
            </div>
            <div>
              <span>
                <strong>Order total</strong>
              </span>
              <span>
                <strong>{cart.totalPrice.toFixed(2)}£</strong>
              </span>
            </div>
            <Button
              type="button"
              onClick={placeOrderHandler}
              className="btn__yellow"
              disabled={cart.cartItems.length === 0}
            >
              Place Order
            </Button>
          </div>
          {loading && <Loading></Loading>}
          {error && <MessageBox className="error">{error}</MessageBox>}
        </div>
      </div>
    </div>
  );
}
