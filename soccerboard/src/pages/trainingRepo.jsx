import React from "react";
import SideBar from "../components/sideBar";
import TrainingCards from "../components/trainingCards";

const TrainingRepo = () => {
  return (
    <div className="row">
      <div className="col-sm-2">
        <SideBar page={"trainingRepo"} />
      </div>
      <div className="col-sm-10">
        <TrainingCards />
      </div>
    </div>
  );
};

export default TrainingRepo;
