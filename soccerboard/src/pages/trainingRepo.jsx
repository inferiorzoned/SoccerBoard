import React from "react";
import SideBar from "../components/sideBar";
import TrainingCard from "../components/trainingCard";

const TrainingRepo = () => {
  return (
    <div className="row">
      <div className="col-1-auto" style={{ backgroundColor: "blue" }}>
        <SideBar page={"trainingRepo"} />
      </div>
      <div className="col" style={{ backgroundColor: "yellow" }}>
        <h1>Training repo</h1>
        <TrainingCard />
      </div>
      {/* <img src={require("./test.jpg")} /> */}
    </div>
  );
};

export default TrainingRepo;
