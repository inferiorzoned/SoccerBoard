import React, { Component } from 'react';
import _, { indexOf } from 'lodash';

class CalendarBody extends Component {
    state = {  }
    
    //to work with the dynamic cells we can code like this
    renderCell = (item, column) => {
        console.log(item);
        // if(column.content) {
        //     return column.content(item);
        // }
        return _.get(item, column.path);
    }


    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }

    render() { 
        const { data, cellSelected, onCellSelected} = this.props;
        console.log('data=>',data);

        const rows = [];
        for (const [index, row] of data.entries()) {
            rows.push(<tr key={index}>
                {row.map( element => 
                    <td key={element._id}
                    >
                        <button
                            className={cellSelected && cellSelected._id === element._id?'cell selected0':
                                'cell selected'+element.color}
                            onClick={() => onCellSelected(element)}
                        >
                            {element.date}<br></br>
                            {element.title}
                        </button>
                    </td>
                )}
                </tr> )
        }

        console.log('rows ',rows);
        return ( 
            <tbody>
                {rows}
            </tbody>
        );
    }
}
 
export default CalendarBody;