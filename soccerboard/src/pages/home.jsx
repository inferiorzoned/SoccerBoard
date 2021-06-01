import React from "react";
import SideBar from "../components/sideBar";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-1-auto" style={{ backgroundColor: "blue" }}>
          <SideBar page={"home"} />
        </div>
        <div className="col" style={{ backgroundColor: "yellow" }}>
          <h1>Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
