import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import _ from "lodash";
import Table from "./commons/table";
import { getPlayers } from "../services/trainingSessionService";

class EvaluationTable extends Component {
  state = {
    presents: [],
    players: [],
  };

  columns = [
    {
      path: "position",
      label: "Position",
    },
    {
      path: "name",
      label: "Name",
    },
    {
      path: "present",
      label: "Present",
      content: (player) => (
        <input
          className="form-check-input"
          type="checkbox"
          name="present"
          value={player._id}
          checked={_.includes(this.state.presents, player._id)}
          onChange={(e) => this.handleCheckboxChange(player, e)}
        />
      ),
    },
    {
      path: "marks",
      label: "Marks",
      content: (player) => (
        <input
          className="evaluation-marks-input"
          type="number"
          name="mark"
          value={player.marks}
          onChange={(e) => this.handleChange(player, e)}
        />
      ),
    },
  ];

  componentDidMount() {
    let players = [...getPlayers()];
    players = players.map((player) => {
      player.present = false;
      player.marks = "";
      return player;
    });
    this.setState({ players: players });
  }

  handleCheckboxChange = (player, e) => {
    let { presents } = this.state;
    if (e.target.checked) presents.push(player._id);
    else presents = presents.filter((pid) => pid !== player._id);
    this.setState({ presents: presents });
  };

  handleChange = (player, e) => {
    const { players } = this.state;
    const _player = players.find((p) => p._id === player._id);
    _player.marks = e.target.value;
    this.setState({ players: players });
  };

  render() {
    const { players } = this.state;
    return (
      <div className="container">
        <Table
          columns={this.columns}
          data={players}
          tableClassName="evaluation-table"
        />
        <div className="text-center p-3">
          <button
            className="btn btn-maroon"
            onClick={() => {
              toast.success("Evaluation submitted.");
              setTimeout(() => {
                window.location = "/home";
              }, 1000);
            }}
          >
            SUBMIT
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default EvaluationTable;
