import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      price,
      max_price,
      min_price,
      shipping,
      color,
      company,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Filters;
