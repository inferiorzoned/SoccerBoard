import React from "react";
import SideBar from "../components/sideBar";
import TrainingCards from "../components/trainingCards";

const TrainingRepo = () => {
  return (
    <div className="row">
      <div className="col-1-auto" style={{ backgroundColor: "#212230" }}>
        <SideBar page={"trainingRepo"} />
      </div>
      <div className="col">
        <TrainingCards />
      </div>
    </div>
  );
};
 
export default TrainingRepo;
