import React, { Component } from "react";
import { styles } from "./commons/styles";
import NavButtons from "./navbuttons";
import LogOut from "./commons/logOut";
import NotificationBadge from "./commons/notificationBadge";
import { NavLink } from "react-router-dom";
import TrainingCard from "./trainingCard";
import managerAvatar from "../assets/images/manager.png";

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
      <nav className="navbar sticky-top navbar-expand-sm navbar-light">
        <div className="row w-100">
          <div className="col-sm-2 d-flex justify-content-center align-items-center">
            <NavLink className="navbar-brand" to="/home">
              <img
                style={{ height: "60%", width: "60%", objectFit: "cover" }}
                src={managerAvatar}
                alt="SoccerBoard"
              />
            </NavLink>
          </div>
          <div className="col-sm-8 d-flex align-items-center justify-content-center">
            <NavButtons
              stakeHolder={"manager"}
              currentPage={currentPage}
              onPageChange={this.handleCurrentPage}
            />
          </div>
          <div className="col-sm-2 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-row">
              <NotificationBadge
                notiCount={notiCount}
                onNotiClick={this.handleNotificationClick}
              />
              <LogOut onLogOut={this.handleLogOut} />
            </div>
          </div>
        </div>

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
      </nav>
    );
  }
}

export default Navbar;
