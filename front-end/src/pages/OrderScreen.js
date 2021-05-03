import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import Button from "../components/Button";

import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [orderId, dispatch, order, setSdkReady, successPay, successDeliver]);
  const successPaymentHandler = (paymentResults) => {
    dispatch(payOrder(order, paymentResults));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <MessageBox className="error">{error}</MessageBox>
  ) : (
    <div>
      <div className="placeorder__container">
        <h1>Order: #{order._id}</h1>
        <div className="placeorder__details">
          <div className="placeorder__details-box">
            <h3>Shipping</h3>
            <p>
              <strong>Name: </strong> {order.shippingAddress.fullname}
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address
                .toLowerCase()
                .split(" ")
                .map((ad) => ad.charAt(0).toUpperCase() + ad.slice(1))
                .join(" ")}{" "}
              {order.shippingAddress.city} {order.shippingAddress.country}{" "}
              {order.shippingAddress.postcode}
            </p>
            {order.isDelivered ? (
              <MessageBox className="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox className="error">Not Delivered</MessageBox>
            )}
          </div>
          <div className="placeorder__details-box">
            <h3>Payment</h3>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <MessageBox className="success">
                Paid at {order.paidAt}
              </MessageBox>
            ) : (
              <MessageBox className="error">Not Paid</MessageBox>
            )}
          </div>
          <div className="placeorder__details-box">
            <h3>Order items</h3>
            {order.orderItems.map((item) => {
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
              <span>{order.itemsPrice.toFixed(2)}£</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{order.shippingPrice.toFixed(2)}£</span>
            </div>
            <div>
              <span>Tax</span>
              <span>{order.taxPrice.toFixed(2)}£</span>
            </div>
            <div>
              <span>
                <strong>Order total</strong>
              </span>
              <span>
                <strong>{order.totalPrice.toFixed(2)}£</strong>
              </span>
            </div>
            {!sdkReady ? (
              <span>Loading...</span>
            ) : (
              <>
                {errorPay && (
                  <MessageBox className="error">{errorPay}</MessageBox>
                )}
                {loadingPay && <span>Loading...</span>}
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                ></PayPalButton>
              </>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <Button onClick={deliverHandler} className="btn__yellow">
                Deliver Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
