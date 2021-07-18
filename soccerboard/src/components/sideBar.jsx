import React, { Component } from "react";
import { sideBarData } from "../utils/sideBarData";
import ColoredLine from "./commons/coloredLine";
import SideBarList from "./sideBarList";
import auth from "../services/authService";

class SideBar extends Component {
  state = {};
  render() {
    const { page } = this.props;
    const user = auth.getCurrentUser();
    return (
      <div className="sidebar">
        {user.isAdmin && (
          <React.Fragment>
            <SideBarList pageName={page} sectionType={"outerLink"} />
            <div className="sidebar-line"></div>
          </React.Fragment>
        )}
        <SideBarList pageName={page} sectionType={"innerLink"} />
      </div>
    );
  }
}

export default SideBar;
