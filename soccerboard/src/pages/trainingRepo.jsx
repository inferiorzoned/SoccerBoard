import React from "react";
import SideBar from "../components/sideBar";
import TrainingCards from "../components/trainingCards";

const handleLink = (e, linkType, trainingID) => {
  if (linkType === "trainingRepo") {
    window.location = "/Training Repo/" + trainingID;
  }
};

const TrainingRepo = () => {
  return (
    <div className="row">
      <div className="col-sm-2">
        <SideBar page={"trainingRepo"} />
      </div>
      <div className="col-sm-10">
        <TrainingCards handleLink={handleLink} linkType={"trainingRepo"} />
      </div>
    </div>
  );
};
export default TrainingRepo;
