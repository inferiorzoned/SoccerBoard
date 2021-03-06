import React, { Component } from "react";
import Calendar from "./commons/calendar";

class EventCalendar extends Component {
  columns = [
    {
      path: "sun",
      label: "Sun",
      content: (event) => <button>{event.title}</button>,
    },
    {
      path: "mon",
      label: "Mon",
      content: (event) => <button>{event.title}</button>,
    },
    {
      path: "tue",
      label: "Tue",
      content: (event) => <button>{event.title}</button>,
    },
    {
      path: "wed",
      label: "Wed",
      content: (event) => <button>{event.title}</button>,
    },
    {
      path: "thu",
      label: "Thu",
      content: (event) => <button>{event.title}</button>,
    },
    {
      path: "fri",
      label: "Fri",
      content: (event) => <button>{event.title}</button>,
    },
    {
      path: "sat",
      label: "Sat",
      content: (event) => <button>{event.title}</button>,
    },
  ]; //as the columns are never going to change, we need to set the delete button only in
  //case of an admin, it's done in the constructor

  cellContent = (event) => <button>{event.title}</button>;

  state = {
    currentEvent: null,
  };

  constructor() {
    super();
    //const user = auth.getCurrentUser();
    // if(user && user.isAdmin){
    //     this.columns.push(this.deleteColumn);
    // }
  }

  render() {
    //whenever we click on a column it's the table's responsibility to let us know
    // the sorting path
    const {
      events,
      cellSelected,
      onCellSelected,
      month,
      onIncrease,
      onDecrease,
    } = this.props;
    return (
      <Calendar
        columns={this.columns}
        data={events}
        cellSelected={cellSelected}
        onCellSelected={onCellSelected}
        month={month}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    );
  }
}

export default EventCalendar;
