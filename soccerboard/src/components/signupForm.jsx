import React from "react";
import Joi from "joi-browser";
import Form from "./commons/form";
import auth from "../services/authService";

class SignupForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      confirmedPassword: "",
    },
    errors: {},
    schema: {
      username: Joi.string().label("User Name").required(),
      password: Joi.string().label("Password").required(),
      confirmedPassword: Joi.string().label("Confirm Password").required(),
    },
  };

  doSubmit = async () => {
    const { _id, email } = this.props.status;
    const { username: name, password } = this.state.data;
    const user = {
      _id: _id,
      name: name,
      email: email,
      password: password,
    };
    const response = await auth.signUp(user);
    if (response) window.location = "/home";
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
          <div className="text-center p-3">
            {this.renderButton("SIGN UP", this.handleSubmit)}
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
