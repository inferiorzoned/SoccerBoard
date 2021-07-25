import React, { Component } from "react";
import SideBar from "../components/sideBar";
import InventoryList from "../components/inventoryList";
import InfoSidebar from "../components/commons/infoSidebar";
import InventoryItemInfo from "../components/inventoryItemInfo";
// import EditInventoryPopup from "../components/editInventoryPopup";
import AddInventoryPopup from "../components/addInventoryPopup";
import todayDate from "../components/commons/todayDate";

class Inventory extends Component {
  state = {
    // create an array named item of objects containing itemLabel and quantity
    items: [
      {
        itemLabel: "Ball",
        quantity: 7,
        models: [
          {
            avatar: "aufau",
            modelLabel: "1",
            "last purchased date": "2019-10-07",
            "last purchased qty": 2,
            "total quantity": 7,
          },
          {
            avatar: "aufau",
            modelLabel: "2",
            "last purchased date": "2021-01-21",
            "last purchased qty": 5,
            "total quantity": 7,
          },
        ],
      },
      { itemLabel: "Training Kits", quantity: 6, models: [] },
      { itemLabel: "Cones", quantity: 10, models: [] },
    ],
    inventoryInfoHeading: [
      { key: "last purchased date", label: "Last Purchased Date" },
      { key: "last purchased qty", label: "Last Purchased Quantity" },
      { key: "total quantity", label: "Total Quantity" },
    ],
    comments: "",

    showItemInfo: false,
    title: "",
    defaultModelNo: 0,
    currentItemNo: 0,
    comments: "",
    showEditPopup: false,
    sortColumn: { path: "itemLabel", order: "asc" },
  };

  onRowClicked = (row) => {
    // map throuh items and find the one with the same itemLabel as the row clicked and assign it to currentItem
    const currentItem = this.state.items.find(
      (i) => i.itemLabel === row.itemLabel
    );
    this.setState({ currentItem });
    this.setState({ title: row.itemLabel });
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

  addItem = (
    itemLabel,
    modelQty,
    modelAvatar,
    modelLabel,
    modelPurchasedDate,
    toAddQty = true,
    prevModelLabel
  ) => {
    // check if itemLabel exists in items array as itemLabel, if dound change its attributes inside items
    // else create a new object and add it to items array
    const { items } = this.state;
    const itemExists = items.find((i) => i.itemLabel === itemLabel);
    console.log(itemExists);
    if (itemExists) {
      itemExists.quantity = toAddQty
        ? itemExists.quantity + modelQty
        : itemExists.quantity;
      // itemExists.quantity = parseInt(itemExists.quantity) + parseInt(modelQty);
      // check if model exists in models array as modelLabel, if found edit last purchased date and quantity
      // else add new model to models array
      let modelExists;
      if (toAddQty) {
        modelExists = itemExists.models.find(
          (m) => m.modelLabel === modelLabel
        );
      } else {
        modelExists = itemExists.models.find(
          (m) => m.modelLabel === prevModelLabel
        );
      }
      if (modelExists) {
        modelExists["modelLabel"] = modelLabel;
        modelExists["last purchased date"] = modelPurchasedDate;
        modelExists["last purchased qty"] = modelQty;
        modelExists["total quantity"] = itemExists.quantity;
      } else {
        itemExists.models.push({
          avatar: modelAvatar,
          modelLabel: modelLabel,
          "last purchased date": modelPurchasedDate,
          "last purchased qty": modelQty,
          "total quantity": itemExists.quantity,
        });
      }
    } else {
      items.push({
        itemLabel: itemLabel,
        quantity: modelQty,
        models: [
          {
            avatar: modelAvatar,
            modelLabel: modelLabel,
            "last purchased date": modelPurchasedDate,
            "last purchased qty": modelQty,
            "total quantity": modelQty,
          },
        ],
      });
    }
    this.setState({ items });
  };

  onSubmitEditInventory = (data, toAddQty = true, prevModelLabel) => {
    const objectData = {
      ...data,
      itemLabel: {
        label: data.itemLabel,
        value: data.itemLabel.toLowerCase(),
      },
      modelLabel: {
        label: data.modelLabel,
        value: data.modelLabel.toLowerCase(),
      },
    };
    if (!("purchaseDate" in data || "last purchased date" in data)) {
      objectData["purchaseDate"] = todayDate;
    }
    this.addItem(
      objectData.itemLabel.label,
      objectData.quantityValue || objectData["last purchased qty"],
      objectData.avatar,
      objectData.modelLabel.label,
      objectData.purchaseDate || objectData["last purchased date"],
      toAddQty,
      prevModelLabel
    );
    console.log(objectData);
    this.handleSetPopup(false);
  };

  handleDeleteItem = (row) => {
    const items = this.state.items.filter((i) => row.itemLabel !== i.itemLabel);
    this.setState({ items });
  };

  handleEditModel = (data, prevModel) => {
    console.log(data, prevModel);
    // for all keys in prevModel object, if the key is not in data, add the key-value pair to data
    Object.keys(prevModel).forEach((key) => {
      if (!(key in data)) {
        data[key] = prevModel[key];
      }
    });
    const prevModelLabel = prevModel.modelLabel;
    // data["last purchased qty"] -= prevModel["last purchased qty"];
    console.log(data);
    this.onSubmitEditInventory(data, false, prevModelLabel);
    this.setState({ showItemInfo: false });
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
    const itemName = item.itemLabel;
    const itemQty = item.quantity;
    const itemLastPurchasedDate = item["last purchased date"];
    const itemLastPurchasedQty = item["last purchased qty"];
    const itemTotalQuantity = item["total quantity"];
    const itemAvatar = item["avatar"];
    const itemInfo = {
      itemLabel: itemName,
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
            onDelete={this.handleDeleteItem}
          />
          {/* create an blue colored button named add items change color to dark blue in hover*/}
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
              data={
                currentItem["models"] && currentItem["models"][defaultModelNo]
              }
              leftOnClick={this.leftOnClick}
              rightOnClick={this.rightOnClick}
              handleEditModel={this.handleEditModel}
            />
          </div>
        )}

        {showEditPopup && (
          <AddInventoryPopup
            allItems={items}
            setPopup={this.handleSetPopup}
            onSubmitEditInventory={this.onSubmitEditInventory}
          />
        )}
      </div>
    );
  }
}

export default Inventory;
