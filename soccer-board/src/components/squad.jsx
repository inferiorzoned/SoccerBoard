import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faPen,
  faTrash,
  faMicrophoneAlt,
  faSyncAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
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

library.add(
  faPlus,
  faPen,
  faTrash,
  faMicrophoneAlt,
  faSyncAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft
);

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
      if (player) p.kit = player.kit;
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
    const { main, positions, selectedMainPlayers, selectedPlayer } = this.state;
    const selectedPlayers = [...selectedMainPlayers, selectedPlayer];
    return (
      <div className="field-container">
        {positions &&
          positions.map((p) => (
            <Player
              key={p.label}
              kit={p.kit ? p.kit : p.label}
              fromLeft={p.left}
              fromBottom={p.bottom}
              isGK={p.label === "GK"}
              isSelected={selectedPlayers.find((sp) => sp.kit === p.kit)}
              onClick={(e) => {
                const player = main.find((sp) => sp.kit === p.kit);
                if (e.ctrlKey || e.metaKey)
                  return this.onMultiRowClicked(player);
                this.onRowClicked(player);
              }}
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
    if (Object.keys(selectedPlayer).length === 0) return;
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
    if (Object.keys(selectedPlayer).length === 0) return;
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
    if (selectedPlayer.instructions)
      selectedPlayer.instructions = selectedPlayer.instructions.filter(
        (i) => i.length !== 0
      );
    if (selectedPlayer._id !== this.state.selectedPlayer._id) {
      if (player.partOf === "main")
        selection.selectedMainPlayers.push(selectedPlayer);
      else if (player.partOf === "sub")
        selection.selectedSubPlayers.push(selectedPlayer);
      else if (player.partOf === "reserved")
        selection.selectedReservedPlayers.push(selectedPlayer);
    } else {
      selectedPlayer = {};
    }

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
      <div className="d-flex flex-column justify-content-center align-items-center p-3">
        <div className="squad-table-caption">{type}</div>
        <Table
          columns={this.columns}
          data={players}
          tableClassName="squad-table"
          themeClassName={theme}
          onRowClicked={this.onRowClicked}
          onRowCtrlClicked={onMultiRowClicked}
          selectedItems={selectedPlayers}
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
            <div className="col-sm-5">{this.renderField()}</div>
            <div className="col-sm-7">
              <div className="row justify-content-center align-items-center">
                <div className="col-sm-6 d-flex flex-column justify-content-center align-items-center">
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
                <div className="col-sm-1">
                  <div className="d-flex flex-row flex-md-column justify-content-center align-items-center">
                    <CmdButton
                      faIcon={faSyncAlt}
                      buttonClasses="btn-cmd-square"
                      iconClasses="fa-icon-white"
                    />
                    <CmdButton
                      faIcon={faAngleDoubleRight}
                      buttonClasses="btn-cmd-square"
                      iconClasses="fa-icon-white"
                    />
                    <CmdButton
                      faIcon={faAngleDoubleLeft}
                      buttonClasses="btn-cmd-square"
                      iconClasses="fa-icon-white"
                    />
                  </div>
                </div>
                <div className="col-sm-5">
                  {this.renderSquad(
                    "Reserved",
                    reserved,
                    selectedReservedPlayers,
                    "maroon",
                    this.onMultiRowClicked
                  )}
                </div>
              </div>
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
