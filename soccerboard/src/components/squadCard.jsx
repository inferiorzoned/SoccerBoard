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
