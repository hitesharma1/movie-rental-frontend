import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search Movie"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBar;
