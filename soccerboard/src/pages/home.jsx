import React from "react";
import HomeCalendar from "../components/homeCalendar";
import SideBar from "../components/sideBar";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-1-auto">
          <SideBar page={"home"} />
        </div>
        <div className="col-1">
          {/* creating a space between the columns of the contents */}
        </div>
        <div className="col-3">
          <HomeCalendar />
        </div>
      </div>
    </>
  );
};

export default Home;
