// import React from "react";
import React, { Component } from "react";
import SideBar from "../components/sideBar";
import SessionInfo from "../components/sessionInfo";
import TrainingCard from "../components/trainingCard";
import { CircularProgress } from "@material-ui/core";
import LoaderSoccer from "../components/commons/loader";

import {
  trainingCategories,
  getTrainingRepoCategoryData,
} from "../utils/repoElements";

class TrainingSession extends Component {
  state = {
    sessionData: {
      sessionTitle: "Session  1",
      trainings: [
        "60bcaedb5de9dd090c5d8a21",
        "60e2a5db75c3c30015713730",
        "60bcb13e66267d15d86443f9",
        "60e2b69e75c3c30015713732",
      ],
      selectedPlayers: [
        "60bdb74ab7b4014a3ea46b1b",
        "60bdce758f54be1b10fdd0bf",
        "60bdb9c2b7b4014a3ea46b20",
        "60bde718e564a9367eb950ef",
      ],
      startDate: "2021-07-05",
      endDate: "2021-07-19",
      trainingTime: "17:00",
      weekDays: [false, false, false, false, false, true, true],
    },
  };

  async componentDidMount() {
    // const { trainingRepoCategoryData, trainingCategories } = this.state;
    const trainingRepoCategoryData = await getTrainingRepoCategoryData();
    // const trainingCategories = trainingCategories;
    this.setState({ trainingRepoCategoryData });
  }

  handleLink = (e, linkType, trainingID, trainings) => {
    if (linkType === "trainingRepo") {
      window.location = "/Training Repo/" + trainingID;
    }
  };

  render() {
    const { sessionData, trainingRepoCategoryData } = this.state;
    return (
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"trainingSession"} />
        </div>
        <div className="col-sm-8">
          <div>
            <h2 className="text-center mt-2"> {sessionData.sessionTitle} </h2>
            <div className="categoryLine"></div>
          </div>
          <div className="row">
            {trainingRepoCategoryData &&
              sessionData.trainings.map((currTraining, currTId) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 align-items-stretch">
                  {trainingCategories.map(
                    (tType, tTypeId) =>
                      trainingRepoCategoryData[tType] &&
                      trainingRepoCategoryData[tType].map(
                        (tInstance, tId) =>
                          currTraining === tInstance._id && (
                            <TrainingCard
                              trainingImage={tInstance.mediaUrl}
                              trainingTitle={tInstance.trainingTitle}
                              trainingDifficulty={tInstance.trainingDifficulty}
                              trainingDescription={
                                tInstance.trainingDescription
                              }
                              trainingID={tInstance._id}
                              handleLink={this.handleLink}
                              linkType={"trainingRepo"}
                            />
                          )
                      )
                  )}
                </div>
              ))}
          </div>
          {!trainingRepoCategoryData && (
            // <div className="centered">
            //   <CircularProgress color="secondary" />
            // </div>
            <LoaderSoccer />
          )}
        </div>
        <div className="col-sm-2 d-flex flex-row-reverse">
          <SessionInfo
            selectedPlayers={sessionData.selectedPlayers}
            startDate={sessionData.startDate}
            endDate={sessionData.endDate}
            trainingTime={sessionData.trainingTime}
            weekDays={sessionData.weekDays}
          />
        </div>
      </div>
    );
  }
}

export default TrainingSession;

/*
const TrainingSession = () => {
  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"trainingSession"} />
        </div>
        <div className="col-sm-8">
          <div>
            <h2 className="text-center"> {sessionData.sessionTitle} </h2>
          </div>
          <h1>Training Session</h1>
        </div>
        <div className="col-sm-2">
          <SessionInfo
            selectedPlayers={sessionData.selectedPlayers}
            startDate={sessionData.startDate}
            endDate={sessionData.endDate}
            trainingTime={sessionData.trainingTime}
            weekDays={sessionData.weekDays}
          />
        </div>
      </div>
    </>
  );
};

export default TrainingSession;
*/
