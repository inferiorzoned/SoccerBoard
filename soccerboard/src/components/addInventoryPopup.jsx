import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import todayDate from "./commons/todayDate";
import DateTimePicker from "./commons/dateTime";

class AddInventoryPopup extends Form {
  state = {
    data: {},
    errors: {},
    schema: {
      itemLabel: Joi.string().required().label("Select Item"),
      modelLabel: Joi.string().required().label("Select Model"),
      quantityValue: Joi.number().min(0).label("Quantity"),
    },
    modelsDisabled: true,
    modelsItemLabel: "",
    othersDisabled: true,
    modelLabel: "",
    purchaseDate: "",
  };

  setData = (propData) => {
    this.setState({ data: propData });
  };

  renderItemArray = (allItems) => {
    const itemArray = [];
    for (let i = 0; i < allItems.length; i++) {
      itemArray.push({
        label: allItems[i].itemLabel,
        value: allItems[i].itemLabel,
      });
    }
    return itemArray;
  };

  renderModelsArray = (allItems) => {
    // take all the models's labels into an array, where items's label is modelsItemLabel
    const modelArray = [];
    for (let i = 0; i < allItems.length; i++) {
      if (
        this.state.modelsItemLabel.toLocaleLowerCase() ===
        allItems[i].itemLabel.toLowerCase()
      ) {
        // iterrate through models object of allItems[i] and add it to modelArray with label as models label and lowercase label as value
        for (let key in allItems[i].models) {
          modelArray.push({
            label: allItems[i].models[key].modelLabel,
            value: allItems[i].models[key].modelLabel,
          });
        }
      }
    }
    // console.log(modelArray);
    return modelArray;
  };

  myhandleSelectChangeItem = (value, { name }) => {
    if (value == null) return;
    if (typeof value[Symbol.iterator] === "function")
      value = [...value.entries()];
    else value = value.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name: name, value: value });
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };

    data[name] = value;

    this.setState({ data, errors });
    // this.handleSelectChange(value, { name });
    // console.log(value);
    this.setState({ modelsDisabled: false });
    this.setState({ modelsItemLabel: value });
    // console.log(this.state.modelsDisabled);
  };

  myhandleSelectChangeModel = (value, { name }) => {
    if (value == null) return;
    if (typeof value[Symbol.iterator] === "function")
      value = [...value.entries()];
    else value = value.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name: name, value: value });
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };

    data[name] = value;
    console.log(name, value);

    this.setState({ data, errors });
    // this.handleSelectChange(value, { name });
    // console.log(value);
    this.setState({ othersDisabled: false });
    this.setState({ modelLabel: value });
    // console.log(this.state.modelsDisabled);
  };

  myhandlePurchaseDate = (e) => {
    const data = { ...this.state.data };
    data["purchaseDate"] = e.target.value;
    this.setState({ data });
  };

  myHandleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          data: {
            ...this.state.data,
            avatar: reader.result,
            imageFile: file,
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { setPopup, allItems, onSubmitEditInventory } = this.props;
    const { data, modelsDisabled, othersDisabled, modelsItemLabel } =
      this.state;
    // console.log(modelsItemLabel);
    // console.log(modelsDisabled);

    // this.renderModelsArray(allItems);
    return (
      <div className="trainee-popup">
        <button className="popup-x" onClick={() => setPopup(false)}>
          X
        </button>
        <div className="col-sm-8">
          {this.renderSelect(
            "itemLabel",
            "Select Item",
            this.renderItemArray(allItems),
            false,
            false,
            true,
            this.myhandleSelectChangeItem
          )}
        </div>
        <div className="col-sm-8">
          {this.renderSelect(
            "modelLabel",
            "Select Model",
            this.renderModelsArray(allItems),
            false,
            modelsDisabled,
            true,
            this.myhandleSelectChangeModel
          )}
        </div>
        <div className="col-sm-8">
          <div className="image-holder m-2">
            <img
              src={this.state.data.avatar}
              alt=""
              id="img"
              className="img-thumbnail"
            />
            <label htmlFor="image-input" className="btn btn-maroon m-2">
              Choose Model Picture
            </label>
            <input
              className="btn btn-maroon m-3"
              type="file"
              accept="image/*"
              name="image-upload"
              id="image-input"
              onChange={this.myHandleImage}
              hidden
              disabled={othersDisabled}
            />
          </div>
        </div>
        <div className="col-sm-8">
          {this.renderInput(
            "quantityValue",
            "Quantity",
            "number",
            othersDisabled
          )}
        </div>
        <div className="col-sm-8">
          <DateTimePicker
            changeHandler={this.myhandlePurchaseDate}
            id={"date"}
            label={"Purchase Date"}
            type={"date"}
            defaultValue={todayDate}
            isDisabled={othersDisabled}
            disableFuture
          />
        </div>
        <div className="pu-content-container my-3">
          <button
            className="btn btn-green-dark"
            onClick={() => onSubmitEditInventory(data)}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddInventoryPopup;
