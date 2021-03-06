import React, { Component } from "react";
import _ from "lodash";
import { library } from "@fortawesome/fontawesome-svg-core";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.min.css";
import {
  faPlus,
  faPen,
  faTrash,
  faMicrophoneAlt,
  faSyncAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faPlusSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  getSquad,
  orderSquadPositions,
  // getFormations,
} from "../services/squad";
import {
  getFormations,
  getCurrentSquad,
  updateSquad,
  createSquad,
} from "../services/gameSquadService";
import field from "../assets/images/field.svg";
import Player from "./commons/player";
import Table from "./commons/table";
import Instruction from "./instruction";
import CmdButton from "./commons/cmdButton";
import auth from "../services/authService";
import Select from "./commons/select";

library.add(
  faPlus,
  faPen,
  faTrash,
  faMicrophoneAlt,
  faSyncAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faPlusSquare,
  faSave
);

class GameSquad extends Component {
  state = {
    squadId: "",
    formationId: "",
    formations: [],
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

    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },

    squadsToSave: [],
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

  async componentDidMount() {
    // const squad = getSquad();
    const squad = await getCurrentSquad();
    const { _id: squadId, formationId, players } = squad;
    // const formations = [...getFormations()];
    let formations = await getFormations();
    formations = formations.map((f) => ({ ...f, value: f._id }));
    // const formation = formations.find((f) => f._id === formationId);
    const formation = formations.find((f) => f._id === squad.formationId);
    const mainPlayers = orderSquadPositions(
      players.filter((p) => p.partOf === "main")
    );
    const subPlayers = orderSquadPositions(
      players.filter((p) => p.partOf === "sub")
    );
    const reservedPlayers = orderSquadPositions(
      players.filter((p) => p.partOf === "reserved")
    );
    // console.log(formation);
    const positions = this.setupPositions(mainPlayers, formation);
    // console.log(formation);
    this.setState({
      user: auth.getCurrentUser(),
      squadId: squadId,
      formationId: formationId,
      formations: formations,
      positions: positions,
      main: mainPlayers,
      sub: subPlayers,
      reserved: reservedPlayers,
    });
    console.log(this.state);
  }

  setupPositions = (_mainPlayers, _formation) => {
    // const mainPlayers = _.cloneDeep(_mainPlayers);
    const mainPlayers = _mainPlayers;
    const formation = _.cloneDeep(_formation);

    let playerUnmatched = [];
    let positionMatchMap = [];
    let _positions = [];

    mainPlayers.forEach((mp) => {
      const positionInFormation = formation.positions.find(
        (pos) => pos.label === mp.position
      );

      if (
        positionInFormation &&
        !positionMatchMap.find((pmm) => pmm.label === positionInFormation.label)
      ) {
        positionMatchMap.push(positionInFormation);

        positionInFormation.kit = mp.kit;
        _positions.push(positionInFormation);
      } else {
        playerUnmatched.push(mp);
      }
    });
    const positionUnmatched = formation.positions.filter(
      (pos) => positionMatchMap.findIndex((pm) => pm.label === pos.label) < 0
    );

    positionUnmatched.forEach((pos, i) => {
      playerUnmatched[i].position = pos.label;
      pos.kit = playerUnmatched[i].kit;
    });

    _positions.push(...positionUnmatched);
    _positions = orderSquadPositions(_positions, "label");

    // let positions = this.state.positions;
    // while (positions.length > 0) positions.pop();
    // positions.push(..._positions);
    // return _.cloneDeep(positions);
    return _positions;
  };

