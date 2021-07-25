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
  defaultValue,
}) => {
  // console.log(defaultValue);
  const selectClass = error ? "is-invalid" : "";
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      color: "black",
    }),
  };

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
          defaultValue={defaultValue}
          styles={styles}
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
        defaultValue={defaultValue}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Select;
