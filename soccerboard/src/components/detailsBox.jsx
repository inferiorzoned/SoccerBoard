import React, { Component } from "react";
import { getCurrentUser } from "../services/authService";

const DetailsBox = ({ eventSelected, month }) => {
  const events = [];
  const renderSpecificEvent = (event) => {
    console.log(getCurrentUser());
    const institution = getCurrentUser().institution;
    if (event.eventType === "Training Session") {
      //console.log(getCurrentUser());
      //the institution is not needed that much actually
      window.location = `/Training Session/${event.eventId}`;
    }
  };
  console.log("details box events ", eventSelected);
  if (eventSelected && eventSelected.entries()) {
    for (const [index, event] of eventSelected.entries()) {
      events.push(
        <div className="details" key={index}>
          <div className="card-body">
            {eventSelected && <h5 className="card-title">{event.title}</h5>}
            {eventSelected && (
              <p className="card-text">
                {month} - {event.date}
              </p>
            )}
            {eventSelected && <p className="card-text">{event.day}</p>}
            {eventSelected && <p className="card-text">{event.time}</p>}
            {eventSelected && <p className="card-text">{event.description}</p>}
            <button
              href="#"
              className={"btn btn-success btn-sm inactive"}
              disabled={!eventSelected}
              onClick={() => renderSpecificEvent(event)}
            >
              Details
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    // eventSelected.map(event => <h1> hello event </h1>)
    <React.Fragment>
      {events}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </React.Fragment>
  );
};

export default DetailsBox;
