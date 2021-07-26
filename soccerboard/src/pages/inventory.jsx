import React, { Component } from "react";
import SideBar from "../components/sideBar";
import InventoryList from "../components/inventoryList";
import InfoSidebar from "../components/commons/infoSidebar";
import InventoryItemInfo from "../components/inventoryItemInfo";
// import EditInventoryPopup from "../components/editInventoryPopup";
import AddInventoryPopup from "../components/addInventoryPopup";
import todayDate from "../components/commons/todayDate";
import LoaderSoccer from "../components/commons/loader";

import {
  getAllItems,
  getLatestItems,
  uploadItems,
  uploadImage,
} from "../services/inventoryServices";

class Inventory extends Component {
  state = {
    // create an array named item of objects containing itemLabel and quantity
    // items: [
    // {
    //   itemLabel: "Ball",
    //   quantity: 10,
    //   models: [
    //     {
    //       avatar: "aufau",
    //       modelLabel: "1",
    //       lastPurchasedDate: "2019-10-07",
    //       lastPurchasedQty: 2,
    //       totalQuantity: 7,
    //     },
    //     {
    //       avatar: "aufau",
    //       modelLabel: "2",
    //       lastPurchasedDate: "2021-01-21",
    //       lastPurchasedQty: 5,
    //       totalQuantity: 7,
    //     },
    //   ],
    // },
    // { itemLabel: "Training Kits", quantity: 6, models: [] },
    // { itemLabel: "Cones", quantity: 10, models: [] },
    // ],
    inventoryInfoHeading: [
      { key: "lastPurchasedDate", label: "Last Purchased Date" },
      { key: "lastPurchasedQty", label: "Last Purchased Quantity" },
      // { key: "totalQuantity", label: "Total Quantity" },
    ],
    comments: "",

    showItemInfo: false,
    title: "",
    defaultModelNo: 0,
    currentItemNo: 0,
    comments: "",
    showEditPopup: false,
    sortColumn: { path: "itemLabel", order: "asc" },
    errors: {},
  };

  async componentDidMount() {
    const inventoryItems = await getLatestItems();
    console.log(inventoryItems);
    const items = inventoryItems.items;
    console.log(items);
    this.setState({ items });
    console.log(this.state.items);
  }

  onRowClicked = (row) => {
    // map throuh items and find the one with the same itemLabel as the row clicked and assign it to currentItem
    const currentItem = this.state.items.find(
      (i) => i.itemLabel === row.itemLabel
    );
    // console.log(currentItem);
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

  addItem = async (
    itemLabel,
    modelQty,
    modelAvatar,
    modelLabel,
    modelPurchasedDate,
    toAddQty = true,
    prevModelLabel,
    data
  ) => {
    // check if itemLabel exists in items array as itemLabel, if dound change its attributes inside items
    // else create a new object and add it to items array
    const { items } = this.state;
    const itemExists = items.find((i) => i.itemLabel === itemLabel);
    console.log(itemExists);
    if (itemExists) {
      itemExists.quantity = toAddQty
        ? parseInt(itemExists.quantity) + parseInt(modelQty)
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
        modelExists["lastPurchasedDate"] = modelPurchasedDate;
        modelExists["lastPurchasedQty"] = modelQty;
      } else {
        const { imageFile } = data;
        const { mediaUrl } = await uploadImage(imageFile);
        data[mediaUrl] = mediaUrl;
        itemExists.models.push({
          avatar: data[mediaUrl] || modelAvatar,
          modelLabel: modelLabel,
          lastPurchasedDate: modelPurchasedDate,
          lastPurchasedQty: modelQty,
        });
        console.log(itemExists);
      }
    } else {
      const { imageFile } = data;
      const { mediaUrl } = await uploadImage(imageFile);
      data[mediaUrl] = mediaUrl;
      items.push({
        itemLabel: itemLabel,
        quantity: modelQty,
        models: [
          {
            avatar: data[mediaUrl] || modelAvatar,
            modelLabel: modelLabel,
            lastPurchasedDate: modelPurchasedDate,
            lastPurchasedQty: modelQty,
          },
        ],
      });
    }
    this.setState({ items });
  };

  onSubmitEditInventory = (data, toAddQty = true, prevModelLabel = "") => {
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
    if (!("purchaseDate" in data || "lastPurchasedDate" in data)) {
      objectData["purchaseDate"] = todayDate;
    }
    this.addItem(
      objectData.itemLabel.label,
      objectData.quantityValue || objectData["lastPurchasedQty"],
      objectData.avatar,
      objectData.modelLabel.label,
      objectData.purchaseDate || objectData["lastPurchasedDate"],
      toAddQty,
      prevModelLabel,
      data
    );
    console.log(objectData);
    this.handleSetPopup(false);
  };

  handleDeleteItem = (row) => {
    const items = this.state.items.filter((i) => row.itemLabel !== i.itemLabel);
    this.setState({ items });
  };

  handleEditModel = async (data, prevModel) => {
    console.log(data, prevModel);
    // for all keys in prevModel object, if the key is not in data, add the key-value pair to data

    Object.keys(prevModel).forEach((key) => {
      if (!(key in data)) {
        data[key] = prevModel[key];
      }
    });
    const prevModelLabel = prevModel.modelLabel;

    const { imageFile } = data;
    const { mediaUrl } = await uploadImage(imageFile);
    data[mediaUrl] = mediaUrl;
    // data["last purchased qty"] -= prevModel["last purchased qty"];
    console.log(data);
    this.onSubmitEditInventory(data, true, prevModelLabel);
    this.setState({ showItemInfo: false });
  };

  onSaveClick = async () => {
    console.log(this.state);
    const items = this.state.items;
    // console.log(items);
    const comments = this.state.comments;
    console.log(items);

    const inventoryItems = {
      items: items,
      comment: comments,
    };
    console.log(inventoryItems);
    await uploadItems(inventoryItems);
    // clear items and comments and currentModelNo 0 and defaultModel 0
    this.setState({comments: "", currentItemNo: 0, defaultModelNo: 0});
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
    if (items) {
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
            {this.state.errors.comments && (
              <div className="alert alert-danger">
                {this.state.errors.comments}
              </div>
            )}
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
    return (
      <div className="centered">
        <LoaderSoccer />
      </div>
    );
    // return null;
  }
}

export default Inventory;
