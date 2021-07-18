import React, { Component } from "react";
import { squadPositions, getSquadPositionData } from "../utils/squadData";
import { CircularProgress } from "@material-ui/core";
import Table from "./commons/table";
import _ from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class TraineeListPopup extends Component {
  state = {
    addedPlayers: [],
  };
  async componentDidMount() {
    const squadData = await getSquadPositionData();
    this.setState({ squadData });
  }
  onPlayerClick = (player) => {
    //   console.log(player);
    alert(player);
  };

  onCheckboxChange = (player, e) => {
    // const { onSelectionChange } = this.props;
    // let addedPlayers = [...this.state.addedPlayers];
    // if (!e.target.checked) {
    //   console.log("not included");
    //   addedPlayers = addedPlayers.filter((id) => id !== player._id);
    // } else {
    //   console.log(addedPlayers);
    //   addedPlayers = [...addedPlayers, player._id];
    // //   addedPlayers.push(player._id);
    //   console.log(addedPlayers);
    // }
    // // onSelectionChange(addedPlayers);
    // this.setState({ addedPlayers });
    // console.log(addedPlayers);
  };

  columns = [
    {
      path: "select",
      label: "",
      content: (player) => (
        <input
          className="form-check-input"
          type="checkbox"
          name="accept"
          value={player._id}
          aria-label="checkbox-for-acceptance"
          defaultChecked={this.props.previouslySelected.some(
            (p) => p.name === player.name && p.kit === player.kit
          )}
          //   defaultChecked="true"
          //   checked={_.includes(this.state.addedPlayers, player._id)}
          onChange={(e) => this.onCheckboxChange(player, e)}
        />
      ),
    },
    {
      path: "position",
      label: "",
      content: (player) => <div>{player.position}</div>,
    },
    {
      path: "name",
      label: "",
      content: (player) => <div>{player.name}</div>,
    },
  ];

  render() {
    console.log(this.props.previouslySelected);
    const { setPopup, onRowClicked, sortColumn, saveTrainee } = this.props;
    const { squadData, list } = this.state;
    // console.log(squadData);
    if (squadData) {
      return (
        <div className="traineePopup">
          <button className="popup-x" onClick={() => setPopup(false)}>
            X
          </button>
          <h1>Select Players</h1>
          <List
            style={{
              maxHeight: 380,
              overflow: "auto",
              border: "4px double",
              borderColor: "#359b37",
              borderRadius: "2px",
              marginTop: "1.5em",
              paddingLeft: "1em",
              paddingRight: "1.5em",
            }}
          >
            <ul style={{ listStyle: "none" }}>
              {squadPositions.map((posType, posTypeId) => (
                <li key={posTypeId}>
                  <h4>{posType}</h4>
                  {/* <ul>
                      {squadData[posType] &&
                        squadData[posType].map((playerData, playerDataId) => (
                          <li key={playerDataId}>{playerData.position}</li>
                        ))}
                    </ul> */}
                  {squadData[posType] && (
                    <Table
                      columns={this.columns}
                      data={squadData[posType]}
                      onRowClicked={onRowClicked}
                      // sortColumn={sortColumn}
                    />
                  )}
                </li>
              ))}
            </ul>
          </List>
          <div className="pu-content-container">
            <button className="pu-button-prop" onClick={() => saveTrainee()}>
              Add
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="centered">
        <CircularProgress color="secondary" />
      </div>
    );
  }
}

export default TraineeListPopup;
