import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import ProductCard from "../components/ProductCard";

export default function SearchScreen() {
  const { name = "all", category = "all" } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
      })
    );
  }, [dispatch, name, category]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}`;
  };
  return (
    <div className="search">
      <div className="search__results">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox className="error">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="search__container">
        <div className="search__filter">
          <h3>Department</h3>
          {loadingCategories ? (
            <Loading />
          ) : errorCategories ? (
            <MessageBox className="error">{error}</MessageBox>
          ) : (
            <ul>
              {categories.map((c) => {
                return (
                  <li key={c}>
                    <Link
                      className={c === category ? "active" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="search__products">
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox className="error">No Product Found</MessageBox>
          ) : (
            <div className="products__container">
              <div className="products__products">
                {products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
