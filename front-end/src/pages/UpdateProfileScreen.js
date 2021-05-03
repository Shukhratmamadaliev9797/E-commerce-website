import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function UpdateProfileScreen(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setGender(user.gender);
      setCity(user.city);
      setCountry(user.country);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const updateHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Password and Confirm Password are not matched ");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          gender,
          city,
          country,
          email,
          password,
        })
      );

      props.history.push("/profile");
    }
  };

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div className="signIn__container">
          <form className="form" onSubmit={updateHandler}>
            <div>
              <h1 className="form__title">Update Profile</h1>
            </div>
            {loadingUpdate && <Loading />}
            {errorUpdate && (
              <MessageBox className="error">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox className="success">Profile Updated</MessageBox>
            )}
            <div className="form__inputBox">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                className="form__input"
                value={name}
                type="text"
                id="name"
                placeholder="Enter name..."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="gender">
                Choose your gender
              </label>
              <div className="form__radioBox">
                <div>
                  <label className="form__radio__label" htmlFor="male">
                    Male
                  </label>
                  <input
                    className="form__radio"
                    type="radio"
                    id="male"
                    value="male"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form__radio__label" htmlFor="female">
                    Female
                  </label>
                  <input
                    className="form__radio"
                    name="gender"
                    type="radio"
                    value="female"
                    id="female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="city">
                City
              </label>
              <input
                className="form__input"
                type="text"
                value={city}
                id="city"
                placeholder="Enter city..."
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="country">
                Country
              </label>
              <input
                className="form__input"
                type="text"
                value={country}
                id="country"
                placeholder="Enter country..."
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                type="email"
                value={email}
                id="email"
                placeholder="Enter email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="password">
                Enter new Password
              </label>
              <input
                className="form__input"
                type="password"
                id="password"
                placeholder="Enter password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="Confirmpassword">
                Confirm new Password
              </label>
              <input
                className="form__input"
                type="password"
                id="Confirmpassword"
                placeholder="Confirm password..."
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <Button className="btn__yellow">Update</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
