import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setGender(user.gender);
      setCity(user.city);
      setCountry(user.country);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, successUpdate, props.history]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        gender,
        city,
        country,
        email,
        isSeller,
        isAdmin,
      })
    );
  };
  return (
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
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox className="error">{error}</MessageBox>
        ) : (
          <>
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
              <label className="form__label" htmlFor="isSeller">
                Is Seller
              </label>
              <input
                className="form__input"
                type="checkbox"
                checked={isSeller}
                id="isSeller"
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="isAdmin">
                Is Admin
              </label>
              <input
                className="form__input"
                type="checkbox"
                checked={isAdmin}
                id="isAdmin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className="form__inputBox">
              <Button type="submit" className="btn__yellow">
                Update
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
