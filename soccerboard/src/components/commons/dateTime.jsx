import React from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";

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
        style={{ backgroundColor: "#fff", color: "#FFF" }}
        id={id}
        label={label}
        // color="blue"
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
