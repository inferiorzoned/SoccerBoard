import React, { Component } from "react";
import SideBar from "./sideBar";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class SessionCreation extends Component {
  state = {};
  handlePlayerAdd = () => {
    <Popup></Popup>;
  };

  render() {
    // return <SideBar page={"trainingRepo"} />;
    return (
      <div className="sideBar">
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          <div className="mt-2">
            <h1>Trainees</h1>
            <Popup
              className="d-flex justify-content-start"
              trigger={
                <IconButton onClick={this.handlePlayerAdd}>
                  <AddCircleOutlineOutlinedIcon style={{ color: "#FFFF00" }} />
                </IconButton>
              }
            >
              <div className="d-flex justify-content-start">
                <h1>hello</h1>
              </div>
            </Popup>
          </div>
          <div className="mt-5">
            <h1>Schedule</h1>
            <IconButton>
              <AddCircleOutlineOutlinedIcon style={{ color: "#FFFF00" }} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionCreation;
