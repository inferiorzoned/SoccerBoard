import React, { Component } from "react";
import SideBar from "../components/sideBar";

class CreateTraining extends Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-1-auto" style={{ backgroundColor: "blue" }}>
            <SideBar page={"trainingRepo"} />
          </div>
          <div className="col" style={{ backgroundColor: "yellow" }}>
            <h1>CreateTraining</h1>
          </div>
        </div>
      </>
    );
  }
}

export default CreateTraining;
