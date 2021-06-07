import React from "react";
import SideBar from "../components/sideBar";
import SquadCards from "../components/squadCards";

const Squad = () => {
  return (
    <>
      <div className="row">
        <div className="col-1-auto" style={{ backgroundColor: "#212230" }}>
          <SideBar page={"squad"} />
        </div>
        <div className="col">
          <SquadCards />
        </div>
      </div>
    </>
  );
};

export default Squad;
