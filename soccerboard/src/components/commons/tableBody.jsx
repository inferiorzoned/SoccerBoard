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
    const {
      data,
      columns,
      onRowClicked,
      onRowCtrlClicked,
      selectedItems,
      selectedRowClassName,
      themeClassName,
    } = this.props;
    const selectedRowClass = selectedRowClassName + "-" + themeClassName;
    return (
      <tbody>
        {data.map((item) => (
          <tr
            key={item._id}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) return onRowCtrlClicked(item);
              if (onRowClicked) onRowClicked(item);
            }}
            className={
              selectedItems && selectedItems.find((p) => p._id === item._id)
                ? selectedRowClass
                : null
            }
          >
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
