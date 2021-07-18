import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupWindow from "./commons/popupWindow";

class SquadCard extends Component {
  state = {};

  render() {
    const {
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

    // console.log(playerImageURL);

    const playerImageWithDetails = (
      <div className="card squad-card">
        <img
          className="squad-card-img"
          src={playerImageURL}
          alt="Card image cap"
        />
        <div className="top-left">
          <ul
            className="cardList"
            style={{ listStyleType: "none", padding: 0 }}
          >
            <li className="squad-card-kit">{playerKit}</li>
            <li className="squad-card-position">{playerPosition}</li>
          </ul>
        </div>
        <div className="bottom-left">
          <div className="squad-card-name">{playerName}</div>
        </div>
      </div>
    );
    // console.log(playerKit);
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
            />
          </span>
        </Popup>
      </>
    );
  }
}

export default SquadCard;
