import axios from "axios";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOPLIST_REQUEST,
  PRODUCT_TOPLIST_SUCCESS,
  PRODUCT_TOPLIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_RELATED_LIST_REQUEST,
  PRODUCT_RELATED_LIST_SUCCESS,
  PRODUCT_RELATED_LIST_FAIL,
} from "../constants/productConstants";

export const listProducts = ({ seller = "", name = "", category = "" }) => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products?seller=${seller}&name=${name}&category=${category}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
    }
  };
};

export const listProductsCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/products/categories`);
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: err.message });
    }
  };
};

export const detailsProduct = (productId) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/products",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
      payload: product,
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listTopProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_TOPLIST_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/products/top-producs`);
      dispatch({ type: PRODUCT_TOPLIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_TOPLIST_FAIL, payload: message });
    }
  };
};

export const relatedListProducts = (productId) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_RELATED_LIST_REQUEST, payload: productId });
    try {
      const { data } = await axios.get(
        `/api/products/related-products/${productId}`
      );
      dispatch({ type: PRODUCT_RELATED_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_RELATED_LIST_FAIL, payload: message });
    }
  };
};
