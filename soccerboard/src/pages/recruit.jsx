// import React from "react";

// const Recruit = () => {
//   return <h1>Recruit</h1>;
// };

// export default Recruit;

import React, { Component } from "react";
import { getApplicants, processApplicants } from "../services/recruitService";
import InfoSidebar from "../components/commons/infoSidebar";
import RecruitTable from "../components/recruitTable";

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

  async componentDidMount() {
    const epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";
    let applicants = await getApplicants();
    if (applicants) {
      applicants.forEach((applicant) => {
        applicant.avatar = epMedia + applicant.avatar;
      });
    }
    this.setState({ applicants: [...applicants] });
  }

  onRowClicked = (applicant) => {
    this.setState({ currentApplicant: { ...applicant } });
  };

  onSelectionChange = (acceptedIds, rejectedIds) => {
    this.setState({ acceptedIds: acceptedIds, rejectedIds: rejectedIds });
  };

  onSaveClicked = async () => {
    const { acceptedIds, rejectedIds } = this.state;
    console.log("Accepted", acceptedIds);
    console.log("Rejected", rejectedIds);
    await processApplicants(acceptedIds, rejectedIds);
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
