import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
// input:
// popupimage
// popupTitle
// popupText

class PopupWindow extends Component {
  render() {
    const { popupImage, popupTitle, popupText } = this.props;
    const splitted = popupText.split(", ");
    // console.log(splitted);
    return (
      <div className="d-flex flex-column align-items-center justify-content-center popupCard">
        <img className="popupCardImage" src={popupImage} alt="Card image cap" />
        <h3>{popupTitle}</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {splitted.map((item, itemIdx) => (
            <li key={itemIdx}>{item}</li>
          ))}
        </ul>
        {/* <h2>{popupTitle}</h2>
        <h2>{popupText}</h2>
        <h2>{popupTitle}</h2>
        <h2>{popupText}</h2> */}
      </div>
    );
  }
}

export default PopupWindow;
