import React, { Component } from 'react';
import _ from 'lodash';


class TableBody extends Component {
    state = {  }
    
    //to work with the dynamic cells we can code like this
    renderCell = (item, column) => {
        if(column.content) return column.content(item);

        return _.get(item, column.path);
    }


    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }

    render() { 
        const { data, columns, className } = this.props;
        var cont = 0;
        return ( 
            <tbody className={className}>
                {data.map( item => 
                    <tr 
                        key={item._id} 
                        className={(cont++)%2==0?"":"tablerow"}>
                        {columns.map( column => 
                            <td 
                                key={this.createKey(item, column)}
                                className={column['className'] ? column['className'] : ""}
                            >
                                {this.renderCell(item, column)}
                            </td>    
                        )}
                    </tr>
                )}
            </tbody>
        );
    }
}
 
export default TableBody;