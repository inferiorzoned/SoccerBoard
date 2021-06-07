import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupWindow from "./common/popupWindow";
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
class SquadCard extends Component {
  state = {};

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

    console.log(playerImageURL);

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
    console.log(playerKit);
    return (
      //   <div className="card">
      <>
        {/* <div className="card" style={{ height: "18rem", width: "auto" }}>
          <div className="squadCardContainer container-fluid p-0 cardStyle">
            <img src={playerImage} />
            <div className="top-left">
              <ul className=""></ul>
              <li>{playerKit}</li>
              <li>{playerPosition}</li>
            </div>
            <div className="bottom-right"></div>
          </div>
        </div> */}

        {/* <Popup trigger={playerImageWithDetails} modal>
          <span>hello hisham</span>
        </Popup> */}
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
            />
          </span>
        </Popup>

        {/* <div className="card squadCardContainer">
          <img className="myCardImg" src={playerImage} alt="Card image cap" />
          <div className="top-left">
            <ul className=""></ul>
            <li className="cardKit">{playerKit}</li>
            <li className="cardPosition">{playerPosition}</li>
          </div>
          <div className="row" style={{ backgroundColor: "blue" }}>
            <div className=" bottom-left">{playerName}</div>
          </div>
        </div>

        <Popup trigger={<button className="button"> Open Modal </button>} modal>
          <span> Modal content </span>
        </Popup> */}
        {/* <div class="card bg-dark text-white">
          <img className="card-img" src={playerImage} alt="Card image cap" />
          <div class="card-img-overlay">
          
            <div className="top-left">
              <ul className=""></ul>
              <li className="cardKit">{playerKit}</li>
              <li className="cardPosition">{playerPosition}</li>
            </div>
            <div className="card-footer next-bottom-centered">{playerName}</div>
          </div>
        </div> */}
      </>
    );
  }
}

export default SquadCard;
