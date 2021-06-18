import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateImage } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import male from "../images/male.png";
import female from "../images/female.png";
import Button from "../components/Button";
import axios from "../../node_modules/axios/index";
import { USER_UPDATE_RESET } from "../constants/userConstants";
export default function ProfileScreen(props) {
  const [image, setImage] = useState("");
  const [save, setSave] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();

  const userUpdateImage = useSelector((state) => state.userUpdateImage);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateImage;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    }
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id, props.history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
      setSave(true);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateImage({ userId: user._id, image }));
    setSave(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div>
          {successUpdate && (
            <MessageBox className="success">
              Image successfully uploaded!
            </MessageBox>
          )}
          <div className="form__header">
            <h1>Profile</h1>
          </div>
          <div className="profile">
            <div className="profile__pictureBox">
              <form onSubmit={submitHandler}>
                <div className="profile__picture">
                  <img
                    src={
                      image
                        ? image
                        : user.image
                        ? user.image
                        : user.gender === "male"
                        ? male
                        : user.gender === "female"
                        ? female
                        : ""
                    }
                    alt="userAvatar"
                  />
                  <div className="profile__addPicture">
                    <label htmlFor="addPhoto">
                      <i className="fas fa-camera"></i>
                    </label>
                    <input
                      id="addPhoto"
                      type="file"
                      onChange={uploadFileHandler}
                    />
                    <input
                      type="text"
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                      placeholder="image"
                    />
                  </div>
                </div>
                {loadingUpload && "uploading image..."}
                {errorUpload && errorUpload}

                <div className="profile__saveButton">
                  {save && <button type="submit">Save</button>}
                </div>

                <h2>{user.name}</h2>
              </form>
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
