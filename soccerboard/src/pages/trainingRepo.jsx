import React from "react";
import SideBar from "../components/sideBar";

const TrainingRepo = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <SideBar page={"trainingRepo"} />
        </div>
        <div className="col">
          <h1>Training Repo</h1>
        </div>
      </div>
    </>
  );
};

export default TrainingRepo;
