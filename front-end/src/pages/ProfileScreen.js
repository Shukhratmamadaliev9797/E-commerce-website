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
  console.log(user);
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
                  <i class="fas fa-map-marker-alt"></i> Location: {user.city},{" "}
                  {user.country}
                </li>
                <li>
                  <i class="fas fa-envelope"></i> Email: {user.email}
                </li>
                <li>
                  <i class="fas fa-user-circle"></i> Created at:{" "}
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
      )}
    </div>
  );
}
