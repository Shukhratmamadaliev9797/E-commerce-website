import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import ProductCard from "../components/ProductCard";
import Loading from "./Loading";
import MessageBox from "./MessageBox";

export default function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox className="error">{error}</MessageBox>
      ) : (
        <div className="products__container">
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      )}
    </React.Fragment>
  );
}
