import React, { Component } from "react";
import SideBar from "../components/sideBar";
import TrainingCards from "../components/trainingCards";
import SessionCreation from "../components/sessionCreation";

class CreateNewSession extends Component {
  state = {
    showSessionCreation: false,
  };

  handleLink = (e, linkType, trainingID) => {
    if (linkType === "trainingRepo") {
      window.location = "/Training Repo/" + trainingID;
    } else if (e.ctrlKey || e.metaKey) {
      this.setState({ showSessionCreation: true });
    }
  };

  render() {
    const { showSessionCreation } = this.state;
    return (
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"trainingRepo"} />
        </div>
        <div className={`col-sm-${showSessionCreation ? "8" : "10"}`}>
          <TrainingCards handleLink={this.handleLink} />
        </div>
        {showSessionCreation && (
          <div className="col-sm-2 d-flex flex-row-reverse">
            <SessionCreation />
          </div>
        )}
      </div>
    );
  }
}

export default CreateNewSession;
