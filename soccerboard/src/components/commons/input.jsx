import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  const inputClass = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group p-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...rest} name={name} id={name} className={inputClass} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
