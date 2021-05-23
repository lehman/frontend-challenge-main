import React from "react";
import "./Header.css";

function Header(props) {
  const { title, handleFilterChange, sortBy, handleSortClick } = props;
  return (
    <div className="header">
      <h2>{title}</h2>
      <label htmlFor="term-filter">Filter Term:</label>
      <input name="filter" type="text" onChange={handleFilterChange} />
      <button onClick={handleSortClick}>Sort by {sortBy}</button>
    </div>
  );
}

export default Header;
