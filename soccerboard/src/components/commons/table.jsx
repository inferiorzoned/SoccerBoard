import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {
    const { columns, sortColumn, onSort, data, bodyClass, headerClass } = props;
    return ( 
        <table className="table">
            <TableHeader 
                className={headerClass ? headerClass : ""}
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />

            <br></br>

            <TableBody 
                className={bodyClass ? bodyClass : ""}
                data={data}
                columns={columns}
            />
        
        </table>
    );
}
 
export default Table;