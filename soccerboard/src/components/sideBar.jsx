import React, { Component } from "react";
import { sideBarData } from "../utils/sideBarData";
import ColoredLine from "./common/coloredLine";
import SideBarList from "./sideBarList";

class SideBar extends Component {
  state = {};
  render() {
    const { page } = this.props;
    return (
      <div className="sideBar">
        <SideBarList pageName={page} sectionType={"outerLink"} />
        <hr className="sideBarLine" />
        <SideBarList pageName={page} sectionType={"innerLink"} />
      </div>
    );
  }
}

export default SideBar;
