import React from "react";
import SideBar from "../components/sideBar";
import SquadCards from "../components/squadCards";

const Squad = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"squad"} />
        </div>
        <div className="col-sm-10">
          <SquadCards />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Squad;
