import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
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
      <div
        className="sidebar text-center position-fixed end-0"
        style={{ width: "16%" }}
      >
        <div className="mt-3">
          <h3>Trainees</h3>
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
        <div className="mt-3">
          <h3>Schedule</h3>
          <IconButton onClick={handleScheduleClick}>
            <AddCircleOutlineOutlinedIcon style={{ color: "#FFFF00" }} />
          </IconButton>
          {scheduleAdded && (
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="session session-date">
                  {this.toDateStr(schedule["startDate"])}
                </div>
                to
                <div className="session session-date">
                  {this.toDateStr(schedule["endDate"])}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {weekDays.map((w, wId) => (
                  <div className={`${w ? "wk-day wk-day-selected" : "wk-day"}`}>
                    {this.state.wDays[wId]}
                  </div>
                ))}
              </div>
              <div className="session session-time">
                {schedule["trainingTime"]}
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 ">
          <button className="btn btn-violet" onClick={createSession}>
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default SessionCreation;
