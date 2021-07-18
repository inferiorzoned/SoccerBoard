import React from "react";
import LoginCard from "../components/loginCard";

const Login = () => {
  return (
    <div className="container-fluid homepage-bgimage">
      <div className="row">
        <div className="col-sm-8 App-header pt-5">
          SOCCER
          <br />
          BOARD
        </div>
        <div className="col-sm-4 pt-5">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default Login;
