import React, { Component } from "react";
import { getApplicants } from "../services/applicants";
import InfoSidebar from "./commons/InfoSidebar";
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
            <InfoSidebar
              infoHeading={this.playerInfo}
              data={currentApplicant}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recruit;
