import React, { memo } from "react";

const Search = ({ value, onChange, name = "query", label = "Search..." }) => {
  return (
    <input
      id={name}
      value={value}
      name={name}
      onChange={(e) => onChange(e.currentTarget.value)}
      className="form-control me-2 mb-2"
      type="search"
      placeholder={label}
    />
  );
};

export default memo(Search);
