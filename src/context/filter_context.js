import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

  // Products page view toggle functionality. View functions are set up in Sort.js page

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // function that handles the sort buttons when user changes the sort layout of the products
  const sortUpdater = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // function that will handle all the onChanges per filter option when selected
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(value, name);

    if(name === 'category'){
      value = e.target.textContent;
    }

    if(name === 'color'){
      value = e.target.dataset.color;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {};

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sortUpdater,
        updateFilters,
        clearFilters,
      }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
