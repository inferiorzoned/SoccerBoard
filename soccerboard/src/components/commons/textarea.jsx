import React from "react";

const TextArea = ({ name, label, error, rows, cols, ...rest }) => {
  const inputClass = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group p-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea {...rest} name={name} id={name} rows={rows} cols={cols} className={inputClass} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextArea;
