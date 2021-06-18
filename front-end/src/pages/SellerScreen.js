import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import male from "../images/male.png";
import female from "../images/female.png";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;
  console.log(products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

  const renderSellerProducts = () => {
    return products.map((product) => {
      return (
        <div className="seller__productList__card" key={product._id}>
          <div className="seller__productList__card-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="seller__productList__card-details">
            <div className="seller__productList__card-details-top">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
            <div className="seller__productList__card-details-bottom">
              <div className="seller__productList__card-detail">
                <span>Brand Name</span>
                <span>{product.brand}</span>
              </div>
              <div className="seller__productList__card-detail">
                <span>Reviews</span>
                <span>
                  <Rating
                    className=""
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </span>
              </div>
              <div className="seller__productList__card-detail">
                <span>Price</span>
                <span>{product.price}£</span>
              </div>
              <div className="seller__productList__card-detail">
                <span>Seller</span>
                <span>{product.seller.name}</span>
              </div>
            </div>
            <div className="seller__productList__card-buttons">
              <Button
                onClick={() => props.history.push(`/product/${product._id}`)}
                className="btn__yellow"
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="form__header">
        <h1>Seller</h1>
      </div>
      <div className="seller__container">
        <div className="seller__info">
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox className="error">{error}</MessageBox>
          ) : (
            <div className="seller__info-container">
              <ul>
                <li>
                  <img
                    src={
                      user.image
                        ? user.image
                        : user.gender === "male"
                        ? male
                        : user.gender === "female"
                        ? female
                        : ""
                    }
                    alt={user.name}
                  />
                </li>
                <li>
                  <h2>{user.seller.name}</h2>
                </li>
                <li>
                  <h3>{user.seller.logo}</h3>
                </li>
                <li>
                  <Rating
                    className=""
                    rating={user.seller.rating}
                    numReviews={user.seller.numReviews}
                  />
                </li>
                <li>
                  <p> {user.seller.description}</p>
                </li>
                <li>
                  {user.city}, {user.country}
                </li>
                <li>
                  <a className="btn btn__yellow" href={`mailto:${user.email}`}>
                    Contact seller
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="seller__products">
          {loadingProducts ? (
            <Loading />
          ) : errorProducts ? (
            <MessageBox className="error">{error}</MessageBox>
          ) : (
            renderSellerProducts()
          )}
        </div>
      </div>
    </div>
  );
}
