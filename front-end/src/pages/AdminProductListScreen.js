import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductList(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : "" }));
  }, [
    dispatch,
    createdProduct,
    props.history,
    successCreate,
    successDelete,
    sellerMode,
    userInfo,
  ]);

  const deleteProductHandler = (product) => {
    if (window.confirm("Are you sure to delete ?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createProductHandler = (e) => {
    dispatch(createProduct());
  };
  const renderProductLists = () => {
    return products.map((product) => {
      return (
        <div className="productList__card" key={product._id}>
          <div className="productList__card-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="productList__card-details">
            <div className="productList__card-details-top">
              <Link to={`/product/${product._id}`}>
                {product.name.substring(0, 100)}...
              </Link>
            </div>
            <div className="productList__card-details-bottom">
              <div className="productList__card-detail">
                <span>Brand Name</span>
                <span>{product.brand}</span>
              </div>
              <div className="productList__card-detail">
                <span>Product ID</span>
                <span>#{product._id}</span>
              </div>
              <div className="productList__card-detail">
                <span>Category</span>
                <span>{product.category}</span>
              </div>
              <div className="productList__card-detail">
                <span>In stock</span>
                <span>{product.countInStock}</span>
              </div>
              <div className="productList__card-detail">
                <span>Reviews</span>
                <span>{product.numReviews}</span>
              </div>
              <div className="productList__card-detail">
                <span>Price</span>
                <span>{product.price}£</span>
              </div>
              <div className="productList__card-detail">
                <span>Rating</span>
                <span>{product.rating}</span>
              </div>
            </div>
          </div>
          <div className="productList__card-buttons">
            <Button
              onClick={() => props.history.push(`/product/${product._id}/edit`)}
              className="btn__yellow"
            >
              <i className="fas fa-edit"></i>Edit
            </Button>
            <Button
              onClick={() => deleteProductHandler(product)}
              className="btn__red"
            >
              <i className="fas fa-trash-alt"></i>Delete
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="productList">
      <div className="form__header">
        <h1>Product List</h1>
      </div>
      <div className="productList__titleBox">
        <Button className="btn__green0" onClick={createProductHandler}>
          Create Product
        </Button>
      </div>
      {loadingCreate && <Loading />}
      {errorCreate && <MessageBox className="error">{errorCreate}</MessageBox>}
      {loadingDelete && <Loading />}
      {errorDelete && <MessageBox className="error">{errorDelete}</MessageBox>}
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        renderProductLists()
      )}
    </div>
  );
}
