import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import Button from "../components/Button";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="form__title">Payment Method</h1>
        </div>
        <div className="form__inputBox">
          <input
            className="form__input-radio"
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>

        <div className="form__inputBox">
          <input
            className="form__input-radio"
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="stripe">Stripe</label>
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
