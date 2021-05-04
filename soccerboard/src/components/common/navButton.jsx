import React, { Component } from "react";
import { styles } from "./styles";
/*
input:
    isActive
    buttonLabel
*/

class NavButton extends Component {
  // state = {  }
  render() {
    const { isActive, buttonLabel } = this.props;
    return (
      <button
        className="navButton"
        style={
          isActive
            ? { backgroundColor: "#4A0202" }
            : { backgroundColor: "#034732" }
        }
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
/*
const NavButton = (props) => {
  const { isActive, buttonLabel } = props;
  const buttonLabelSplit = buttonLabel.split(" ");

  return (
    <button
      // className="rounded-pill"
      style={isActive ? styles.navButtonActive : styles.navButton}
    >
      {buttonLabel}
    </button>
  );
};
*/
