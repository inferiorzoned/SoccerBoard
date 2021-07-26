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
      // TODO - navigate if response ok!
      // await processApplicants(acceptedIds, rejectedIds);
    } catch (ex) {
      this.setState({ applicants: originalApplicants });
    }
  };

  render() {
    const {
      applicants,
      currentApplicant,
      sortColumn,
      acceptedIds,
      rejectedIds,
    } = this.state;
    // console.log(applicants);
    const accepetedPlayers = applicants.filter((applicant) =>
      acceptedIds.includes(applicant._id)
    );
    const rejectedPlayers = applicants.filter((applicant) =>
      rejectedIds.includes(applicant._id)
    );

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8">
            <div className="p-5 flex-grow-1 container">
              <RecruitTable
                applicants={applicants}
                sortColumn={sortColumn}
                onRowClicked={this.onRowClicked}
                onSelectionChange={this.onSelectionChange}
              />
              {acceptedIds.length + rejectedIds.length > 0 && (
                <div className="row">
                  <div className="col m-3">
                    <div className="fw-bold">Accepted Players</div>
                    <ol>
                      {accepetedPlayers.map((p) => (
                        <li key={p._id}>{p.name}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="col m-3">
                    <div className="fw-bold">Rejected Players</div>
                    <ol>
                      {rejectedPlayers.map((p) => (
                        <li key={p._id}>{p.name}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
              <div className="d-flex flex-column align-items-center my-3">
                <button
                  className="btn btn-green-dark"
                  onClick={this.onSaveClicked}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="position-fixed end-0" style={{ width: "20%" }}>
              <InfoSidebar
                infoHeading={this.playerInfo}
                data={currentApplicant}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Recruit;
