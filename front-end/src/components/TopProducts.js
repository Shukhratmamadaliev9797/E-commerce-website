import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import Loading from "./Loading";
import MessageBox from "./MessageBox";

SwiperCore.use([Pagination]);
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
  console.log(productsTop);
  const renderTopProducts = () => {
    return (
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
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
        className="mySwipe"
      >
        {[
          productsTop.map((product) => {
            return (
              <SwiperSlide>
                <img src={product.image} alt={product.name} />
              </SwiperSlide>
            );
          }),
        ]}
      </Swiper>
    );
  };
  return (
    <>
      {loadingTop ? (
        <Loading />
      ) : errorTop ? (
        <MessageBox className="error">{errorTop}</MessageBox>
      ) : (
        <div className="swiper__container">{renderTopProducts()}</div>
      )}
    </>
  );
}
