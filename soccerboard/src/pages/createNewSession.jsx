import React, { Component } from "react";
import SideBar from "../components/sideBar";
import TrainingCards from "../components/trainingCards";
import SessionCreation from "../components/sessionCreation";
import TraineeListPopup from "../components/traineeListPopup";
import SchedulePopup from "../components/schedulePopup";

class CreateNewSession extends Component {
  state = {
    sessionTitle: "",
    showSessionCreation: false,
    showTraineeInfo: false,
    showScheduleInfo: false,
    selectedPlayers: [],
    finalSelectedPlayers: [],
    trainings: [],
    schedule: {
      startDate: "2021-07-05",
      endDate: "2021-07-05",
      trainingTime: "17:00",
    },
    weekDays: [false, false, false, false, false, false, false],
    scheduleAdded: false,
    session: {
      trainings: [],
      selectedPlayers: [],
      scehdule: null,
    },
    currentPlayer: {},
    sortColumn: { path: "position", order: "asc" },
  };

  onRowClicked = (player) => {
    // const s = { ...this.state.selectedPlayers };
    // s.push(player);
    this.setState({ currentPlayer: { ...player } });
    const alreadySelected = this.state.selectedPlayers;

    if (
      !alreadySelected.some(
        (p) => p.name === player.name && p.kit === player.kit
      )
    ) {
      this.setState({
        selectedPlayers: [...this.state.selectedPlayers, player],
      });
    }

    console.log(player);
  };

  onSelectionChange = (selectedPlayers) => {
    // this.setState({});
    // console.log(selectedPlayers);
    // this.setState({ selectedPlayers: selectedPlayers });
  };

  handleLink = (e, linkType, trainingID, trainings) => {
    if (linkType === "trainingRepo") {
      window.location = "/Training Repo/" + trainingID;
    } else if (e.ctrlKey || e.metaKey) {
      // this.setState({ showSessionCreation: true });
      // const session = { ...session };
      // session["trainings"].push(trainingID);
      // this.setState({ showSessionCreation: true, session });
      const t = [...this.state.trainings, trainingID];
      this.setState({
        showSessionCreation: true,
        trainings: t,
      });
    }
  };

  setPopup = (val) => {
    this.setState({ showTraineeInfo: val });
    this.setState({ showScheduleInfo: val });
  };

  handleTraineeClick = () => {
    this.setState({ showTraineeInfo: true });
  };

  handleScheduleClick = () => {
    this.setState({ showScheduleInfo: true });
  };

  saveTrainee = () => {
    this.setState({ showTraineeInfo: false });
    const finalSelectedPlayers = [...this.state.selectedPlayers];
    this.setState({ finalSelectedPlayers });
    console.log(this.state.selectedPlayers);
    console.log(this.state.trainings);
  };

  handleStartDatePicker = (e) => {
    console.log(e.target.value);
    const schedule = { ...this.state.schedule };
    schedule["startDate"] = e.target.value;
    this.setState({ schedule });
  };

  handleEndDatePicker = (e) => {
    console.log(e.target.value);
    const schedule = { ...this.state.schedule };
    schedule["endDate"] = e.target.value;
    this.setState({ schedule });
  };

  handleTrainingTime = (e) => {
    console.log(e.target.value);
    const schedule = { ...this.state.schedule };
    schedule["trainingTime"] = e.target.value;
    this.setState({ schedule });
  };

  handleWeekDay = (idx) => {
    let weekDays = [...this.state.weekDays];
    let w;
    // let w = weekDays[idx];
    console.log(weekDays[idx], idx);
    if (weekDays[idx] == true) {
      w = false;
    } else {
      w = true;
    }
    console.log(w);
    weekDays[idx] = w;
    this.setState({ weekDays });
    console.log(this.state.weekDays);
  };

  saveSchedule = () => {
    this.setState({ showScheduleInfo: false, scheduleAdded: true });
    const schedule = { ...this.state.schedule };
    schedule["weekDays"] = this.state.weekDays;
    this.setState({ schedule });
    const s = { ...this.state.schedule };
    console.log(s["startDate"]);
    console.log(s["endDate"]);
    console.log(s["trainingTime"]);
    console.log(this.state.weekDays);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  handleFormChange = (e) => {
    // console.log(e.currentTarget.value);
    const sessionTitle = this.state.sessionTitle;
    sessionTitle = e.currentTarget.value;
    this.setState({ sessionTitle });
  };

  createSession = () => {
    // TODO check for corner cases (no players/ no schedule)
    // send all data to servers

    // TODO reset all things
    window.location = "/Training Repo/Create New Session";
    console.log(this.state.trainings);
  };

  render() {
    const {
      showSessionCreation,
      showTraineeInfo,
      showScheduleInfo,
      session,
      sortColumn,
      selectedPlayers,
      finalSelectedPlayers,
      schedule,
      weekDays,
      scheduleAdded,
    } = this.state;
    // console.log(session);
    // alert(session);
    const duringPopUp =
      showTraineeInfo || showScheduleInfo ? " during-popup" : "";
    return (
      <div className={"" + duringPopUp}>
        <div className="row">
          {showTraineeInfo && (
            <div>
              <TraineeListPopup
                setPopup={this.setPopup}
                onSelectionChange={this.onSelectionChange}
                onRowClicked={this.onRowClicked}
                sortColumn={sortColumn}
                saveTrainee={this.saveTrainee}
                previouslySelected={this.state.finalSelectedPlayers}
              />
            </div>
          )}
          {showScheduleInfo && (
            <div>
              <SchedulePopup
                handleStartDatePicker={this.handleStartDatePicker}
                handleEndDatePicker={this.handleEndDatePicker}
                handleTrainingTime={this.handleTrainingTime}
                handleWeekDay={this.handleWeekDay}
                saveSchedule={this.saveSchedule}
              />
            </div>
          )}

          <div className="col-sm-2">
            <SideBar page={"trainingRepo"} />
          </div>
          <div className={`col-sm-${showSessionCreation ? "8" : "10"}`}>
            <form className=" mb-1 " onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1"></label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="exampleInputEmail1"
                  // aria-describedby="emailHelp"
                  onChange={this.handleFormChange}
                  placeholder="Training Session Title"
                />
                <small id="emailHelp" class="form-text text-muted"></small>
              </div>
            </form>

            <div className="categoryLine"></div>
            <TrainingCards handleLink={this.handleLink} />
          </div>
          {showSessionCreation && (
            <div className="col-sm-2 d-flex flex-row-reverse">
              <SessionCreation
                handleTraineeClick={this.handleTraineeClick}
                selectedPlayers={finalSelectedPlayers}
                handleScheduleClick={this.handleScheduleClick}
                schedule={schedule}
                weekDays={weekDays}
                scheduleAdded={scheduleAdded}
                createSession={this.createSession}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateNewSession;
