import React from "react";

const SquadTable = ({ players, playerType }) => {
  const classes =
    playerType === "reserved"
      ? "squad-table squad-table-maroon squad-table-horizontal squad-table-highlight"
      : "squad-table squad-table-green squad-table-horizontal squad-table-highlight";
  return (
    <table className={classes}>
      <thead>
        <th>Kit</th>
        <th>Position</th>
        <th>Name</th>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player._id}>
            <td>{player.kit}</td>
            <td>{player.position}</td>
            <td>{player.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SquadTable;
