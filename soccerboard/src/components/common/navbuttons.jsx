import React, { Component } from "react";
import { styles } from "./styles";
import NavButton from "./navButton";
/*
input:
    stakeHolder
    currentPage
*/
class NavButtons extends Component {
  state = {
    ButtonLabels: [],
  };

  componentDidMount() {
    if (this.props.stakeHolder === "manager") {
      this.setState({
        ButtonLabels: [
          "Training Session",
          "Squad",
          "Home",
          "Recruit",
          "Training Repo",
        ],
      });
    }
  }

  render() {
    const { ButtonLabels } = this.state;
    const { currentPage } = this.props;

    return (
      <ul className="navbar-nav mr-auto">
        {ButtonLabels.map((buttonLabel) => (
          <li className="nav-item active" key={buttonLabel}>
            <a className="nav-link" href="#">
              {/* <button
                // className="rounded-pill"
                style={
                  currentPage === buttonLabel
                    ? styles.navButtonActive
                    : styles.navButton
                }
              >
                {buttonLabel}
              </button> */}
              <NavButton
                isActive={currentPage === buttonLabel}
                buttonLabel={buttonLabel}
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default NavButtons;
