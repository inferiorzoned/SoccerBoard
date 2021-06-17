import React, { Component } from "react";
import { styles } from "./commons/styles";
import NavButtons from "./navbuttons";
import LogOut from "./commons/logOut";
import NotificationBadge from "./commons/notificationBadge";
import { NavLink } from "react-router-dom";

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
    // TODO actually log out
  };

  render() {
    const { currentPage, notiCount } = this.state;
    return (
      <nav
        className="navbar navbar-expand-sm navbar-light"
        style={styles.navBar}
      >
        <NavLink
          className="navbar-brand"
          to="/home"
          // style={{ backgroundColor: "#bbffcc", justifyContent: "start" }}
        >
          SoccerBoard
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse "
          // id="navbarSupportedContent"
          // style={{ backgroundColor: "#ffbbff" }}
        >
          <NavButtons
            stakeHolder={"manager"}
            currentPage={currentPage}
            onPageChange={this.handleCurrentPage}
          />
          <NotificationBadge
            notiCount={notiCount}
            onNotiClick={this.handleNotificationClick}
          />
          <LogOut onLogOut={this.handleLogOut} />
        </div>
      </nav>
    );
  }
}

export default Navbar;
