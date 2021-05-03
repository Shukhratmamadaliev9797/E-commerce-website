import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { detailsProduct, updateProduct } from "../actions/productActions";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productslist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div className="productUpdate__container">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="form__title">Edit Product</h1>
        </div>
        {loadingUpdate && <Loading />}
        {errorUpdate && (
          <MessageBox className="error">{errorUpdate}</MessageBox>
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
                type="text"
                id="name"
                placeholder="Enter name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="price">
                Price
              </label>
              <input
                className="form__input"
                type="text"
                id="price"
                placeholder="Enter price..."
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="image">
                Image
              </label>
              <input
                className="form__input"
                type="text"
                id="image"
                placeholder="Select image..."
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="imageFile">
                Image File
              </label>
              <input
                className="form__input"
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && "Wait...! Uploading images"}
              {errorUpload && (
                <MessageBox className="error">{errorUpload}</MessageBox>
              )}
            </div>

            <div className="form__inputBox">
              <label className="form__label" htmlFor="category">
                Category
              </label>
              <input
                className="form__input"
                type="text"
                id="category"
                placeholder="Enter category..."
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="brand">
                Brand name
              </label>
              <input
                className="form__input"
                type="text"
                id="brand"
                placeholder="Enter brand name..."
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="countInStock">
                Count In Stock
              </label>
              <input
                className="form__input"
                type="text"
                id="countInStock"
                placeholder="Enter items amount..."
                required
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <label className="form__label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form__input"
                type="text"
                id="description"
                placeholder="Write description..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form__inputBox">
              <Button className="btn__yellow">Update</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
