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

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  // console.log(colors);

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((cat, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name="category"
                    type="button"
                    className={`${
                      category === cat.toLowerCase() ? "active" : null
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          {/* End of categories */}
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((co, index) => {
                return (
                  <option key={index} value={co}>
                    {co}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}

          {/* colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colors.map((col, index) => {
                if( col === 'all'){
                  return <button name="color" onClick={updateFilters} data-color="all" className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}></button>
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: col }}
                    className={`${
                      color === col ? "color-btn active" : "color-btn"
                    }`}
                    data-color={col}
                    onClick={updateFilters}
                  >
                    {color === col ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }

`;

export default Filters;
