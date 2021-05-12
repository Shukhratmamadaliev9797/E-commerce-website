import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import male from "../images/male.png";
import female from "../images/female.png";
import Button from "../components/Button";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();

  const userDeleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };

  const renderUserList = () => {
    return users.map((user) => {
      return (
        <div className="productList__card" key={user._id}>
          <div className="productList__card-img">
            <img
              src={
                user.gender === "male"
                  ? male
                  : user.gender === "female"
                  ? female
                  : ""
              }
              alt={user.name}
            />
          </div>
          <div className="productList__card-details">
            <div className="productList__card-details-top">
              <h2>{user.name}</h2>
            </div>
            <div className="productList__card-details-bottom">
              <div className="productList__card-detail">
                <span>Created at</span>
                <span>{user.createdAt.substring(0, 10)}</span>
              </div>
              <div className="productList__card-detail">
                <span>Email address</span>
                <span>{user.email}</span>
              </div>
              <div className="productList__card-detail">
                <span>Gender</span>
                <span>{user.gender}</span>
              </div>
              <div className="productList__card-detail">
                <span>City</span>
                <span>{user.city}</span>
              </div>
              <div className="productList__card-detail">
                <span>Country</span>
                <span>{user.country}</span>
              </div>
              <div className="productList__card-detail">
                <span>Is Seller</span>
                <span>{user.isSeller ? "Yes" : "No"}</span>
              </div>
              <div className="productList__card-detail">
                <span>Is Admin</span>
                <span>{user.isAdmin ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          <div className="productList__card-buttons">
            <Button
              onClick={() => props.history.push(`/user/${user._id}/edit`)}
              className="btn__yellow"
            >
              <i className="fas fa-edit"></i>Details
            </Button>
            <Button
              onClick={() => userDeleteHandler(user)}
              className="btn__red"
            >
              <i className="fas fa-trash-alt"></i>Delete
            </Button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch, successDelete]);

  return (
    <div className="productList">
      <div className="productList__titleBox">
        <h1 className="title">User list</h1>
      </div>
      {loadingDelete && <MessageBox>User Deleting...</MessageBox>}
      {errorDelete && <MessageBox className="error">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox className="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        renderUserList()
      )}
    </div>
  );
}
