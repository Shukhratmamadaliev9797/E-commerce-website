import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function productCard(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <div className="card__imagebox">
        <Link to={`/product/${product._id}`}>
          <img className="card__img" src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="card__content">
        <div className="card__textbox">
          <Link to={`/product/${product._id}`}>
            <h2 className="card__textbox-title">{product.name}</h2>
          </Link>
        </div>
        <Rating 
          className=""
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <div className="card__pricebox">
          <span className="card-price">{`£${product.price}`}</span>
        </div>
      </div>
    </div>
  );
}
