import React, { Component } from "react";
import { getApplicants } from "../services/applicants";
import RecruitTable from "./recruitTable";

class Recruit extends Component {
  state = {
    applicants: [],
    currentApplicant: {},
    acceptedIds: [],
    rejectedIds: [],
    sortColumn: { path: "name", order: "asc" },
  };

  playerInfo = [
    { key: "age", label: "Age" },
    { key: "height", label: "Height" },
    { key: "weight", label: "Weight" },
    { key: "prefFoot", label: "Foot" },
    { key: "prefPos", label: "Positions" },
    { key: "institution", label: "Institution" },
    { key: "proLevel", label: "Level" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
  ];

  componentDidMount() {
    this.setState({ applicants: [...getApplicants()] });
  }

  onRowClicked = (applicant) => {
    this.setState({ currentApplicant: { ...applicant } });
  };

  onSelectionChange = (acceptedIds, rejectedIds) => {
    this.setState({ acceptedIds: acceptedIds, rejectedIds: rejectedIds });
  };

  onSaveClicked = () => {
    const { acceptedIds, rejectedIds } = this.state;
    console.log("Accepted", acceptedIds);
    console.log("Rejected", rejectedIds);
  };

  renderPlayerInfo = () => {
    const { currentApplicant } = this.state;
    return this.playerInfo.map((info) => (
      <div key={info.key} className="row">
        <div className="col text-start">{info.label}</div>
        {currentApplicant[info.key] &&
        currentApplicant[info.key].constructor === Array ? (
          <div className="col text-start">
            {currentApplicant[info.key].toString()}
          </div>
        ) : (
          <div className="col text-start">{currentApplicant[info.key]}</div>
        )}
      </div>
    ));
  };

  render() {
    const { applicants, currentApplicant, sortColumn } = this.state;
    return (
      <React.Fragment>
        <div className="d-flex">
          <div className="p-2 flex-grow-1 container">
            <RecruitTable
              applicants={applicants}
              sortColumn={sortColumn}
              onRowClicked={this.onRowClicked}
              onSelectionChange={this.onSelectionChange}
            />
            <div className="text-center my-3">
              <button
                className="btn btn-green-dark"
                onClick={this.onSaveClicked}
              >
                SAVE
              </button>
            </div>
          </div>
          <div className="vh-100 bg-light sticky-top p-5 align-items-center">
            <div className="image-holder m-2">
              <img
                src={currentApplicant.profileImg}
                alt=""
                id="img"
                className="img-thumbnail"
              />
            </div>
            <div className="text-center py-3">{currentApplicant.name}</div>
            {this.renderPlayerInfo()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recruit;
