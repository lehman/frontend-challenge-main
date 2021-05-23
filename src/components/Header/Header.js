import React from "react";
import "./Header.css";

function Header(props) {
  const {
    title,
    handleFilterChange,
    sortingBy,
    toggleSortText,
    handleSortClick,
  } = props;
  return (
    <div className="header">
      <h2>{title}</h2>
      <label htmlFor="term-filter">Filter Term:</label>
      <input
        name="filter"
        type="text"
        onChange={handleFilterChange}
        data-name="filter-launches-by"
      />
      <p data-name="sorted-by">Sorting by: {sortingBy}</p>
      <button onClick={handleSortClick} data-name="sort-launches-by">
        Sort by {toggleSortText}
      </button>
    </div>
  );
}

export default Header;
