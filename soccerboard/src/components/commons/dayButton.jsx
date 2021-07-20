import React, { Component } from "react";

class DayButtonPicker extends Component {
  state = {
    selected: false,
  };

  toggleState = () => {
    let selected = this.state.selected;
    selected = selected == true ? false : true;
    this.setState({ selected });
  };
  render() {
    const { label, index, handleWeekDay } = this.props;
    return (
      <button
        className={` m-1 ${
          this.state.selected ? "wk-day wk-day-selected" : "wk-day"
        }`}
        onClick={() => {
          handleWeekDay(index);
          this.toggleState();
        }}
      >
        {label}
      </button>
    );
  }
}

export default DayButtonPicker;
