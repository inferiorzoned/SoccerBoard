import React, { Component } from "react";
import SideBar from "../components/sideBar";
import TrainingCards from "../components/trainingCards";
import SessionCreation from "../components/sessionCreation";
import TraineeListPopup from "../components/traineeListPopup";
import SchedulePopup from "../components/schedulePopup";
import todayDate from "../components/commons/todayDate";
import { uploadSession } from "../services/sessionServices";
import Joi from "joi-browser";

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
      startDate: todayDate,
      endDate: todayDate,
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
    schema: {
      sessionTitle: Joi.string().required().label("Session Title"),
      trainings: Joi.any(),
      selectedPlayers: Joi.any(),
      schedule: Joi.any(),
      startDate: Joi.any(),
      endDate: Joi.any(),
      trainingTime: Joi.any(),
      weekDays: Joi.any(),
    },
    errors: {},
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
    if (linkType === "trainingSession") {
      if (e.ctrlKey || e.metaKey) {
        const t = [...this.state.trainings, trainingID];
        this.setState({
          showSessionCreation: true,
          trainings: t,
        });
      } else {
        window.location = "/Training Repo/" + trainingID;
      }
    } else {
      window.location = "/Training Repo/" + trainingID;
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
    // let w = {...weekDays[idx]};
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
    let sessionTitle = this.state.sessionTitle;
    sessionTitle = e.currentTarget.value;
    this.setState({ sessionTitle });
  };

  validate = (session) => {
    const option = {
      abortEarly: false,
    };
    const { error } = Joi.validate(session, this.state.schema, option);

    if (!error) return null;

    console.log(error);
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  createSession = async () => {
    // TODO check for corner cases (no players/ no schedule)
    // send all data to servers
    console.log(this.state.sessionTitle);
    console.log(this.state.trainings);
    this.state.finalSelectedPlayers.map((p, pId) => console.log(p.name, p._id));
    // console.log(this.state.finalSelectedPlayers);
    console.log(this.state.schedule["startDate"]);
    console.log(this.state.schedule["endDate"]);
    console.log(this.state.schedule["trainingTime"]);
    console.log(this.state.weekDays);
    const {
      sessionTitle,
      trainings,
      finalSelectedPlayers,
      schedule,
      weekDays,
    } = this.state;
    let selectedPlayers = [];
    finalSelectedPlayers.map((p, pId) => selectedPlayers.push(p._id));
    const session = {
      sessionTitle: sessionTitle,
      trainings: trainings,
      selectedPlayers: selectedPlayers,
      startDate: schedule["startDate"],
      endDate: schedule["endDate"],
      trainingTime: schedule["trainingTime"],
      weekDays: weekDays,
    };
    console.log(session);
    const errors = this.validate(session);
    this.setState({ errors: errors || {} });
    console.log(this.state.errors.sessionTitle);
    if (errors) {
      return;
    }
    console.log(session);
    await uploadSession(session);
    // TODO reset all things
    // window.location = "/Training Repo/Create New Session";
    // console.log(this.state.trainings);
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
            <SideBar style={{ width: "inherit" }} page={"trainingRepo"} />
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
                {this.state.errors.sessionTitle && (
                  <div className="alert alert-danger">
                    {this.state.errors.sessionTitle}
                  </div>
                )}
              </div>
            </form>
            <div className="categoryLine"></div>
            <small>
              Click to view training, CTRL + Click to add to the session
            </small>
            <TrainingCards
              handleLink={this.handleLink}
              linkType={"trainingSession"}
            />
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
