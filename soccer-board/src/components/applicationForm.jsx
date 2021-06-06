import React from "react";
import Joi from "joi-browser";
import Form from "./commons/form";

class ApplicationForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      mobile: "",
      age: "",
      height: "",
      weight: "",
      proLevel: "",
      institution: "",
      prefFoot: "",
      prefPos: "",
      profileImg: "https://objex.tech/assets/img/faces/placeholder.jpg",
    },
    proLevels: [
      {
        value: "student",
        label: "Student",
      },
      {
        value: "professional",
        label: "Professional",
      },
      {
        value: "ameteur",
        label: "Ameteur",
      },
    ],
    institutions: [
      { value: "BUET", label: "BUET" },
      { value: "DU", label: "DU" },
      { value: "CUET", label: "CUET" },
    ],
    prefFoots: [
      { value: "right", label: "Right" },
      { value: "left", label: "Left" },
      { value: "both", label: "Both" },
    ],
    prefPositions: [
      { value: "gk", label: "GK" },
      { value: "rb", label: "RB" },
      { value: "rcb", label: "RCB" },
      { value: "cb", label: "CB" },
      { value: "lcb", label: "LCB" },
      { value: "lb", label: "LB" },
      { value: "rm", label: "RM" },
      { value: "cdm", label: "CDM" },
      { value: "cm", label: "CM" },
      { value: "lm", label: "LM" },
      { value: "cam", label: "CAM" },
      { value: "rw", label: "RW" },
      { value: "st", label: "ST" },
      { value: "lw", label: "LW" },
    ],
    staffPositions: [
      { value: "assistant-manager", label: "Assistant Manager" },
      { value: "inventory-manager", label: "Inventory Manager" },
      { value: "nutritionist", label: "Nutritionist" },
    ],
    options: [
      { _id: "player", value: "player", label: "Player Application Form" },
      { _id: "staff", value: "staff", label: "Staff Application Form" },
    ],
    selectedOption: "player",
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().label("Email"),
    mobile: Joi.string()
      .min(10)
      .max(14)
      .regex(/^[0-9]+$/)
      .required()
      .label("Mobile"),
    age: Joi.number().integer().min(0).max(50).required().label("Age"),
    height: Joi.number().min(0).label("Height"),
    weight: Joi.number().min(0).label("Weight"),
    proLevel: Joi.string().required().label("Professional Level"),
    institution: Joi.string().required().label("Institution/Organization"),
    prefFoot: Joi.string().required().label("Preferred Foot"),
    prefPos: Joi.array().min(1).required().label("Preferred Position"),
    staffPos: Joi.string().required().label("Staff Position"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          data: { ...this.state.data, profileImg: reader.result },
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const {
      proLevels,
      prefFoots,
      prefPositions,
      institutions,
      staffPositions,
      selectedOption,
    } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-auto bg-light sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
              {this.renderRadio("formType", false)}
            </div>
          </div>
          <div className="col-sm p-3 min-vh-100">
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-4 text-center">
                    <div className="image-holder m-2">
                      <img
                        src={this.state.data.profileImg}
                        alt=""
                        id="img"
                        className="img-thumbnail"
                      />
                      <label
                        htmlFor="image-input"
                        className="btn btn-maroon m-2"
                      >
                        CHOOSE PROFILE PICTURE
                      </label>
                      <input
                        className="btn btn-maroon m-3"
                        type="file"
                        accept="image/*"
                        name="image-upload"
                        id="image-input"
                        onChange={this.handleImage}
                        hidden
                      />
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="row mt-5">
                      <div className="col">
                        {this.renderInput("name", "Name")}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        {this.renderInput("email", "Email", "email")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    {this.renderInput("age", "Age", "number")}
                  </div>
                  <div className="col-sm-4">
                    {this.renderInput("mobile", "Mobile", "number")}
                  </div>
                  <div className="col-sm-4">
                    {this.renderSelect(
                      "proLevel",
                      "Professional Level",
                      proLevels
                    )}
                  </div>
                </div>
                <div className="row">
                  {selectedOption === "player" && (
                    <React.Fragment>
                      <div className="col-sm-4">
                        {this.renderInput("height", "Height", "number")}
                      </div>
                      <div className="col-sm-4">
                        {this.renderInput("weight", "Weight", "number")}
                      </div>
                    </React.Fragment>
                  )}
                  {selectedOption === "staff" && (
                    <React.Fragment>
                      <div className="col-sm-8">
                        {this.renderSelect(
                          "staffPos",
                          "Staff Position",
                          staffPositions
                        )}
                      </div>
                    </React.Fragment>
                  )}
                  <div className="col-sm-4">
                    {this.renderSelect(
                      "institution",
                      "Institution/Organization",
                      institutions
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    {selectedOption === "player" &&
                      this.renderSelect(
                        "prefPos",
                        "Preferred Position",
                        prefPositions,
                        true
                      )}
                  </div>
                  <div className="col-sm-4">
                    {selectedOption === "player" &&
                      this.renderSelect(
                        "prefFoot",
                        "Preferred Foot",
                        prefFoots
                      )}
                  </div>
                </div>

                <div className="text-center py-3">
                  {this.renderButton("APPLY", null)}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationForm;