  renderFormation = () => {
    const { formations, formationId } = this.state;
    const currentFormation = formations.find((f) => f._id === formationId);
    return (
      <Select
        isCreatable={true}
        isClearable={false}
        name="formation"
        label="Formation"
        options={formations}
        onChange={(selectedFormation) => {
          let formation = {};
          if (selectedFormation.__isNew__) {
            formation._id = Date.now().toString();
            formation.label = selectedFormation.label;
            formation.positions = _.cloneDeep(currentFormation.positions);
            formation.value = formation._id;
            formations.push(formation);
          } else {
            formation = selectedFormation;
            formation.value = selectedFormation._id;
          }

          // console.log(formation);
          const { main: mainPlayers } = this.state;
          const formationId = formation._id;
          const positions = this.setupPositions(mainPlayers, formation);

          const orderedMain = orderSquadPositions(mainPlayers);

          this.setState({ positions: [] }, () =>
            this.setState({
              positions: positions,
              formationId: formationId,
              formations: formations,
              main: orderedMain,
            })
          );

          // console.log(this.state);
        }}
        defaultValue={currentFormation}
      />
    );
  };

  renderBadge = (label, iconName, onClick) => {
    return (
      <div className="btn-badge" onClick={onClick}>
        {label}
        <div className="btn-badge-icon">
          <FontAwesomeIcon icon={iconName} />
        </div>
      </div>
    );
  };

