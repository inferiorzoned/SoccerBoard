import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupWindow from "./commons/popupWindow";
import Form from "./commons/form";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";
import { setKit } from "../services/squadPlayerService";
/*
input: 
  playerImage
  playerKit
  playerPosition
  playerName
  numberOfMatches
      gameTime
      goals
      assist
      yellows
      reds
      cleanSheets
*/
class SquadCard extends Form {
  state = {
    data: {},
    errors: [],
    schema: {
      kit: Joi.number().integer().required(),
    },
  };

  // async componentDidMount() {
  //   const epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";
  //   let applicants = await getApplicants();
  //   if (applicants) {
  //     applicants.forEach((applicant) => {
  //       applicant.avatar = epMedia + applicant.avatar;
  //     });
  //   }
  //   this.setState({ playerImage: [...applicants] });
  // }

  getAvaiableKits(bookedKits) {
    // create a list of 1 to 100
    // remove the ones that are already booked
    // return the list
    let kitList = [];
    for (let i = 1; i <= 100; i++) {
      kitList.push({ label: i, value: i });
    }
    for (let i = 1; i <= 100; i++) {
      bookedKits.map((kit) => {
        // remove from kitList where kit["label"] = i
        kitList = kitList.filter((k) => {
          return kit["label"] !== k["label"];
        });
      });
    }
    return kitList;
  }

  saveKit = async (playerId) => {
    // console.log(this.state.data.kit);
    const kit = {
      kit: this.state.data.kit,
    };
    console.log(kit, playerId);
    await setKit(kit, playerId);
    window.location.reload();
  };

  render() {
    const {
      playerId,
      playerImageURL,
      playerKit,
      playerPosition,
      playerName,
      numberOfMatches,
      gameTime,
      goals,
      assist,
      yellows,
      reds,
      cleanSheets,
    } = this.props;

    const playerImageWithDetails = (
      <div className="card squadCardContainer">
        <img className="myCardImg" src={playerImageURL} alt="Card image cap" />
        <div className="top-left">
          <ul
            className="cardList"
            style={{ listStyleType: "none", padding: 0 }}
          >
            <li className="cardKit">{playerKit}</li>
            <li className="cardPosition">{playerPosition}</li>
          </ul>
        </div>
        <div className="row" style={{ backgroundColor: "blue" }}>
          <div className=" bottom-left">{playerName}</div>
        </div>
      </div>
      // <img src={playerImageURL} />
    );

    const selectKitRender = (
      <div>
        {/* <div> */}
        {this.renderSelect(
          "kit",
          "Select Kit",
          // this.props.allKits,
          this.getAvaiableKits(this.props.allKits),
          false,
          false,
          true,
          this.handleSelectChange,
          { label: playerKit, value: "playerKit" }
        )}

        <button
          className="btn btn-outline-light"
          onClick={() => this.saveKit(this.props.playerId)}
        >
          Save
        </button>
      </div>
    );

    // console.log(playerKit);
    // console.log(this.props.allKits);
    return (
      //   <div className="card">
      <>
        <Popup trigger={playerImageWithDetails} modal>
          <span>
            <PopupWindow
              popupImage={playerImageURL}
              popupTitle={playerName}
              popupText={`Matches: ${numberOfMatches | ""}, Gametime: ${
                gameTime | ""
              }, Goals: ${goals | ""}, Assists: ${assist | ""}, Y.Cards: ${
                yellows | ""
              }, R.Cards: ${reds | ""}, C.Sheets: ${cleanSheets | ""}
                `}
              // allKits={this.props.allKits}
              // currentPlayerKit={playerKit}
              buttonsRendered={selectKitRender}
              playerId={playerId}
            />
          </span>
        </Popup>
      </>
    );
  }
}

export default SquadCard;
