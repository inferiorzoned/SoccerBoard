import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faPen,
  faTrash,
  faMicrophoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import gotoWhiteboard from "../assets/icons/gotoWhiteboard.svg";
import load from "../assets/icons/load.svg";
import field from "../assets/images/field.svg";
import { getSquad, getFormation } from "../services/squad";
import Player from "./commons/player";
import Table from "./commons/table";
import Instruction from "./instruction";
import CmdButton from "./commons/cmdButton";

library.add(faPlus, faPen, faTrash, faMicrophoneAlt);

class Squad extends Component {
  state = {
    positions: [],
    main: [],
    sub: [],
    reserved: [],
    selectedMainPlayers: [],
    selectedSubPlayers: [],
    selectedReservedPlayers: [],
    selectedPlayer: {},
    selectedInstruction: {
      index: -1,
      isEditable: false,
      saved: undefined,
    },
  };

  columns = [
    {
      path: "kit",
      label: "Kit",
      content: (player) => player.kit,
    },
    {
      path: "position",
      label: "Position",
      content: (player) => player.position,
    },
    {
      path: "name",
      label: "Name",
      content: (player) => player.name,
    },
  ];

  componentDidMount() {
    const formation = getFormation("1");
    const players = [...getSquad()];
    const mainPlayers = players.filter((p) => p.partOf === "main");
    const subPlayers = players.filter((p) => p.partOf === "sub");
    const reservedPlayers = players.filter((p) => p.partOf === "reserved");

    const positions = formation.positions.map((p) => {
      const player = mainPlayers.find((mp) => mp.position === p.label);
      if (player) p.label = player.kit;
      return p;
    });

    this.setState({
      positions: positions,
      main: mainPlayers,
      sub: subPlayers,
      reserved: reservedPlayers,
    });
  }

  renderFormation = () => {
    const formationCSS = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "120px",
      height: "48px",
      background: "#212230",
      border: "4px solid #217075",
      padding: "4px",
      boxSizing: "border-box",
      borderRadius: "24px",
      fontFamily: "Passero One",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      textAlign: "center",
      color: "#F0FDFB",
    };
    const labelCSS = {
      padding: "4px",
      fontFamily: "Passero One",
      fontSize: "20px",
      color: "#6D6E78",
    };

