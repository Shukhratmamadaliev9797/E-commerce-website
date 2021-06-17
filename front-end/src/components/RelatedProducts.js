import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { relatedListProducts } from "../actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import Loading from "./Loading";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

export default function RelatedProducts(props) {
  SwiperCore.use([Pagination, Autoplay]);
  const dispatch = useDispatch();
  const productRelatedList = useSelector((state) => state.productRelatedList);
  const { loading, error, products } = productRelatedList;

  const renderRelatedProducts = () => {
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
          products.map((product) => {
            return (
              <SwiperSlide>
                <div className="swiper__images">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
                <div>{product.name.substring(0, 30)}...</div>
              </SwiperSlide>
            );
          }),
        ]}
      </Swiper>
    );
  };
  useEffect(() => {
    dispatch(relatedListProducts(props.product._id));
  }, [dispatch, props]);
  return (
    <div className="swiper">
      <h1>Related Products</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div className="swiper__container">{renderRelatedProducts()}</div>
      )}
    </div>
  );
}
