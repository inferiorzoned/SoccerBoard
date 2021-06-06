import Joi from "joi-browser";
import React from "react";
import { Link } from "react-router-dom";
import { getApplicantionStatus } from "../services/status";
import Form from "./commons/form";
import SignupForm from "./signupForm";

class ApplicationStatusForm extends Form {
  state = {
    data: {
      email: "",
      mobile: "",
    },
    options: [
      { _id: "email", value: "email", label: "Email" },
      { _id: "mobile", value: "mobile", label: "Mobile" },
    ],
    selectedOption: "email",
    applicationStatus: {},
    errors: {},
  };

  schema = {
    email: Joi.string().email().label("Email"),
    mobile: Joi.string()
      .min(10)
      .max(14)
      .regex(/^[0-9]+$/)
      .required()
      .label("Mobile"),
  };

  fetchStatus = (e) => {
    this.handleSubmit(e);
    const { selectedOption, data } = this.state;
    const query = { [selectedOption]: data[selectedOption] };
    this.setState({ applicationStatus: getApplicantionStatus(query) });
  };

  renderInputField = () => {
    const { data, errors, selectedOption } = this.state;
    let name, label, error, value, type, placeholder;
    if (selectedOption === "email") {
      name = "email";
      label = "Email";
      type = "email";
      placeholder = "e.g. example@something.com";
    } else if (selectedOption === "mobile") {
      name = "mobile";
      label = "Mobile";
      type = "number";
      placeholder = "e.g. 018xxxxxxxx";
    }
    value = data[name];
    error = errors[name];

    const classes = error ? "form-control is-invalid" : "form-control";

    return (
      <div className="form-group p-2">
        <div className="row">
          <div className="col-sm-8">
            <label htmlFor={name} className="form-label">
              {label}
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 p-2">
            <input
              type={type}
              name={name}
              id={name}
              value={value}
              placeholder={placeholder}
              className={classes}
              onChange={this.handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <div className="col-sm-4 p-2">
            {this.renderButton("CHECK", this.fetchStatus)}
          </div>
        </div>
      </div>
    );
  };

  renderStatus = () => {
    const { _id, name, status } = this.state.applicationStatus;

    if (!name) return;

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div className="label p-1">Applicant's Name</div>
            <div className="value p-1">{name}</div>
          </div>
          <div className="col-sm-6">
            <div className="label p-1">Status</div>
            <div id={status} className="status p-1">
              {status}
            </div>
          </div>
        </div>
        {(status !== "accepted" || status !== "rejected") && (
          <div className="p-1">
            <Link to={`/application/${_id}`}>Edit Application</Link>
          </div>
        )}
        {status === "accepted" && <SignupForm />}
      </div>
    );
  };

  render() {
    console.log(this.state);
    return (
      <div className="container">
        {this.renderRadio("statusCheckOptions", true)}
        {this.renderInputField()}
        {this.renderStatus()}
      </div>
    );
  }
}

export default ApplicationStatusForm;
