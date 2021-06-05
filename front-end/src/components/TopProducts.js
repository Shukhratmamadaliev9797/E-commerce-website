import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import Loading from "./Loading";
import MessageBox from "./MessageBox";
import Rating from "./Rating";

SwiperCore.use([Pagination, Autoplay]);
export default function TopProducts() {
  const dispatch = useDispatch();
  const topProductsList = useSelector((state) => state.topProductsList);
  const {
    loading: loadingTop,
    error: errorTop,
    products: productsTop,
  } = topProductsList;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const renderTopProducts = () => {
    return (
      <Swiper
        slidesPerView={100}
        spaceBetween={1000}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwipe"
      >
        {[
          productsTop.map((product) => {
            return (
              <SwiperSlide>
                <div className="swiper__images">
                  <img src={product.image} alt={product.name} />
                </div>
                <div>
                  <Rating
                    className=""
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </div>
              </SwiperSlide>
            );
          }),
        ]}
      </Swiper>
    );
  };

  return (
    <div className="swiper">
      <h1>The Best Selling Products</h1>
      <p>We always want you to buy best products</p>
      {loadingTop ? (
        <Loading />
      ) : errorTop ? (
        <MessageBox className="error">{errorTop}</MessageBox>
      ) : (
        <div className="swiper__container">{renderTopProducts()}</div>
      )}
    </div>
  );
}
