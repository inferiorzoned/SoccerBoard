import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// input:
//     onLogOut

const LogOut = (props) => {
  return (
    <div class="logout" onClick={() => props.onLogOut()}>
      <span style={{ color: "#ffeeff" }}>LOGOUT</span>
      <ExitToAppIcon fontSize="large" style={{ color: "#8BC34A" }} />
    </div>
  );
};

export default LogOut;
