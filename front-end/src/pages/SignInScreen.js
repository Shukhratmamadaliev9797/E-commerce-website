import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div className="signIn__container">
      <div className="form__header">
        <h1>Sign in</h1>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="form__title">Sign-In Form</h1>
        </div>
        {loading && <Loading />}
        {error && <MessageBox className="error">{error}</MessageBox>}
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
          <Button className="btn__yellow">Sign In</Button>
        </div>
        <div className="register__link">
          New Costumer?
          <Link to={`/register?redirect=${redirect}`}> Create new account</Link>
        </div>
      </form>
    </div>
  );
}
