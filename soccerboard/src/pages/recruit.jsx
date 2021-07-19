import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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
    { key: "prefPosition", label: "Positions" },
    { key: "institution", label: "Institution" },
    { key: "proLevel", label: "Level" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
  ];

  async componentDidMount() {
    // const epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";
    let applicants = await getApplicants();
    // if (applicants) {
    //  applicants.forEach((applicant) => {
    //    applicant.avatar = epMedia + applicant.avatar;
    //  });
    // }
    this.setState({ applicants: [...applicants] });
  }

  onRowClicked = (applicant) => {
    this.setState({ currentApplicant: { ...applicant } });
  };

  onSelectionChange = (acceptedIds, rejectedIds) => {
    this.setState({ acceptedIds: acceptedIds, rejectedIds: rejectedIds });
  };

  getPlayersFromIds = (ids) => {
    let names = "";
    ids.forEach((id) => {
      const applicant = this.state.applicants.find(
        (applicant) => id === applicant._id
      );
      names += applicant.name + ", ";
    });
    return names.substr(0, names.lastIndexOf(",")) + ".";
  };

  onSaveClicked = async () => {
    const {
      acceptedIds,
      rejectedIds,
      applicants: originalApplicants,
    } = this.state;
    const ids = [...acceptedIds, ...rejectedIds];
    const applicants = originalApplicants.filter(
      (applicant) => !ids.includes(applicant._id)
    );

    let accepted = "Accepted Players: " + this.getPlayersFromIds(acceptedIds);
    let rejected = "Rejected Players: " + this.getPlayersFromIds(rejectedIds);

    try {
      if (acceptedIds.length > 0) toast.success(accepted);
      if (rejectedIds.length > 0) toast.error(rejected);
      this.setState({ applicants: applicants });
      await processApplicants(acceptedIds, rejectedIds);
    } catch (ex) {
      this.setState({ applicants: originalApplicants });
    }
  };

  render() {
    const { applicants, currentApplicant, sortColumn } = this.state;
    console.log(applicants);
    console.log(typeof applicants);
    return (
      <React.Fragment>
        <div className="d-flex">
          <div className="p-5 flex-grow-1 container">
            <RecruitTable
              applicants={applicants}
              sortColumn={sortColumn}
              onRowClicked={this.onRowClicked}
              onSelectionChange={this.onSelectionChange}
            />
            <div className="text-center my-3">
              {/* TODO - Show accepted players list and update recruit table */}
              <button
                className="btn btn-green-dark"
                onClick={this.onSaveClicked}
              >
                SAVE
              </button>
            </div>
          </div>
          {/* TODO-Increase width of the side bar */}
          <div className="vh-100 bg-light sticky-top p-5 align-items-center">
            <InfoSidebar
              infoHeading={this.playerInfo}
              data={currentApplicant}
            />
          </div>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Recruit;
