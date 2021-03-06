import React, { Component } from "react";
import { styles } from "./commons/styles";
import NavButton from "./navButton";
import { NavLink } from "react-router-dom";
import auth from "../services/authService";
/*
input:
    stakeHolder
    currentPage
    onPageChange
*/
class NavButtons extends Component {
  state = {
    ButtonLabels: [],
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    // console.log(user);
    if (user) {
      if (user.isAdmin) {
        this.setState({
          ButtonLabels: [
            "Training Session",
            "Squad",
            "Home",
            "Recruit",
            "Training Repo",
          ],
        });
      } else if (!user.isAdmin) {
        this.setState({
          ButtonLabels: [
            "Training Session",
            "Squad",
            "Home",
            "Training Repo",
            "Game Squad",
          ],
        });
      }
    }
  }

  render() {
    const { ButtonLabels } = this.state;
    const { currentPage, onPageChange } = this.props;

    return (
      <ul className="navbar-nav mr-auto">
        {ButtonLabels.map((buttonLabel) => (
          <li className="nav-item active" key={buttonLabel}>
            <NavLink className="nav-link" to={`/${buttonLabel}`}>
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
                onPageChange={onPageChange}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default NavButtons;
