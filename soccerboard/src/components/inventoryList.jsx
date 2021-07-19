import React, { Component } from "react";
import Table from "./commons/table";

class InventoryList extends Component {
  state = {};
  columns = [
    {
      path: "items",
      label: "Items",
      content: (item) => <div>{item.name}</div>,
    },
    {
      path: "quantity",
      label: "Quantity",
      content: (item) => <div>{item.quantity}</div>,
    },
  ];

  render() {
    const { items, sortColumn, onRowClicked } = this.props;
    return (
      <div className="row">
        <div className="col-sm-10 d-flex justify-content-center align-content-center">
          <div className="itemTable">
            <Table
              columns={this.columns}
              data={items}
              sortColumn={sortColumn}
              onRowClicked={onRowClicked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryList;
