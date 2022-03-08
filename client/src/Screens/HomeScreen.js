import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, productData: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, productData }, dispatch] = useReducer(
    logger(reducer),
    {
      productData: [],
      loading: true,
      error: "",
    }
  );

  // const [productData, setProductData] = useState([]);

  const FetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get("/api/products");
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      // setProductData(result.data);
      console.log(result.data);
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
      console.log(err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : productData ? (
        <div className="products">
          {productData.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>There are no products</div>
      )}
    </div>
  );
};

export default HomeScreen;
