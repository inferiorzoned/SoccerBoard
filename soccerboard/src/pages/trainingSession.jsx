import React from "react";
import SideBar from "../components/sideBar";
import SessionInfo from "../components/sessionInfo";

const sessionData = {
  sessionTitle: "session 1",
  trainings: [
    "60bcaedb5de9dd090c5d8a21",
    "60bceb4dfd376938d4d1dce3",
    "60bdd7d88f54be1b10fdd0c5",
  ],
  selectedPlayers: ["60bdb74ab7b4014a3ea46b1b", "60bde666e564a9367eb950ea"],
  startDate: "2021-06-27",
  endDate: "2021-07-10",
  trainingTime: "17:00",
  weekDays: [false, true, false, false, false, false, true],
};

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
