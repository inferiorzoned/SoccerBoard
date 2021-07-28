import React, { Component } from "react";
import Table from "./commons/table";

class InventoryList extends Component {
  state = {};
  columns = [
    {
      path: "items",
      label: "Items",
      content: (item) => <div>{item.itemLabel}</div>,
    },
    {
      path: "quantity",
      label: "Quantity",
      content: (item) => <div>{item.quantity}</div>,
    },
  ];

  render() {
    const { items, sortColumn, onRowClicked, onDelete } = this.props;
    return (
      <div className="row">
        <div className="d-flex justify-content-center mt-4">
          <div className="table trainee-table">
            <Table
              columns={this.columns}
              data={items}
              sortColumn={sortColumn}
              onRowClicked={onRowClicked}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryList;
