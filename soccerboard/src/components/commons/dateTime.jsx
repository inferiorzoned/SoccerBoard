import React from "react";
import TextField from "@material-ui/core/TextField";

const DateTimePicker = ({ changeHandler, id, label, type, defaultValue }) => {
  return (
    <form noValidate>
      <TextField
        id={id}
        label={label}
        type={type}
        defaultValue={defaultValue}
        // className={classes.textField}
        InputLabelProps={{
          style: { fontWeight: "bold" },
          shrink: true,
        }}
        onChange={changeHandler}
      />
    </form>
  );
};

export default DateTimePicker;
