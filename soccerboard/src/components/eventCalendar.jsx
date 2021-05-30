import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Calendar from './common/calendar';

class EventCalendar extends Component {
    columns = [
        { path: 'sat', label: 'Sat', content: event => (
        <button>
            {event.title}
        </button> 
    ) },
        { path: 'sun', label: 'Sun', content: event => (
        <button>
            {event.title}
        </button> 
    ) },
        { path: 'mon', label: 'Mon', content: event => (
        <button>
            {event.title}
        </button> 
    ) },
        { path: 'tue', label: 'Tue', content: event => (
        <button>
            {event.title}
        </button> 
    ) },
        { path: 'wed', label: 'Wed', content: event => (
        <button>
            {event.title}
        </button> 
    ) },
        { path: 'thu', label: 'Thu', content: event => (
        <button>
            {event.title}
        </button> 
    ) },
        { path: 'fri', label: 'Fri', content: event => (
        <button>
            {event.title}
        </button> 
    ) }
    ]//as the columns are never going to change, we need to set the delete button only in 
    //case of an admin, it's done in the constructor

    cellContent = event => (
        <button>
            {event.title}
        </button> 
    );


    state = {
        currentEvent: null
    }


    constructor(){
        super();
        //const user = auth.getCurrentUser();
        // if(user && user.isAdmin){
        //     this.columns.push(this.deleteColumn);
        // }
    }
    
    render() { 
        //whenever we click on a column it's the table's responsibility to let us know
        // the sorting path
        const { events, cellSelected, onCellSelected, month } = this.props;
        return ( 
            <Calendar 
                columns={this.columns}
                data={events}
                cellSelected={cellSelected}
                onCellSelected={onCellSelected}
                month={month}
            />
        );
    }
}
 
export default EventCalendar;