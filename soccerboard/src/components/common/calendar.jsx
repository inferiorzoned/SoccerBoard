import React, { Component } from 'react';
import CalendarHeader from './calendarHeader';
import CalendarBody from './calendarBody';

const Calendar = (props) => {
    const { columns, onCellSelected, cellSelected, data, month} = props;
    console.log('calendar ', data);
    return ( 
        <div className="calendar">
            <br></br>
            <h1>{month}</h1>
            <br></br>
            
            <table className="table">
                <CalendarHeader 
                    columns={columns}
                />

                <CalendarBody 
                    data={data}
                    columns={columns}
                    cellSelected={cellSelected}
                    onCellSelected={onCellSelected}
                />
            </table>
        </div>
        
    );
}
 
export default Calendar;