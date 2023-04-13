import React from "react";
import { Search } from "../constant";

const SearchForm = (props) => {
  const onSubmitSearch = (event) => {};
  return (
    <div class="search-container">
      <form onSubmit={onSubmitSearch}>
        <input
          type="text"
          placeholder={props.searchPlaceHolder || "Search...."}
          name="search"
        />
        <button type="submit" style={{ color: "#fff" }}>
          <Search />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
