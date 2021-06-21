import Joi from "joi-browser";
import React from "react";
import { getApplicantionStatus } from "../services/statusService";
import Form from "./commons/form";
import SignupForm from "./signupForm";

class ApplicationStatusForm extends Form {
  state = {
    data: {
      email: "",
    },
    options: [
      { _id: "email", value: "email", label: "Email" },
      { _id: "mobile", value: "mobile", label: "Mobile" },
    ],
    selectedOption: "email",
    applicationStatus: {},
    errors: {},
    schema: {
      email: Joi.string().email().label("Email"),
    },
  };

  handleOptionChange = (e) => {
    console.log(e.target.value);
    const schema =
      e.target.value === "mobile"
        ? {
            mobile: Joi.string()
              .min(10)
              .max(14)
              .regex(/^[0-9]+$/)
              .required()
              .label("Mobile"),
          }
        : { email: Joi.string().email().label("Email") };

    this.setState({
      data: { [e.target.value]: "", ...this.state.data },
      selectedOption: e.target.value,
      schema: schema,
    });
  };

  doSubmit = async () => {
    const { selectedOption, data } = this.state;
    const query = { [selectedOption]: data[selectedOption] };
    try {
      const status = await getApplicantionStatus(query);
      this.setState({
        applicationStatus: { ...status },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({
          applicationStatus: { appStatus: "not-found" },
        });
      } else {
        this.setState({
          applicationStatus: {},
        });
      }
    }
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
            {this.renderButton("CHECK", this.handleSubmit)}
          </div>
        </div>
      </div>
    );
  };

  renderStatus = () => {
    const { _id, name, email, appStatus } = this.state.applicationStatus;

    if (!appStatus) return null;

    if (appStatus === "not-found")
      return (
        <div className="col-sm-6">
          <div className="label p-1">Status</div>
          <div id={appStatus} className="status p-1">
            Not Found
          </div>
        </div>
      );

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div className="label p-1">Applicant's Name</div>
            <div className="value p-1">{name}</div>
          </div>
          <div className="col-sm-6">
            <div className="label p-1">Status</div>
            <div id={appStatus} className="status p-1">
              {appStatus}
            </div>
          </div>
        </div>
        {/* {(appStatus !== "accepted" || appStatus !== "rejected") && (
          <div className="p-1">
            <Link to={`/application/${_id}`}>Edit Application</Link>
          </div>
        )} */}
        {appStatus === "accepted" && (
          <SignupForm status={{ _id: _id, email: email }} />
        )}
      </div>
    );
  };

  render() {
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
