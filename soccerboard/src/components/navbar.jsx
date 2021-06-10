import React, { Component } from "react";
import { styles } from "./commons/styles";
import NavButtons from "./navbuttons";
import LogOut from "./commons/logOut";
import NotificationBadge from "./commons/notificationBadge";
import { NavLink } from "react-router-dom";
import TrainingCard from "./trainingCard";

class Navbar extends Component {
  state = {
    currentPage: null,
    notiCount: 0,
  };

  componentDidMount() {
    this.setState({ currentPage: "Home", notiCount: 5 });
  }

  handleCurrentPage = (page) => {
    this.setState({ currentPage: page });
    // TODO go to the required page
  };

  handleNotificationClick = () => {
    this.setState({ notiCount: 0 });
    // TODO show notification lists
  };

  handleLogOut = () => {
    this.setState({ currentPage: "Home" });
    window.location = "/";
    // TODO actually log out
  };

  render() {
    const { currentPage, notiCount } = this.state;
    return (
      <nav
        className="navbar sticky-top navbar-expand-sm navbar-light myNavbarStyle"
        // style={styles.navBar}
      >
        <NavLink className="navbar-brand" to="/home" style={{ width: "25%" }}>
          SoccerBoard
        </NavLink>

        {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}

        {/* <div
            className="collapse navbar-collapse "

            // id="navbarSupportedContent"
            // style={{ backgroundColor: "#ffbbff" }}
          ></div> */}

        <NavButtons
          stakeHolder={"manager"}
          currentPage={currentPage}
          onPageChange={this.handleCurrentPage}
          style={{ width: "50%" }}
        />

        <NotificationBadge
          notiCount={notiCount}
          onNotiClick={this.handleNotificationClick}
          style={{ width: "12.5%" }}
        />

        <LogOut onLogOut={this.handleLogOut} style={{ width: "12.5%" }} />
      </nav>
    );
  }
}

export default Navbar;
