import React, { Component } from "react";
import gotoWhiteboard from "../gotoWhiteboard.svg";
import load from "../load.svg";
import { getSquad } from "../services/squad";
import SquadTable from "./commons/squadTable";
class Squad extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.setState({ players: [...getSquad()] });
  }

  renderFormation = () => {
    const formationCSS = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "120px",
      height: "48px",
      background: "#212230",
      border: "4px solid #217075",
      padding: "4px",
      boxSizing: "border-box",
      borderRadius: "24px",
      fontFamily: "Passero One",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      textAlign: "center",
      color: "#F0FDFB",
    };
    const labelCSS = {
      padding: "4px",
      fontFamily: "Passero One",
      fontSize: "20px",
      color: "#6D6E78",
    };

    return (
      <div>
        <div style={labelCSS}>Formation</div>
        <div style={formationCSS}>4-3-3</div>;
      </div>
    );
  };

  renderBadge = () => {
    const badgeCSS = {
      width: "180px",
      height: "60px",
      fontFamily: "Passero One",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#000000",
      border: "4px solid #034732",
      boxSizing: "border-box",
      borderRadius: "32px",
    };
    return (
      <div>
        <div style={badgeCSS}>
          Whiteboard
          <img
            src={gotoWhiteboard}
            style={{
              padding: "0px 12px 0px 12px",
              height: "52px",
              width: "52px",
            }}
            alt=""
            srcset=""
          />
        </div>
        <div style={badgeCSS}>
          Load Squad
          <img
            src={load}
            style={{
              padding: "0px 12px 0px 12px",
              height: "60px",
              width: "60px",
            }}
            alt=""
            srcset=""
          />
        </div>
      </div>
    );
  };

  renderSquad = () => {
    return (
      <div>
        <SquadTable players={this.state.players} playerType="main" />
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderFormation()}
        {this.renderBadge()}
        {this.renderSquad()}
      </div>
    );
  }
}

export default Squad;