    return (
      <div>
        <div style={labelCSS}>Formation</div>
        <div style={formationCSS}>4-3-3</div>;
      </div>
    );
  };

  renderBadge = () => {
    const badgeCSS = {
      width: "180px",
      height: "60px",
      fontFamily: "Passero One",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#000000",
      border: "4px solid #034732",
      boxSizing: "border-box",
      borderRadius: "32px",
    };
    return (
      <div>
        <div style={badgeCSS}>
          Whiteboard
          <img
            src={gotoWhiteboard}
            style={{
              padding: "0px 12px 0px 12px",
              height: "52px",
              width: "52px",
            }}
            alt=""
            srcSet=""
          />
        </div>
        <div style={badgeCSS}>
          Load Squad
          <img
            src={load}
            style={{
              padding: "0px 12px 0px 12px",
              height: "60px",
              width: "60px",
            }}
            alt=""
            srcSet=""
          />
        </div>
      </div>
    );
  };

  renderField = () => {
    const { positions } = this.state;
    return (
      <div className="field-container">
        {positions &&
          positions.map((p) => (
            <Player
              key={p.label}
              kit={p.label}
              fromLeft={p.left}
              fromBottom={p.bottom}
              isGK={p.isGK}
            />
          ))}
        <img src={field} alt="" />
      </div>
    );
  };

  onBadgeClicked = (index) => {
    let { selectedPlayer, selectedInstruction } = this.state;

    if (selectedInstruction.saved === false) {
      toast.warning("You did not save the last modification!");
      selectedInstruction.saved = undefined;
    }

    if (selectedPlayer.instructions[index].length > 0)
      selectedPlayer.instructions = selectedPlayer.instructions.filter(
        (instruction, _index) => instruction.length !== 0
      );
    if (selectedInstruction.index === index) index = -1;
    else selectedInstruction.isEditable = false;

    this.setState({
      selectedInstruction: { ...selectedInstruction, index: index },
      selectedPlayer: selectedPlayer,
    });
  };

  handleAdd = () => {
    let { selectedPlayer, selectedInstruction } = this.state;
    if (
      selectedPlayer.instructions[selectedPlayer.instructions.length - 1] !== ""
    ) {
      selectedPlayer.instructions.push("");
      selectedInstruction = {
        ...selectedInstruction,
        index: selectedPlayer.instructions.length - 1,
        isEditable: true,
      };
    }
    this.setState({
      selectedPlayer,
      selectedInstruction,
    });
  };

  handleEdit = () => {
    let { selectedInstruction } = this.state;
    selectedInstruction.isEditable = true;
    this.setState({ selectedInstruction: selectedInstruction });
  };

  handleDelete = () => {
    let { selectedPlayer, selectedInstruction } = this.state;
    selectedPlayer.instructions = selectedPlayer.instructions.filter(
      (i, _index) => _index !== selectedInstruction.index
    );
    selectedInstruction.index = -1;
    const players = this.state[selectedPlayer.partOf];
    let player = players.find((p) => p._id === selectedPlayer._id);
    player.instructions = selectedPlayer.instructions;
    this.setState({
      selectedPlayer,
      selectedInstruction,
      [selectedPlayer.partOf]: players,
    });
  };

  handleSave = () => {
    let { selectedPlayer } = this.state;
    const players = this.state[selectedPlayer.partOf];

    let player = players.find((p) => p._id === selectedPlayer._id);
    player.instructions = [...selectedPlayer.instructions];

    this.setState({
      selectedInstruction: {
        ...this.state.selectedInstruction,
        isEditable: false,
      },
      [selectedPlayer.partOf]: players,
    });
  };

  renderInstructions = () => {
    const { instructions } = this.state.selectedPlayer;
    return (
      <div className="i-container">
        <div className="command-pallette">
          <CmdButton
            faIcon={faPlus}
            iconClasses="fa-icon-white"
            buttonClasses="btn-cmd-add"
            onClick={this.handleAdd}
          />
          <CmdButton
            faIcon={faPen}
            iconClasses="fa-icon-white"
            buttonClasses="btn-cmd-edit"
            onClick={this.handleEdit}
          />
          <CmdButton
            faIcon={faTrash}
            iconClasses="fa-icon-white"
            buttonClasses="btn-cmd-delete"
            onClick={this.handleDelete}
          />
          <CmdButton
            faIcon={faMicrophoneAlt}
            iconClasses="fa-icon-white"
            buttonClasses="btn-cmd-record"
          />
        </div>
        <div className="i-list">
          {instructions &&
            instructions.map((i, index) => (
              <Instruction
                key={index}
                order={index}
                isSelected={this.state.selectedInstruction.index === index}
                isEditable={
                  this.state.selectedInstruction.index === index &&
                  this.state.selectedInstruction.isEditable
                }
                onChange={({ currentTarget: input }) => {
                  let player = this.state.selectedPlayer;
                  this.state.selectedInstruction.saved = false;
                  player.instructions[index] = input.value;
                  this.setState({
                    selectedPlayer: player,
                    selectedInstruction: this.state.selectedInstruction,
                  });
                }}
                description={i}
                onBadgeClicked={this.onBadgeClicked}
                onSave={this.handleSave}
              />
            ))}
        </div>
      </div>
    );
  };

  #getPlayerMapping = (player) => {
    const { selectedMainPlayers, selectedSubPlayers, selectedReservedPlayers } =
      this.state;

    let selectedPlayers, selectedPlayersKey;
    if (player.partOf === "main") {
      selectedPlayersKey = "selectedMainPlayers";
      selectedPlayers = selectedMainPlayers ? [...selectedMainPlayers] : [];
    } else if (player.partOf === "sub") {
      selectedPlayersKey = "selectedSubPlayers";
      selectedPlayers = selectedSubPlayers ? [...selectedSubPlayers] : [];
    } else if (player.partOf === "reserved") {
      selectedPlayersKey = "selectedReservedPlayers";
      selectedPlayers = selectedReservedPlayers
        ? [...selectedReservedPlayers]
        : [];
    }
    return {
      selectedPlayersKey: selectedPlayersKey,
      selectedPlayers: selectedPlayers,
    };
  };

  onRowClicked = (player) => {
    let selection = {
      selectedMainPlayers: [],
      selectedSubPlayers: [],
      selectedReservedPlayers: [],
    };

    let { ...selectedPlayer } = player;
    selectedPlayer.instructions = selectedPlayer.instructions.filter(
      (i) => i.length !== 0
    );

    if (player.partOf === "main")
      selection.selectedMainPlayers.push(selectedPlayer);
    else if (player.partOf === "sub")
      selection.selectedSubPlayers.push(selectedPlayer);
    else if (player.partOf === "reserved")
      selection.selectedReservedPlayers.push(selectedPlayer);

    this.setState({
      selectedPlayer: selectedPlayer,
      selectedInstruction: {
        ...this.state.selectedInstruction,
        index: -1,
        saved: undefined,
      },
      ...selection,
    });
  };

  onMultiRowClicked = (player) => {
    let { selectedPlayersKey, selectedPlayers } =
      this.#getPlayerMapping(player);

    const indexOfPlayer = selectedPlayers.findIndex(
      (p) => p._id === player._id
    );
    if (indexOfPlayer !== -1) {
      selectedPlayers.splice(indexOfPlayer, 1);
    } else {
      selectedPlayers.push(player);
    }

    this.setState({ [selectedPlayersKey]: selectedPlayers });
  };

  renderSquad = (type, players, selectedPlayers, theme, onMultiRowClicked) => {
    return (
      <div className="text-center p-3">
        <div className="squad-table-caption">{type}</div>
        <Table
          columns={this.columns}
          data={players}
          tableClassName="squad-table"
          themeClassName={theme}
          onRowClicked={this.onRowClicked}
          onRowCtrlClicked={onMultiRowClicked}
          selected={selectedPlayers}
          selectedRowClassName="selected"
        />
      </div>
    );
  };

  render() {
    const {
      main,
      sub,
      reserved,
      selectedMainPlayers,
      selectedSubPlayers,
      selectedReservedPlayers,
    } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-auto">{this.renderField()}</div>
            <div className="col-auto">
              {this.renderSquad(
                "Main Squad",
                main,
                selectedMainPlayers,
                "green",
                this.onMultiRowClicked
              )}
              {this.renderSquad(
                "Substitutes",
                sub,
                selectedSubPlayers,
                "violet",
                this.onMultiRowClicked
              )}
            </div>
            <div className="col-auto">
              {this.renderSquad(
                "Reserved",
                reserved,
                selectedReservedPlayers,
                "maroon",
                this.onMultiRowClicked
              )}
            </div>
          </div>
          {this.renderInstructions()}
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Squad;
