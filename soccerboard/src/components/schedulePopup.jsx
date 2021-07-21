import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "./commons/dateTime";
import DayButtonPicker from "./commons/dayButton";
import todayDate from "./commons/todayDate";

class SchedulePopup extends Component {
  state = {};

  render() {
    const {
      handleStartDatePicker,
      handleEndDatePicker,
      handleTrainingTime,
      handleWeekDay,
      saveSchedule,
    } = this.props;
    const weekDays = ["S", "S", "M", "T", "W", "T", "F"];
    return (
      <div className="schedulePopup">
        {/* <form className={classes.container} noValidate> */}
        <DateTimePicker
          changeHandler={handleStartDatePicker}
          id={"date"}
          label={"Start Date"}
          type={"date"}
          // defaultValue={"2021-07-05"}
          defaultValue={todayDate}
        />

        <DateTimePicker
          changeHandler={handleEndDatePicker}
          id={"date"}
          label={"End Date"}
          type={"date"}
          // defaultValue={"2021-07-05"}
          defaultValue={todayDate}
        />
        <DateTimePicker
          changeHandler={handleTrainingTime}
          id={"time"}
          label={"Training Time"}
          type={"time"}
          defaultValue={"17:00"}
        />

        <div className="flexRowBreak"></div>
        {/* <div className="mt-3">hello</div> */}
        <div className="justify-content-center mt-3">
          <DayButtonPicker
            label={weekDays[0]}
            index={0}
            handleWeekDay={handleWeekDay}
          />
          <DayButtonPicker
            label={weekDays[1]}
            index={1}
            handleWeekDay={handleWeekDay}
          />
          <DayButtonPicker
            label={weekDays[2]}
            index={2}
            handleWeekDay={handleWeekDay}
          />
          <DayButtonPicker
            label={weekDays[3]}
            index={3}
            handleWeekDay={handleWeekDay}
          />
          <DayButtonPicker
            label={weekDays[4]}
            index={4}
            handleWeekDay={handleWeekDay}
          />
          <DayButtonPicker
            label={weekDays[5]}
            index={5}
            handleWeekDay={handleWeekDay}
          />
          <DayButtonPicker
            label={weekDays[6]}
            index={6}
            handleWeekDay={handleWeekDay}
          />
        </div>
        <div className="pu-content-container">
          <button className="pu-button-prop" onClick={() => saveSchedule()}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default SchedulePopup;
