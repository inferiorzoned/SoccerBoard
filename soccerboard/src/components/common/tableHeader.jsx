import React, { Component } from 'react';

//columnNames
//onSort function
//sortColumn

class TableHeader extends Component {

    state = {  }


    raiseSort = path => {
        if(!path) {
            console.log("none"); // so that there is no sorting raised based on a column
                                   // with no path 
            return null;
        }
        console.log('sorting on ',path);
        const sortColumn = {...this.props.sortColumn};
        if( sortColumn.path === path ){
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        }
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = column => {
        const { sortColumn } = this.props;
        if(column.path !== sortColumn.path){
            return null;
        }

        if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
        return <i className="fa fa-sort-desc"></i>;
    }

    render() { 

        const { className, columns, sortOn } = this.props;
        return ( 
        <thead>
            <tr className={className}>
                {columns.map( column => 
                    <th 
                        className={column['className'] ? className['className'] : ""}
                        key={column.path || column.key } 
                        onClick={() => {
                            if(sortOn)  this.raiseSort(column.path);
                        }}
                    >
                        {column.label} {sortOn && this.renderSortIcon(column)}
                    </th>    
                )}
            </tr>  
        </thead>
        );
    }
}
 
export default TableHeader;