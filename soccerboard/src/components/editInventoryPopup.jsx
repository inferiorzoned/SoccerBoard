import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";

class EditInventoryPopup extends Form {
  state = {
    data: {},
    errors: {},
    schema: {
      label: Joi.string().required().label("Select Item"),
      
    },
    modelsDisabled: true,
    modelsItemLabel: "",
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
    console.log(name);
    console.log(value);
    console.log(data);

    this.setState({ data, errors });
    this.setState({ modelsDisabled: false });
    this.setState({ modelsItemLabel: value });
    console.log(this.state.modelsDisabled);
  };

  render() {
    const { setPopup, allItems } = this.props;
    const { modelsDisabled } = this.state;
    console.log(modelsDisabled);

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
        {this.state.data && <h3>testing data</h3>}
        <div className="col-sm-8">
          {this.renderSelect(
            "modelsItemLabel",
            "Select Model",
            this.renderModelsArray(allItems),
            false,
            modelsDisabled,
            true
          )}
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
