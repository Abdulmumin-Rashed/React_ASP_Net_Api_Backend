import React, { memo } from "react";

const Select = ({ name, label, options, errorMessage, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-select" name={name} id={name} {...rest}>
        <option value="">select a {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default memo(Select);
