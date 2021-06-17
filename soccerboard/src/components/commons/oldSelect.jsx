import React from "react";

const OldSelect = ({ name, label, error, options, ...rest }) => {
  const selectClass = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select {...rest} className={selectClass} id={name} name={name}>
        <option value="" />
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default OldSelect;
