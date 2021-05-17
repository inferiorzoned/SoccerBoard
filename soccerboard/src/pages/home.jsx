import React from "react";
import SideBar from "../components/sideBar";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <SideBar page={"home"} />
        </div>
        <div className="col">
          <h1>Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
