import React, { Component } from "react";
import { styles } from "./common/styles";
import NavButtons from "./common/navbuttons";

class Navbar extends Component {
  state = {
    currentPage: null,
  };

  componentDidMount() {
    this.setState({ currentPage: "Home" });
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-light"
        style={styles.navBar}
      >
        <a
          className="navbar-brand"
          href="#"
          // style={{ backgroundColor: "#bbffcc", justifyContent: "start" }}
        >
          SoccerBoard
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarSupportedContent"
          // style={{ backgroundColor: "#ffbbff" }}
        >
          <NavButtons
            stakeHolder={"manager"}
            currentPage={this.state.currentPage}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
