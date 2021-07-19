import React from "react";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      borderRadius: 5,
      height: 5,
    }}
  />
);

export default ColoredLine;
