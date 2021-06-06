import React, { Component } from 'react';
//import auth from '../services/authService';
import { Link } from 'react-router-dom';
//import Like from './common/like';
import Table from './common/table';



class SquadTable extends Component {
    columns = [
        { path: 'pos', label: 'Pos' },
        { 
            path: 'name', 
            label: 'Name',
            content: player => (
                <Link 
                    to={`/players/${player._id}`}>
                    {player.name}
                </Link>
            )
        },
        {   
            path: 'kit', 
            label: 'Kit',
            className: 'tablecolumn',
            content: player => (
                <b 
                    //to={`/movies/${movie._id}`}
                    className="kit"
                >
                    {player.kit}
                </b>
            )
        },
        { path: 'injuryStatus', label: 'Injury Status', className: 'tablecolumn' },
        { path: 'comments', label: 'Comments', className: 'tablecolumn' }
            
    ]//as the columns are never going to change, we need to set the delete button only in 
    //case of an admin, it's done in the constructor

    // deleteColumn = { 
    //     key: 'delete', 
    //     content: movie => (
    //         <button 
    //             className="btn btn-danger btn-sm"
    //             onClick={() => this.props.onDelete(movie)}>
    //                 Delete
    //         </button>
    //     )
    // }

    constructor(){
        super();
        // const user = auth.getCurrentUser();
        // if(user && user.isAdmin){
        //     this.columns.push(this.deleteColumn);
        // }
    }
    
    render() { 
        //whenever we click on a column it's the table's responsibility to let us know
        // the sorting path
        const { players} = this.props;
        return ( 
            <div>
                <br></br>
                <Table 
                bodyClass="tablebody"
                headerClass="tableheader"
                columns={this.columns}
                data={players}
                sortColumn={'kit'} 
            />
            </div>
        );
    }
}
 
export default SquadTable;
