import React from "react";
import SideBar from "../components/sideBar";

const Squad = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <SideBar page={"squad"} />
        </div>
        <div className="col">
          <h1>Squad</h1>
        </div>
      </div>
    </>
  );
};

export default Squad;
