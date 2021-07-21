import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import todayDate from "./commons/todayDate";
import DateTimePicker from "./commons/dateTime";

class EditInventoryPopup extends Form {
  state = {
    data: {},
    errors: {},
    schema: {
      label: Joi.string().required().label("Select Item"),
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
        label: allItems[i].label,
        value: allItems[i].label.toLowerCase(),
      });
    }
    return itemArray;
  };

  renderModelsArray = (allItems) => {
    // take all the models's labels into an array, where items's label is modelsItemLabel
    const modelArray = [];
    for (let i = 0; i < allItems.length; i++) {
      if (this.state.modelsItemLabel === allItems[i].label.toLowerCase()) {
        // iterrate through models object of allItems[i] and add it to modelArray with label as models label and lowercase label as value
        for (let key in allItems[i].models) {
          modelArray.push({
            label: allItems[i].models[key].label,
            value: allItems[i].models[key].label.toLowerCase(),
          });
        }
      }
    }
    // console.log(modelArray);
    return modelArray;
  };

  onSubmitEditInventory = () => {
    // alert("pressed");
    console.log("hello");
    const { ...data } = this.state.data;
    console.log(data);
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

  render() {
    const { setPopup, allItems } = this.props;
    const { modelsDisabled, othersDisabled, modelsItemLabel } = this.state;
    // console.log(modelsItemLabel);
    // console.log(modelsDisabled);

    // this.renderModelsArray(allItems);
    return (
      <div className="traineePopup">
        <button className="popup-x" onClick={() => setPopup(false)}>
          X
        </button>
        <div className="col-sm-8">
          {this.renderSelect(
            "label",
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
            label={"End Date"}
            type={"date"}
            defaultValue={todayDate}
            isDisabled={othersDisabled}
          />
        </div>
        <div className="pu-content-container">
          <button
            className="pu-button-prop"
            onClick={this.onSubmitEditInventory}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default EditInventoryPopup;
