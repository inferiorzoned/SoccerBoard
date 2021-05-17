import React from "react";
import SideBar from "../components/sideBar";

const TrainingSession = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <SideBar page={"trainingSession"} />
        </div>
        <div className="col">
          <h1>Training Session</h1>
        </div>
      </div>
    </>
  );
};

export default TrainingSession;
