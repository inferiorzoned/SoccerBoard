import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import DateTimePicker from "./commons/dateTime";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class EditInventoryModel extends Form {
  state = {
    data: {},
    errors: {},
    schema: {
      itemLabel: Joi.string().required().label("Select Item"),
      modelLabel: Joi.string().required().label("Select Model"),
      quantityValue: Joi.number().min(0).label("Quantity"),
    },
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

  myhandlePurchaseDate = (e) => {
    console.log(e);
    const d = `${e.getFullYear()}-${
      (e.getMonth() + 1 > 9 ? "" : "0") + (e.getMonth() + 1)
    }-${(e.getDate() > 9 ? "" : "0") + e.getDate()}`;
    const data = { ...this.state.data };
    data["purchaseDate"] = d;
    this.setState({ data });
    console.log(data);
  };

  render() {
    const { title, infoHeading, modelData, handleEditModel } = this.props;
    modelData["itemLabel"] = title;
    return (
      <div className="sideBar" style={{ width: "300px", fontSize: "small" }}>
        <div>
          {this.renderInput("itemLabel", "Title", "text", false, title)}
        </div>
        <div className="image-holder m-1">
          <img
            src={this.state.data.avatar}
            alt=""
            id="img"
            className="img-thumbnail"
          />
          <label htmlFor="image-input" className="btn btn-maroon m-1">
            Choose Model Picture
          </label>
          <input
            className="btn btn-maroon mt-3"
            type="file"
            accept="image/*"
            name="image-upload"
            id="image-input"
            onChange={this.myHandleImage}
            hidden
          />
        </div>
        {this.renderInput(
          "modelLabel",
          "Model Name",
          "text",
          false,
          modelData.modelLabel
        )}
        {/* <DateTimePicker
          changeHandler={this.myhandlePurchaseDate}
          id={"date"}
          label={"Purchase Date"}
          type={"date"}
          defaultValue={modelData["last purchased date"]}
        /> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            color="secondary"
            style={{
              backgroundColor: "white",
              border: "2px solid red",
              borderRadius: "10px",
              paddingLeft: "10px",
            }}
            // autoOk
            label="Last Purchased Date"
            // format="yyyy-MM-dd"
            clearable
            disableFuture
            value={modelData["last purchased date"]}
            onChange={this.myhandlePurchaseDate}
          />
        </MuiPickersUtilsProvider>
        {this.renderInput(
          "quantityValue",
          "Quantity",
          "number",
          false,
          modelData["last purchased qty"]
        )}

        {/* cerate a button named save onclick to handleeditmodel(this.state.data, modeldata ) */}
        <button
          className="btn btn-primary"
          onClick={() => {
            handleEditModel(this.state.data, modelData, this.handle);
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

export default EditInventoryModel;
