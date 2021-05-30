import React, { Component } from 'react';

const DetailsBox = ({ eventSelected }) => {
    return ( 
        <div className="card details">
            <div className="card-body">
                {eventSelected && <h5 className="card-title">{eventSelected.title}</h5>}
                {eventSelected && <p className="card-text">{eventSelected.date}</p>}
                {eventSelected && <p className="card-text">{eventSelected.day}</p>}
                <button 
                    href="#" 
                    className={"btn btn-success btn-sm inactive"}
                    disabled={!eventSelected}
                >
                    Details
                </button>
            </div>
        </div>
        
        
    );
}
 
export default DetailsBox;