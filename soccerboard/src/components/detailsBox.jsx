modified:   package-lock.json
        modified:   package.json
        modified:   src/components/detailsBox.jsx
        modified:   src/components/homeCalendar.jsx
        modified:   src/components/sideBarList.jsx
        modified:   src/components/trainingEditor.jsx
        modified:   src/pages/createTraining.jsx
        modified:   src/utils/eventServices.js
        modified:   src/utils/sideBarData.js


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderSpecificEvent } from '../utils/eventServices';

const DetailsBox = ({ eventSelected, month }) => {
    const events = [];
    if(eventSelected && eventSelected.entries()){
        for(const [index, event] of eventSelected.entries()) {
            events.push(
                <div className="details" key={index}>
                    <div className="card-body">
                        {eventSelected && <h5 className="card-title">{event.title}</h5>}
                        {eventSelected && <p className="card-text">{month} - {event.date}</p>}
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
            )
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
}
 
export default DetailsBox;