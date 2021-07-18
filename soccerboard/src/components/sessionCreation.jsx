import React, { Component } from "react";
import SideBar from "./sideBar";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

class SessionCreation extends Component {
  state = {
    dict: {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    },
    wDays: ["S", "S", "M", "T", "W", "T", "F"],
  };

  toDateStr = (date) => {
    const splitted = date.split("-");
    let str = "";
    str += splitted[2];
    str += " ";
    str += this.state.dict[splitted[1]];
    str += ", ";
    str += splitted[0].slice(2, 4);
    return str;
  };

  render() {
    let c = 5;
    const {
      handleTraineeClick,
      selectedPlayers,
      handleScheduleClick,
      schedule,
      weekDays,
      scheduleAdded,
      createSession,
    } = this.props;
    // return <SideBar page={"trainingRepo"} />;
    console.log(selectedPlayers);
    console.log(schedule["startDate"]);
    console.log(schedule["endDate"]);
    console.log(schedule["trainingTime"]);
    return (
      <div className="sidebar">
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          <div className="mt-2">
            <h1>Trainees</h1>
            <IconButton onClick={handleTraineeClick}>
              <AddCircleOutlineOutlinedIcon style={{ color: "#FFFF00" }} />
            </IconButton>
            {selectedPlayers.length > 0 && (
              <div>
                <List
                  style={{
                    maxHeight: 180,
                    overflow: "auto",
                    border: "5px solid green",
                    borderRadius: "5px",
                  }}
                >
                  {selectedPlayers.map((p, pId) => (
                    <div>
                      <ListItem>{p.name}</ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </div>
            )}
          </div>
          <div className="mt-5">
            <h1>Schedule</h1>
            <IconButton onClick={handleScheduleClick}>
              <AddCircleOutlineOutlinedIcon style={{ color: "#FFFF00" }} />
            </IconButton>
            {scheduleAdded && (
              <div>
                {/* <h1>to</h1> */}
                <button className="buttonDate">
                  {this.toDateStr(schedule["startDate"])}
                </button>
                to
                <button className="buttonDate">
                  {this.toDateStr(schedule["endDate"])}
                </button>
                <div>
                  {weekDays.map((w, wId) => (
                    <button
                      className={`${w ? "buttonEnabled" : "buttonDisabled"}`}
                    >
                      {this.state.wDays[wId]}
                    </button>
                  ))}
                </div>
                <div>
                  <button className="buttonTime">
                    {schedule["trainingTime"]}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 ">
            <button className="createSession" onClick={createSession}>
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionCreation;
