import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import { listTopSeller } from "../actions/userActions";
import Loading from "./Loading";
import MessageBox from "./MessageBox";

export default function TopSeller() {
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const { loading, error, users } = userTopSellersList;
  const topProductsList = useSelector((state) => state.topProductsList);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = topProductsList;

  console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTopProducts({}));
    dispatch(listTopSeller());
  }, [dispatch]);

  const renderTopProducts = () => {
    return products.map((product) => {
      return <div key={product._id}>{product.name}</div>;
    });
  };
  return (
    <div>
      {loadingProduct ? (
        <Loading />
      ) : errorProduct ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        renderTopProducts()
      )}
    </div>
  );
}
