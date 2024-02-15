import { memo } from "react";

const CheckBox = ({ name, label, options, errorMessage, ...rest }) => {
  return (
    <div className="form-check my-4">
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        id={name}
        name={name}
      />
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default memo(CheckBox);
