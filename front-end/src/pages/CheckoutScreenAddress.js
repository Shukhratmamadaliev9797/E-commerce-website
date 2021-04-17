import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

import Button from "../components/Button";
import CheckoutSteps from "../components/CheckoutSteps";

export default function CheckoutScreenAddress(props) {
  const userSignin = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const [fullname, setFullname] = useState(shippingAddress.fullname);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postcode, setPostcode] = useState(shippingAddress.postcode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullname,
        address,
        city,
        postcode,
        country,
      })
    );
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="form__title">Shipping address</h1>
        </div>

        <div className="form__inputBox">
          <label className="form__label" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="form__input"
            type="text"
            id="fullName"
            placeholder="Enter full name..."
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label" htmlFor="address">
            Address
          </label>
          <input
            className="form__input"
            type="text"
            id="address"
            placeholder="Enter address..."
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label" htmlFor="city">
            City name
          </label>
          <input
            className="form__input"
            type="text"
            id="city"
            placeholder="Enter your city..."
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label" htmlFor="postcode">
            Postcode
          </label>
          <input
            className="form__input"
            type="text"
            id="postcode"
            placeholder="Enter postcode..."
            required
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <label className="form__label" htmlFor="country">
            Country name
          </label>
          <input
            className="form__input"
            type="text"
            id="country"
            placeholder="Enter country..."
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form__inputBox">
          <Button className="btn__yellow" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
