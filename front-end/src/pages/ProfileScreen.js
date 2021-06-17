import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import male from "../images/male.png";
import female from "../images/female.png";
import Button from "../components/Button";

export default function ProfileScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div>
          <div className="form__header">
            <h1>Profile</h1>
          </div>
          <div className="profile">
            <div className="profile__pictureBox">
              <img
                className="profile__picture"
                src={
                  user.gender === "male"
                    ? male
                    : user.gender === "female"
                    ? female
                    : ""
                }
                alt="userAvatar"
              />
              <h2>{user.name}</h2>
            </div>
            <div className="profile__detailsBox">
              <div className="profile__personalBox">
                <ul>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> {user.city},{" "}
                    {user.country}
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    {user.email}
                  </li>
                  <li>
                    <i className="fas fa-user-circle"></i> Created at:{" "}
                    {user.createdAt.substring(0, 10)}
                  </li>
                  <li>
                    <Button
                      className="btn__yellow0"
                      onClick={() => props.history.push("/updateprofile")}
                    >
                      Edit Profile
                    </Button>
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
