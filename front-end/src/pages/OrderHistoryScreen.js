import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myOrderHistory } from "../actions/orderActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMyHistory = useSelector((state) => state.orderMyHistory);
  const { loading, error, orders } = orderMyHistory;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrderHistory());
  }, [dispatch]);

  const renderOrderHistoryCard = () => {
    return orders.map((order) => {
      return (
        <div className="orderHistory__card" key={order._id}>
          <div className="orderHistory__card-top">
            <span>Order Placed: {order.createdAt.substring(0, 10)}</span>
            <span>Price: {order.totalPrice}£</span>
            <span>Deliver to {order.shippingAddress.fullname}</span>
            <span>Order id: #{order._id}</span>
          </div>
          <div className="orderHistory__card-bottom">
            <div className="orderHistory__card-bottom-generalInfo">
              {order.isDelivered ? (
                <h3>{order.deliveredAt.substring(0, 10)}</h3>
              ) : (
                <h3>Not Delivered</h3>
              )}
              {order.isPaid ? (
                <h3>Paid By {order.paymentMethod}</h3>
              ) : (
                <h3>Not Paid</h3>
              )}
            </div>
            <div className="orderHistory__card-items">
              <div className="orderHistory__card-items-left">
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
                      <Button
                        onClick={() =>
                          props.history.push(`/product/${item.product}`)
                        }
                        className="btn__yellow0"
                      >
                        Buy again
                      </Button>
                    </div>
                  );
                })}
              </div>
              <div className="orderHistory__card-items-right">
                <Button
                  className="btn__green0"
                  onClick={() => props.history.push(`/order/${order._id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="orderHistory">
      <div className="form__header">
        <h1>Profile</h1>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div className="orderHistory__box">{renderOrderHistoryCard()} </div>
      )}
    </div>
  );
}
