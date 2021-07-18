import React, { Component } from "react";
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
        className="nav-button"
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
