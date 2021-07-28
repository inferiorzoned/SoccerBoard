import React, { Component } from "react";
import NavButtons from "./navbuttons";
import LogOut from "./commons/logOut";
import NotificationBadge from "./commons/notificationBadge";
import { NavLink } from "react-router-dom";
import managerAvatar from "../assets/images/manager.png";
import auth from "../services/authService";

class Navbar extends Component {
  state = {
    currentPage: null,
    notiCount: 0,
    user: auth.getCurrentUser(),
  };

  componentDidMount() {
    // take a string, remove its starting "/", and replace all "%20" with space
    const pagename = window.location.pathname
      .replace("/", "")
      .replace("%20", " ");
    // console.log(pagename);
    let currentPage = pagename.split("/")[0];
    // console.log(currentPage);
    if (currentPage === "home") {
      currentPage = "Home";
    }
    // const user = auth.getCurrentUser();
    // user.avatar = user.isAdmin
    //   ? managerAvatar
    //   : "https://www.shutterstock.com/image-photo/one-caucasian-soccer-player-man-happy-637186171";
    // console.log(user);
    this.setState({ currentPage });
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
    auth.logout();
    window.location = "/";
  };

  render() {
    const { currentPage, notiCount, user } = this.state;
    console.log(user.isAdmin || user.userType !== "player");
    let avatar =
      "https://media.istockphoto.com/photos/football-or-soccer-player-in-action-on-stadium-with-flashlights-ball-picture-id1219371112";
    if (user.isAdmin) {
      avatar = managerAvatar;
    } else if (user.avatar) avatar = user.avatar;
    let imgClass = "navbar-image";
    if (user.isAdmin || user.userType !== "player") {
      imgClass += " navbar-image-manager";
    } else imgClass += " navbar-image-player";
    return (
      <nav className="navbar sticky-top navbar-expand-sm navbar-light">
        <div className="row w-100">
          <div className="col-sm-2 d-flex justify-content-center align-items-center">
            <NavLink className="navbar-brand" to="/Home">
              <img className={imgClass} src={avatar} alt={user.name} />
              <span className="username mx-3">{user.name}</span>
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
