import React from "react";
import ManagerHome from "../components/managerHome";
import SideBar from "../components/sideBar";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-1-auto">
          <SideBar page={"home"} />
        </div>
        <div className="col-2">
        </div>
        <div className="col-3">
          <ManagerHome />
        </div>
      </div>
    </>
  );
};

export default Home;
