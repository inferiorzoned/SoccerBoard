import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// input:
//     onLogOut

const LogOut = (props) => {
  return (
    <div
      className="logout"
      style={{ padding: "0px 20px 0px 20px" }}
      onClick={() => props.onLogOut()}
    >
      <span style={{ color: "#ffeeff" }}>LOGOUT</span>
      <ExitToAppIcon fontSize="large" style={{ color: "#8BC34A" }} />
    </div>
  );
};

export default LogOut;
