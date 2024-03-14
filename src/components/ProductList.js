import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { grid_view, filtered_products: products } = useFilterContext();
  // console.log(products);
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry no products matched your return.
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ProductList;
