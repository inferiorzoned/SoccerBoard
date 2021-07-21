import React, { Component } from "react";
import SideBar from "../components/sideBar";
import InventoryList from "../components/inventoryList";
import InfoSidebar from "../components/commons/infoSidebar";
import InventoryItemInfo from "../components/inventoryItemInfo";
import EditInventoryPopup from "../components/editInventoryPopup";

class Inventory extends Component {
  state = {
    // create an array named item of objects containing label and quantity
    items: [
      {
        label: "Ball",
        quantity: 7,
        models: [
          {
            avatar: "aufau",
            label: "1",
            "last purchased date": "7/10/2019",
            "last purchased qty": "2",
            "total quantity": "7",
          },
          {
            avatar: "aufau",
            label: "2",
            "last purchased date": "21/1/2021",
            "last purchased qty": "5",
            "total quantity": "7",
          },
        ],
      },
      { label: "Training Kits", quantity: 6 },
      { label: "Cones", quantity: 10 },
    ],
    inventoryInfoHeading: [
      { key: "last purchased date", label: "Last Purchased Date" },
      { key: "last purchased qty", label: "Last Purchased Quantity" },
      { key: "total quantity", label: "Total Quantity" },
    ],

    showItemInfo: false,
    title: "",
    defaultModelNo: 0,
    currentItemNo: 0,
    comments: "",
    showEditPopup: false,
    sortColumn: { path: "label", order: "asc" },
  };

  onRowClicked = (row) => {
    // map throuh items and find the one with the same label as the row clicked and assign it to currentItem
    const currentItem = this.state.items.find((i) => i.label === row.label);
    this.setState({ currentItem });
    this.setState({ title: row.label });
    this.setState({ showItemInfo: !this.state.showItemInfo });
  };

  leftOnClick = () => {
    // decrease defaultModelNo by 1 if it is not 1
    const { defaultModelNo } = this.state;
    if (defaultModelNo !== 0) {
      this.setState({ defaultModelNo: defaultModelNo - 1 });
    } else {
      const { currentItem } = this.state;
      const { models } = currentItem;
      this.setState({ defaultModelNo: models.length - 1 });
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
    // increase defaultModelNo by 1 if it is not the length of currentItem[models]
    const { currentItem, defaultModelNo } = this.state;
    const { models } = currentItem;
    if (defaultModelNo < models.length - 1) {
      this.setState({ defaultModelNo: defaultModelNo + 1 });
    } else {
      this.setState({ defaultModelNo: 0 });
    }
  };

  handleSetPopup = (isPopup) => {
    this.setState({ showEditPopup: isPopup });
  };

  onSaveClick = () => {
    // save the item to the database
    const { items } = this.state;
    const { defaultModelNo } = this.state;
    const { inventoryInfoSidebardata } = this.state;
    const { title } = this.state;
    const { comments } = this.state;
    const { inventoryInfoHeading } = this.state;
    const { sortColumn } = this.state;
    const item = items[defaultModelNo - 1];
    const itemName = item.label;
    const itemQty = item.quantity;
    const itemLastPurchasedDate = item["last purchased date"];
    const itemLastPurchasedQty = item["last purchased qty"];
    const itemTotalQuantity = item["total quantity"];
    const itemAvatar = item["avatar"];
    const itemInfo = {
      label: itemName,
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
      defaultModelNo,
      showEditPopup,
      currentItem,
    } = this.state;
    return (
      <div className="row">
        <div className="col-sm-2">
          <SideBar page="inventory" />
        </div>
        <div className="col-sm-8 ">
          <InventoryList
            items={items}
            sortColumn={sortColumn}
            onRowClicked={this.onRowClicked}
            className="d-flex justify-content-center mt-4"
          />
          {/* create an blue colored button named edit details change color to dark blue in hover*/}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => this.handleSetPopup(true)}
            >
              Add Items(s)
            </button>
          </div>
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
              // data={inventoryInfoSidebardata[title][defaultModelNo]}
              data={
                currentItem["models"] && currentItem["models"][defaultModelNo]
              }
              leftOnClick={this.leftOnClick}
              rightOnClick={this.rightOnClick}
            />
          </div>
        )}

        {showEditPopup && (
          <EditInventoryPopup allItems={items} setPopup={this.handleSetPopup} />
        )}
      </div>
    );
  }
}

export default Inventory;
