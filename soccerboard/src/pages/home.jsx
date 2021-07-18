import React from "react";
import HomeCalendar from "../components/homeCalendar";
import SideBar from "../components/sideBar";

const Home = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-2">
          <SideBar page={"home"} />
        </div>
        <div className="col-sm-10">
          <HomeCalendar />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
