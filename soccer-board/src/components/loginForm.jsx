import React from "react";
import Joi from "joi-browser";
import Form from "./commons/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "User name")}
          {this.renderInput("password", "Password", "password")}
          <div className="text-center py-3">
            {this.renderButton("LOG IN", null, "btn-maroon")}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
