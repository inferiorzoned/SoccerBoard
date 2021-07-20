import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "./commons/dateTime";
import DayButtonPicker from "./commons/dayButton";

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
      <div className="schedule-popup">
        <div className="d-flex justify-content-between w-100">
          <DateTimePicker
            changeHandler={handleStartDatePicker}
            id={"date"}
            label={"Start Date"}
            type={"date"}
            defaultValue={"2021-07-05"}
          />
          <DateTimePicker
            changeHandler={handleEndDatePicker}
            id={"date"}
            label={"End Date"}
            type={"date"}
            defaultValue={"2021-07-05"}
          />
          <DateTimePicker
            changeHandler={handleTrainingTime}
            id={"time"}
            label={"Training Time"}
            type={"time"}
            defaultValue={"17:00"}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center my-3">
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
        <div className="pu-content-container"></div>
        <button className="btn btn-green-dark" onClick={() => saveSchedule()}>
          ADD
        </button>
      </div>
    );
  }
}

export default SchedulePopup;
