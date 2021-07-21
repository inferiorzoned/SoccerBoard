import React from "react";
import TextField from "@material-ui/core/TextField";

const DateTimePicker = ({
  changeHandler,
  id,
  label,
  type,
  defaultValue,
  isDisabled = false,
}) => {
  return (
    <form>
      <TextField
        id={id}
        label={label}
        color="primary"
        type={type}
        defaultValue={defaultValue}
        // className={classes.textField}
        InputLabelProps={{
          style: { fontWeight: "bold" },
          shrink: true,
        }}
        onChange={changeHandler}
        disabled={isDisabled}
      />
    </form>
  );
};

export default DateTimePicker;