  renderField = () => {
    const { main, positions, selectedMainPlayers, selectedPlayer } = this.state;
    const selectedPlayers = [...selectedMainPlayers, selectedPlayer];
    return (
      <div className="field-container">
        <div className="main-field-dummy">
          {positions &&
            positions.map((p) => (
              <Player
                key={p.label}
                kit={p.kit ? p.kit : p.label}
                fromLeft={p.left}
                fromTop={p.top}
                isGK={p.label === "GK"}
                isSelected={selectedPlayers.find((sp) => sp.kit === p.kit)}
                onClick={(e) => {
                  const player = main.find((sp) => sp.kit === p.kit);
                  if (e.ctrlKey || e.metaKey)
                    return this.onMultiRowClicked(player);
                  this.onRowClicked(player);
                }}
                savePosition={({ left, top }) => {
                  p.left = left;
                  p.top = top;
                  this.setState({ positions: positions });
                }}
              />
            ))}
        </div>
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

    if (selectedPlayer.instructions.length > 0) {
      const lastInstruction =
        selectedPlayer.instructions[selectedPlayer.instructions.length - 1];
      if (lastInstruction.type === "text" && lastInstruction.content !== "") {
        selectedPlayer.instructions.push({ type: "text", content: "" });
        selectedInstruction = {
          ...selectedInstruction,
          index: selectedPlayer.instructions.length - 1,
          isEditable: true,
        };
      }
    } else {
      selectedPlayer.instructions.push({ type: "text", content: "" });
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
    let { selectedInstruction, selectedPlayer } = this.state;
    if (
      selectedPlayer.instructions[selectedInstruction.index] &&
      selectedPlayer.instructions[selectedInstruction.index].type === "text"
    ) {
      selectedInstruction.isEditable = true;
      this.setState({ selectedInstruction: selectedInstruction });
    }
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

  handleRecord = () => {
    const { selectedPlayer } = this.state;
    if (Object.keys(selectedPlayer).length === 0) return;

    selectedPlayer.instructions.push({
      type: "audio",
      content: {
        blob: {},
        url: null,
      },
    });

    this.setState({ selectedPlayer });
  };

  handleSave = () => {
    const { selectedPlayer } = this.state;

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
    const { user } = this.state;
    return (
      <div className="my-2">
        <div className="squad-table-caption text-center">Instructions</div>
        <div className="i-container">
          {user && (user.userType !== "player" || user.isAdmin) && (
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
                onClick={this.handleRecord}
              />
            </div>
          )}
          <div className="i-list">
            {instructions &&
              instructions.map((i, index) => (
                <Instruction
                  key={index}
                  isSelected={this.state.selectedInstruction.index === index}
                  isEditable={
                    this.state.selectedInstruction.index === index &&
                    this.state.selectedInstruction.isEditable
                  }
                  onChange={({ currentTarget: input }) => {
                    let player = this.state.selectedPlayer;
                    const { selectedInstruction } = this.state;
                    selectedInstruction.saved = false;
                    player.instructions[index].content = input.value;
                    this.setState({
                      selectedPlayer: player,
                      selectedInstruction: this.state.selectedInstruction,
                    });
                  }}
                  instruction={i}
                  onBadgeClicked={() => this.onBadgeClicked(index)}
                  onSave={this.handleSave}
                  handleMediaStop={(data) => this.handleAudioStop(data)}
                  handleMediaReset={() => this.handleReset()}
                />
              ))}
          </div>
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
        (i) =>
          (i.type === "text" && i.content.length !== 0) || i.type === "audio"
      );

    // using player instead of selectPlayer, because player is a reference and selectPlayer is a copy
    if (player._id !== this.state.selectedPlayer._id) {
      if (player.partOf === "main") selection.selectedMainPlayers.push(player);
      else if (player.partOf === "sub")
        selection.selectedSubPlayers.push(player);
      else if (player.partOf === "reserved")
        selection.selectedReservedPlayers.push(player);
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

    // console.log(this.state);
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

  swapPlayers = (player1, player2) => {
    const { positions } = this.state;
    const group1 = this.state[player1.partOf];
    const group2 = this.state[player2.partOf];

    const g1_i = group1.indexOf(player1);
    const g2_i = group2.indexOf(player2);

    if (player1.partOf === "main" && player2.partOf === "main") {
      const posi1 = positions.findIndex(
        (pos) => player1.position === pos.label
      );
      const posi2 = positions.findIndex(
        (pos) => player2.position === pos.label
      );

      [positions[posi1].kit, positions[posi2].kit] = [
        positions[posi2].kit,
        positions[posi1].kit,
      ];
    } else {
      const posi =
        player1.partOf === "main"
          ? positions.findIndex((pos) => player1.position === pos.label)
          : positions.findIndex((pos) => player2.position === pos.label);

      if (posi >= 0)
        positions[posi].kit =
          player1.partOf === "main" ? group2[g2_i].kit : group1[g1_i].kit;
    }

    if (player1.partOf === "main" || player2.partOf === "main") {
      [group1[g1_i].position, group2[g2_i].position] = [
        group2[g2_i].position,
        group1[g1_i].position,
      ];
    }

    if (player1.partOf !== "main")
      group1[g1_i].position = group1[g1_i].prefPosition;
    if (player2.partOf !== "main")
      group2[g2_i].position = group2[g2_i].prefPosition;

    [group1[g1_i].partOf, group2[g2_i].partOf] = [
      group2[g2_i].partOf,
      group1[g1_i].partOf,
    ];

    [group1[g1_i], group2[g2_i]] = [group2[g2_i], group1[g1_i]];

    this.setState({
      selectedMainPlayers: [],
      selectedSubPlayers: [],
      selectedReservedPlayers: [],
      selectedPlayer: {},
    });
  };

  exchangePlayers = () => {
    const { selectedMainPlayers, selectedSubPlayers, selectedReservedPlayers } =
      this.state;

    if (selectedMainPlayers.length === 2) {
      this.swapPlayers(selectedMainPlayers[0], selectedMainPlayers[1]);
    } else if (
      selectedMainPlayers.length === 1 &&
      selectedSubPlayers.length === 1 &&
      selectedReservedPlayers.length === 0
    ) {
      this.swapPlayers(selectedMainPlayers[0], selectedSubPlayers[0]);
    } else if (
      selectedMainPlayers.length === 1 &&
      selectedReservedPlayers.length === 1 &&
      selectedSubPlayers.length === 0
    ) {
      this.swapPlayers(selectedMainPlayers[0], selectedReservedPlayers[0]);
    } else if (
      selectedMainPlayers.length === 0 &&
      selectedSubPlayers.length === 1 &&
      selectedReservedPlayers.length === 1
    ) {
      this.swapPlayers(selectedSubPlayers[0], selectedReservedPlayers[0]);
    } else {
      toast.error(
        "You must swap only 2 players. Swapping inside substitutes and reserved table is not allowed!"
      );
    }
  };

  toReserved = () => {
    const { sub, reserved, selectedSubPlayers } = this.state;

    const newReserved = orderSquadPositions([
      ...reserved,
      ...selectedSubPlayers,
    ]);
    const newSub = sub.filter(
      (p) => selectedSubPlayers.findIndex((ssp) => ssp._id === p._id) < 0
    );

    this.setState({
      sub: newSub,
      reserved: newReserved,
      selectedMainPlayers: [],
      selectedSubPlayers: [],
      selectedReservedPlayers: [],
      selectedPlayer: {},
    });
  };

  fromReserved = () => {
    const { sub, reserved, selectedReservedPlayers } = this.state;

    const newSub = orderSquadPositions([...sub, ...selectedReservedPlayers]);
    const newReserved = reserved.filter(
      (rp) => !selectedReservedPlayers.find((srp) => rp._id === srp._id)
    );

    this.setState({
      sub: newSub,
      reserved: newReserved,
      selectedMainPlayers: [],
      selectedSubPlayers: [],
      selectedReservedPlayers: [],
      selectedPlayer: {},
    });
  };

  handleAudioStop(data) {
    const { selectedPlayer } = this.state;

    console.log(data);

    if (data.url) {
      const lastIndex = selectedPlayer.instructions.length - 1;
      selectedPlayer.instructions[lastIndex].content = {
        blob: data.blob,
        url: data.url,
      };
    }
    const players = this.state[selectedPlayer.partOf];

    let player = players.find((p) => p._id === selectedPlayer._id);
    player.instructions = [...selectedPlayer.instructions];

    this.setState({
      selectedInstruction: {
        ...this.state.selectedInstruction,
        isEditable: false,
      },
      [selectedPlayer.partOf]: players,
      audioDetails: data,
    });
  }

  handleAudioUpload(file) {
    console.log(file);
  }

  handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    this.setState({ audioDetails: reset });
  }

  handleUpdateSquad = async () => {
    const { main, sub, reserved, squadId, formationId } = this.state;
    const players = [...main, ...sub, ...reserved];
    const squad = {
      formationId: formationId,
      players: players,
    };
    console.log(this.state);
    await updateSquad(squadId, squad);
    // console.log(this.state.audioDetails);
    // await uploadAudio(this.state.audioDetails.blob);
  };

  handleCreateSquad = async () => {
    const { formations, positions, main, sub, reserved, formationId } =
      this.state;
    const currentFormation = formations.find((f) => f._id === formationId);

    const formation = {
      label: currentFormation.label,
      positions: positions.map((pos) => ({
        _id: pos._id,
        left: pos.left,
        top: pos.top,
        label: pos.label,
      })),
    };

    const players = [...main, ...sub, ...reserved];
    const squad = {
      players: players,
    };

    await createSquad(formation, squad);

    console.log(this.state);
  };

  render() {
    const {
      user,
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
          {user && (user.userType !== "player" || user.isAdmin) && (
            <div className="row w-100 my-3">
              <div className="col-5">{this.renderFormation()}</div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                {this.renderBadge(
                  "CREATE NEW",
                  faPlusSquare,
                  this.handleCreateSquad
                )}
              </div>
              <div className="col-3 d-flex justify-content-center align-items-center">
                {this.renderBadge("UPDATE", faSave, this.handleUpdateSquad)}
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-sm-5 pt-3">{this.renderField()}</div>
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
                  {user && (user.userType !== "player" || user.isAdmin) && (
                    <div className="d-flex flex-row flex-md-column justify-content-center align-items-center">
                      <CmdButton
                        faIcon={faSyncAlt}
                        buttonClasses="btn-cmd-square"
                        iconClasses="fa-icon-white"
                        onClick={this.exchangePlayers}
                      />
                      <CmdButton
                        faIcon={faAngleDoubleRight}
                        buttonClasses="btn-cmd-square"
                        iconClasses="fa-icon-white"
                        onClick={this.toReserved}
                      />
                      <CmdButton
                        faIcon={faAngleDoubleLeft}
                        buttonClasses="btn-cmd-square"
                        iconClasses="fa-icon-white"
                        onClick={this.fromReserved}
                      />
                    </div>
                  )}
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

export default GameSquad;
