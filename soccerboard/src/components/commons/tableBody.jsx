import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns, onRowClicked, onDelete } = this.props;

    return (
      <>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="tableRow">
              {columns.map((column) => (
                <td
                  key={this.createKey(item, column)}
                  onClick={() => onRowClicked(item)}
                >
                  {this.renderCell(item, column)}
                </td>
              ))}
              {/* create a button named delete onclick deleteItem */}
              {onDelete && (
                <td key={item._id}>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </>
    );
  }
}

export default TableBody;
