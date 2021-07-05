import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { squadPositions, getSquadPositionData } from "../utils/squadData";
import { CircularProgress } from "@material-ui/core";

class SessionInfo extends Component {
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

  async componentDidMount() {
    const squadData = await getSquadPositionData();
    this.setState({ squadData });
  }

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
    const { selectedPlayers, startDate, endDate, trainingTime, weekDays } =
      this.props;
    const { squadData } = this.state;
    console.log(squadData);
    return (
      <div className="sideBar">
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          <div className="mt-2">
            <h1>Trainees</h1>
            {squadData && (
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
                      {squadPositions.map(
                        (posType, posTypeId) =>
                          squadData[posType] &&
                          squadData[posType].map(
                            (pInstance, pInstanceId) =>
                              pInstance._id === p && (
                                <ListItem>{pInstance.name}</ListItem>
                              )
                          )
                      )}
                    </div>
                  ))}
                </List>
              </div>
            )}
            {!squadData && (
              <div className="centered">
                <CircularProgress color="secondary" />
              </div>
            )}
          </div>
          <div className="mt-5">
            <h1>Schedule</h1>
            {startDate && endDate && trainingTime && weekDays && (
              <div>
                <button className="buttonDate">
                  {this.toDateStr(startDate)}
                </button>
                to
                <button className="buttonDate">
                  {this.toDateStr(endDate)}
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
                  <button className="buttonTime">{trainingTime}</button>
                </div>
              </div>
            )}
            {!(startDate && endDate && trainingTime && weekDays) && (
              <div className="centered">
                <CircularProgress color="secondary" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SessionInfo;
