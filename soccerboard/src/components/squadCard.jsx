import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Joi from "joi-browser";
import PopupWindow from "./commons/popupWindow";
import Form from "./commons/form";
import { setKit } from "../services/squadPlayerService";
import auth from "../services/authService";

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
    user: auth.getCurrentUser(),
  };

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
      user,
      playerId,
      playerImageURL,
      playerKit,
      playerPositions,
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
      <div className="squad-card">
        <img
          className="squad-card-img"
          src={playerImageURL}
          alt="Card image cap"
        />
        <div className="top-left squad-card-kit">{playerKit}</div>
        <ul className="top-right positions">
          {playerPositions.map((pos) => (
            <li key={pos}>{pos}</li>
          ))}
        </ul>
        <div className="bottom-left">
          <div className="squad-card-name">{playerName}</div>
        </div>
      </div>
    );

    const selectKitRender =
      user && (user.isAdmin || user.userType !== "player") ? (
        <div>
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

          <div className="d-flex justify-content-center align-items center">
            <button
              className="btn btn-outline-light"
              onClick={() => this.saveKit(this.props.playerId)}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <></>
      );
    return (
      <>
        <Popup trigger={playerImageWithDetails} modal className="popup-content">
          <span>
            <PopupWindow
              popupImage={playerImageURL}
              popupTitle={playerName}
              popupText={`Matches: ${numberOfMatches | ""}, Gametime: ${
                gameTime | ""
              }, Goals: ${goals | ""}, Assists: ${assist | ""}, Y.Cards: ${
                yellows | ""
              }, R.Cards: ${reds | ""}, C.Sheets: ${cleanSheets | ""}`.trim()}
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
