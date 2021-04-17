import React from "react";

export default function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="card__reviewbox">
      <i
        className={`card__reviewbox-star
          ${
            rating >= 1
              ? "fa fa-star"
              : rating >= 0.5
              ? "fa fa-star-half-alt"
              : "far fa-star"
          }
        `}
      ></i>
      <i
        className={`card__reviewbox-star
          ${
            rating >= 2
              ? "fa fa-star"
              : rating >= 1.5
              ? "fa fa-star-half-alt"
              : "far fa-star"
          }
        `}
      ></i>
      <i
        className={`card__reviewbox-star
          ${
            rating >= 3
              ? "fa fa-star"
              : rating >= 2.5
              ? "fa fa-star-half-alt"
              : "far fa-star"
          }
        `}
      ></i>
      <i
        className={`card__reviewbox-star
          ${
            rating >= 4
              ? "fa fa-star"
              : rating >= 3.5
              ? "fa fa-star-half-alt"
              : "far fa-star"
          }
        `}
      ></i>
      <i
        className={`card__reviewbox-star
          ${
            rating >= 5
              ? "far fa-star"
              : rating >= 4.5
              ? "fa fa-star-half-alt"
              : "far fa-star"
          }
        `}
      ></i>
      <span className="card__reviewbox-numReviews">{`${numReviews} reviews`}</span>
    </div>
  );
}
