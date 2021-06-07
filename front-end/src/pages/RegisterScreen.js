import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Password and confirm password are not matched");
    } else {
      dispatch(register(name, gender, city, country, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div className="signIn__container">
      <div className="form__header">
        <h1>Register</h1>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="form__title">Create Account</h1>
        </div>
        {loading && <Loading />}
        {error && <MessageBox className="error">{error}</MessageBox>}
        <div className="form__inputBox">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            type="text"
            id="name"
            placeholder="Enter name..."
            required
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
                required
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
                required
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
            id="city"
            placeholder="Enter city..."
            required
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
            id="country"
            placeholder="Enter country..."
            required
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
            id="email"
            placeholder="Enter email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label" htmlFor="password">
            Enter Password
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            placeholder="Enter password..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label" htmlFor="Confirmpassword">
            Confirm Password
          </label>
          <input
            className="form__input"
            type="password"
            id="Confirmpassword"
            placeholder="Confirm password..."
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <Button className="btn__yellow">Register</Button>
        </div>
        <div className="register__link">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </div>
      </form>
    </div>
  );
}
