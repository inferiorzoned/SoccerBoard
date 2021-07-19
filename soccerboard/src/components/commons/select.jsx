import React from "react";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";

// TODO - Fix Error styling, Highlight Styling

const Select = ({
  name,
  label,
  options,
  error,
  isMulti,
  onChange,
  isDisabled = false,
  isCreatable = false,
}) => {
  const selectClass = error ? "is-invalid" : "";
  if (isCreatable) {
    return (
      <div className="form-group p-2">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <CreatableSelect
          isClearable
          name={name}
          options={options}
          onChange={onChange}
          isMulti={isMulti}
          isDisabled={isDisabled}
        />
      </div>
    );
  }
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
        isDisabled={isDisabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Select;
