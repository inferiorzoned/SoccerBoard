import React, { Component } from "react";
import _ from "lodash";
import Table from "./commons/table";
import { getPlayers } from "../services/trainingSessionService";
import { getSessionNPlayers } from "../services/evaluationService";

class EvaluationTable extends Component {
  state = {
    presents: [],
    players: [],
    session: {},
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

  async componentDidMount() {
    const sessionNPlayers = await getSessionNPlayers(this.props.sessionId);
    // let players = [...getPlayers()];
    let { players, session } = sessionNPlayers;
    players = players.map((player) => {
      player.present = false;
      player.marks = "";
      return player;
    });
    this.setState({ players: players, session: session });
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
    _player.marks = parseFloat(e.target.value);
    this.setState({ players: players });
  };

  render() {
    const { players, session } = this.state;
    return (
      <div className="container">
        <div className="session-title">{session.sessionTitle}</div>
        <Table
          columns={this.columns}
          data={players}
          tableClassName="evaluation-table"
        />
        <div className="d-flex justify-content-center align-items-center p-3">
          <button
            className="btn btn-maroon"
            onClick={() => console.log(this.state)}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

export default EvaluationTable;
