import React from "react";
import Joi from "joi-browser";
import Form from "./commons/form";

class SignupForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      confirmedPassword: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().label("User Name").required(),
    password: Joi.string().label("Password").required(),
    confirmedPassword: Joi.string().label("Confirm Password").required(),
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput(
            "confirmedPassword",
            "Confirm Password",
            "password"
          )}
          <div className="text-center p-3">{this.renderButton("SIGN UP")}</div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
