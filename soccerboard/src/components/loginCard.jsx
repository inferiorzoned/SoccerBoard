import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";

class LoginCard extends Component {
  state = {};
  render() {
    return (
      <div className="login card shadow px-3 py-5 mb-5 w-75">
        <div className="card-body">
          <LoginForm />
          <div className="text-center">
            <p>
              Don't have an account? <a href="/application">SIGN UP!</a>
            </p>
            <p className="small">
              Already applied?{" "}
              <a href="/application-status">Check application status!</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginCard;
