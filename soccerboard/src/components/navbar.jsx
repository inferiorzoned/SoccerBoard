import React, { Component } from "react";
import { styles } from "./common/styles";
import NavButtons from "./common/navbuttons";
import LogOut from "./common/logOut";
import NotificationBadge from "./common/notificationBadge";

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
        <a
          className="navbar-brand"
          href="#"
          // style={{ backgroundColor: "#bbffcc", justifyContent: "start" }}
        >
          SoccerBoard
        </a>
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
