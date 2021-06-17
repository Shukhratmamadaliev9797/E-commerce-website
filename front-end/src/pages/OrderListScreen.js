import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/orderActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import male from "../images/male.png";
import female from "../images/female.png";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import { Link } from "react-router-dom";

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, successDelete, sellerMode, userInfo]);

  const deleteOrderHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  const renderProductLists = () => {
    return orders.map((order) => {
      return (
        <div className="productList__card" key={order._id}>
          <div className="productList__card-img">
            <img
              src={
                order.user.gender === "male"
                  ? male
                  : order.user.gender === "female"
                  ? female
                  : ""
              }
              alt={order.user.name}
            />
          </div>
          <div className="productList__card-details">
            <div className="productList__card-details-top">
              <h2>{order.shippingAddress.fullname}</h2>
            </div>
            <div className="productList__card-details-bottom">
              <div className="productList__card-detail">
                <span>Order Name</span>
                {order.orderItems.map((item) => (
                  <span key={item._id}>
                    <Link
                      className="productList__card-details-link"
                      to={`/product/${item.product}`}
                    >
                      {item.name.substring(0, 50)}...
                    </Link>
                  </span>
                ))}
              </div>
              <div className="productList__card-detail">
                <span>Order ID</span>
                {order.orderItems.map((item) => (
                  <span key={item._id}>#{item._id}</span>
                ))}
              </div>
              <div className="productList__card-detail">
                <span>Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="productList__card-detail">
                <span>Paid</span>
                <span className={order.isPaid ? "success" : "error"}>
                  {order.isPaid ? "Yes" : "No"}
                </span>
              </div>
              <div className="productList__card-detail">
                <span>Delivered</span>
                <span className={order.isDelivered ? "success" : "error"}>
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </div>
              <div className="productList__card-detail">
                <span>Price</span>
                <span>£{order.totalPrice}</span>
              </div>
              <div className="productList__card-detail">
                <span>Date</span>
                <span>{order.createdAt.substring(0, 10)}</span>
              </div>
            </div>
          </div>
          <div className="productList__card-buttons">
            <Button
              onClick={() => props.history.push(`/order/${order._id}`)}
              className="btn__yellow"
            >
              <i className="fas fa-edit"></i>Details
            </Button>
            <Button
              onClick={() => deleteOrderHandler(order)}
              className="btn__red"
            >
              <i className="fas fa-trash-alt"></i>Delete
            </Button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="productList">
      <div className="form__header">
        <h1>Order List</h1>
      </div>
      {loadingDelete && <Loading />}
      {errorDelete && <MessageBox className="error">{errorDelete}</MessageBox>}
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        renderProductLists()
      )}
    </div>
  );
}
