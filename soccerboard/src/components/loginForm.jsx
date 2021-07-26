import React from "react";
import Joi from "joi-browser";
import Form from "./commons/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    schema: {
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    },
  };

  doSubmit = async () => {
    // Call the server
    const { email, password } = this.state.data;
    await auth.login(email, password);
    const currentUser = auth.getCurrentUser();
    // console.log(currentUser);
    if (currentUser) window.location = "/home";
    else {
      this.setState({ failure: true });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.state.failure && (
            <div className="px-2" style={{ color: "red", fontSize: "0.8rem" }}>
              Email or Password is wrong!
            </div>
          )}
          <div className="d-flex justify-content-center align-items-center py-3">
            {this.renderButton("LOG IN", null, "btn-maroon")}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
