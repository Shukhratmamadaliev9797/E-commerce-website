import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_ITEM_FAIL,
} from "../constants/cartConstants";

export function addToCart(productId, qty) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    const {
      cart: { cartItems },
    } = getState();
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: `Can't Add To Cart. Buy from ${
          cartItems[0].seller.seller.name
            ? cartItems[0].seller.seller.name
            : "one seller at a time"
        } `,
      });
      console.log(cartItems);
    } else {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          product: data._id,
          seller: data.seller,
          qty,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }
  };
}

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  };
};
