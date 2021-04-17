import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import Rating from "../components/Rating";
import Button from "../components/Button";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <React.Fragment>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div className="product__container">
          <div className="product__imageColumn">
            <Link to="/">Home Page</Link>
            <img
              className="product__image"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="product__detailsColumn">
            <ul>
              <li className="product__name">{product.name}</li>
              <li className="product__review">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li className="product__price">
                <span>Price:</span> {product.price}£
              </li>
              <li className="product__description">
                <span>Description:</span> {product.description}
              </li>
            </ul>
          </div>
          <div className="product__actionColumn">
            <div className="product__actionBox">
              <div className="product__actionBox-rating">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
              <div className="product__actionBox-price">
                <span>Price</span>
                <span>£{product.price}</span>
              </div>
              <div className="product__actionBox-status">
                <span>Status</span>
                {product.countInStock > 0 ? (
                  <span className="success">In Stock</span>
                ) : (
                  <span className="error">Unavailable</span>
                )}
              </div>
              {product.countInStock > 0 && (
                <>
                  <div className="product__actionBox-quantity">
                    <span>Qty</span>
                    <span>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <div className="product__actionBox-button">
                    <Button onClick={addToCartHandler} className="btn__yellow">
                      Add to Cart
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
