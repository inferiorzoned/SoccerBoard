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
      <div className="sideBar">
        {user.isAdmin && (
          <SideBarList pageName={page} sectionType={"outerLink"} />
        )}
        {user.isAdmin && <hr className="sideBarLine" />}
        <SideBarList pageName={page} sectionType={"innerLink"} />
      </div>
    );
  }
}

export default SideBar;
