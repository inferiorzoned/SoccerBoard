import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupWindow from "./commons/popupWindow";
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
      <div className="sidebar" style={{ width: "inherit" }}>
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
                    cursor: "pointer",
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
                                <Popup
                                  trigger={
                                    <ListItem>{pInstance.name}</ListItem>
                                  }
                                  modal
                                >
                                  <span>
                                    <PopupWindow
                                      popupImage={pInstance.playerImage}
                                      popupTitle={pInstance.name}
                                      popupText={`Matches: ${
                                        pInstance.numberOfMatches | ""
                                      }, Gametime: ${
                                        pInstance.gameTime | ""
                                      }, Goals: ${
                                        pInstance.goals | ""
                                      }, Assists: ${
                                        pInstance.assist | ""
                                      }, Y.Cards: ${
                                        pInstance.yellows | ""
                                      }, R.Cards: ${
                                        pInstance.reds | ""
                                      }, C.Sheets: ${pInstance.cleanSheets | ""}
                `}
                                    />
                                  </span>
                                </Popup>
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
          <div className="mt-3">
            <h1>Schedule</h1>
            {startDate && endDate && trainingTime && weekDays && (
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="session session-date">
                    {this.toDateStr(startDate)}
                  </div>
                  to
                  <div className="session session-date">
                    {this.toDateStr(endDate)}
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  {weekDays.map((w, wId) => (
                    <div
                      className={`${w ? "wk-day wk-day-selected" : "wk-day"}`}
                    >
                      {this.state.wDays[wId]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="session session-time">{trainingTime}</div>
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
