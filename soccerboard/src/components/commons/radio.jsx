import React from "react";

const Radio = ({ radioGroupName, options, selected, isInline, onChange }) => {
  let classes = "p-3 form-check";
  classes += isInline ? " form-check-inline" : "";
  return (
    <div>
      {options.map((choice, index) => (
        <div key={index} className={classes}>
          <input
            className="form-check-input"
            type="radio"
            name={radioGroupName}
            id={choice._id}
            value={choice.value}
            checked={selected === choice.value}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={choice._id}>
            {choice.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
