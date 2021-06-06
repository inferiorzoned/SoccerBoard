import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const DetailsBox = ({ eventSelected, month }) => {
    return ( 
        <div className="details">
            <div className="card-body">
                {eventSelected && <h5 className="card-title">{eventSelected.title}</h5>}
                {eventSelected && <p className="card-text">{month} - {eventSelected.date}</p>}
                {eventSelected && <p className="card-text">{eventSelected.day}</p>}
                {eventSelected && <p className="card-text">{eventSelected.time}</p>}
                {eventSelected && <p className="card-text">{eventSelected.description}</p>}
                <button 
                    href="#" 
                    className={"btn btn-success btn-sm inactive"}
                    disabled={!eventSelected}
                    onClick={() => window.location=`/events/${eventSelected.eventType}/${eventSelected._id}`}
                >
                    Details

                </button>
            </div>
        </div>
        
        
    );
}
 
export default DetailsBox;