import React from "react";
import SideBar from "../components/sideBar";
import SquadTable from '../components/squadTable';
import squadService from '../utils/squadServices';


const Squad = () => {
  const players = squadService.getSquadStatus();

  return (
    <>
      <div className="row">
        <div className="col-1-auto">
          <SideBar page={"squad"} />
        </div>
        <div className="col-1">
          {/* creating a space between the columns of the contents */}
        </div>
        <div className="col-7">
          <SquadTable players={players}/>
        </div>
      </div>
    </>
  );
};

export default Squad;
