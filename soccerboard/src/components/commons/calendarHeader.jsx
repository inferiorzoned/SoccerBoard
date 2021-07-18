import React, { Component } from 'react';
//columnNames
//onSort function
//sortColumn

class CalendarHeader extends Component {

    state = {  }

    render() { 
        const { columns } = this.props;
        console.log(columns);
        return ( 
            <thead>
                <tr>
                    {columns.map( column => 
                        <th 
                            className="clickable"
                            key={column.path} 
                        >
                            {column.label} 
                        </th>    
                    )}
                </tr>  
        </thead> 
        
        );
    }
}
 
export default CalendarHeader;