import React, { Component } from "react";
import SideBar from "../components/sideBar";
import InventoryList from "../components/inventoryList";
import InfoSidebar from "../components/commons/infoSidebar";
import InventoryItemInfo from "../components/inventoryItemInfo";

class Inventory extends Component {
  state = {
    // create an array named item of objects containing name and quantity
    items: [
      { name: "Ball", quantity: 5 },
      { name: "Training Kits", quantity: 6 },
      { name: "Cones", quantity: 10 },
    ],
    inventoryInfoHeading: [
      { key: "last purchased date", label: "Last Purchased Date" },
      { key: "last purchased qty", label: "Last Purchased Quantity" },
      { key: "total quantity", label: "Total Quantity" },
    ],
    inventoryInfoSidebardata: {
      Ball: {
        1: {
          avatar: "aufau",
          name: "1",
          "last purchased date": "7/10/2020",
          "last purchased qty": "2",
          "total quantity": "5",
        },
        2: {
          avatar: "aufau",
          name: "2",
          "last purchased date": "21/1/2021",
          "last purchased qty": "2",
          "total quantity": "5",
        },
      },
    },

    showItemInfo: false,
    title: "",
    defaultItemNo: 1,
    comments: "",
    sortColumn: { path: "name", order: "asc" },
  };

  onRowClicked = (row) => {
    this.setState({ title: row.name });
    this.setState({ showItemInfo: !this.state.showItemInfo });
  };

  leftOnClick = () => {
    // decrease defaultItemNo by 1 if it is not 1
    const { defaultItemNo } = this.state;
    if (defaultItemNo !== 1) {
      this.setState({ defaultItemNo: defaultItemNo - 1 });
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  handleFormChange = (e) => {
    // update comments with e.currentTarget.value
    this.setState({ comments: e.currentTarget.value });
  };

  rightOnClick = () => {
    // increase defaultItemNo by 1 if it is not the last item of infosidebardata[title]
    const { defaultItemNo, title } = this.state;
    const { inventoryInfoSidebardata } = this.state;
    // find size of object inventoryInfoSidebardata[title]
    const len = Object.keys(inventoryInfoSidebardata[title]).length;
    console.log(len);
    if (defaultItemNo !== len) {
      this.setState({ defaultItemNo: defaultItemNo + 1 });
    }
  };

  onSaveClick = () => {
    // save the item to the database
    const { items } = this.state;
    const { defaultItemNo } = this.state;
    const { inventoryInfoSidebardata } = this.state;
    const { title } = this.state;
    const { comments } = this.state;
    const { inventoryInfoHeading } = this.state;
    const { sortColumn } = this.state;
    const item = items[defaultItemNo - 1];
    const itemName = item.name;
    const itemQty = item.quantity;
    const itemLastPurchasedDate = item["last purchased date"];
    const itemLastPurchasedQty = item["last purchased qty"];
    const itemTotalQuantity = item["total quantity"];
    const itemAvatar = item["avatar"];
    const itemInfo = {
      name: itemName,
      quantity: itemQty,
      "last purchased date": itemLastPurchasedDate,
      "last purchased qty": itemLastPurchasedQty,
      "total quantity": itemTotalQuantity,
      avatar: itemAvatar,
    };
    const newItem = {
      name: itemName,
      quantity: itemQty,
      "last purchased date": itemLastPurchasedDate,
      "last purchased qty": itemLastPurchasedQty,
      "total quantity": itemTotalQuantity,
      avatar: itemAvatar,
    };
  };

  render() {
    const {
      items,
      sortColumn,
      showItemInfo,
      title,
      inventoryInfoHeading,
      inventoryInfoSidebardata,
      defaultItemNo,
    } = this.state;
    return (
      <div className="row">
        <div className="col-sm-2">
          <SideBar page="inventory" />
        </div>
        <div className="col-sm-8">
          <InventoryList
            items={items}
            sortColumn={sortColumn}
            onRowClicked={this.onRowClicked}
          />
          {/* create a bootstrap form which will take multiline inputs */}
          <form
            className="form-horizontal m-2 "
            onSubmit={this.handleFormSubmit}
          >
            <div className="form-group">
              <label className="col-sm-2 control-label">Add Comments</label>
              <div className="col-sm-11">
                <textarea
                  className="form-control"
                  rows="4"
                  value={this.state.comments}
                  onChange={this.handleFormChange}
                />
              </div>
            </div>
          </form>
          {/* create a save button at middle of the page*/}
          <div className="d-flex justify-content-center">
            {/* <div className="col-sm-offset-2 col-sm-10"> */}
            <button className="btn btn-success" onClick={this.onSaveClick}>
              Save
            </button>
            {/* </div> */}
          </div>
        </div>

        {showItemInfo && (
          <div className="col-sm-2 d-flex flex-row-reverse">
            <InventoryItemInfo
              title={title}
              infoHeading={inventoryInfoHeading}
              data={inventoryInfoSidebardata[title][defaultItemNo]}
              leftOnClick={this.leftOnClick}
              rightOnClick={this.rightOnClick}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Inventory;
