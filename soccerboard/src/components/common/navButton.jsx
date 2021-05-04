import React, { Component } from "react";
import { styles } from "./styles";
/*
input:
    isActive
    buttonLabel
    onPageChange
*/

class NavButton extends Component {
  // state = {  }
  render() {
    const { isActive, buttonLabel, onPageChange } = this.props;
    return (
      <button
        className="navButton"
        style={
          isActive
            ? { backgroundColor: "#4A0202" }
            : { backgroundColor: "#034732" }
        }
        onClick={() => onPageChange(buttonLabel)}
      >
        {buttonLabel}
        {/* {splittedHtml} */}
        {/* {buttonLabelSplit.map((label) => {
          label;
        })} */}
      </button>
    );
  }
}

export default NavButton;
