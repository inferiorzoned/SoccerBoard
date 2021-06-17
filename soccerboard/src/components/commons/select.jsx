import React from "react";
import ReactSelect from "react-select";

// TODO - Fix Error styling, Highlight Styling

const Select = ({ name, label, options, error, isMulti, onChange }) => {
  const selectClass = error ? "is-invalid" : "";
  return (
    <div className="form-group p-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <ReactSelect
        name={name}
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        className={selectClass}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Select;
