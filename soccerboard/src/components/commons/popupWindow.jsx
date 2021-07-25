import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import Joi from "joi-browser";
import Form from "./form";
// import
// input:
// popupimage
// popupTitle
// popupText

class PopupWindow extends Component {
  state = {
    data: {},
    errors: [],
    schema: {
      kit: Joi.number().integer().required(),
    },
  };

  render() {
    const { popupImage, popupTitle, popupText, buttonsRendered } = this.props;
    const splitted = popupText.split(", ");
    // console.log(splitted);
    // console.log(this.props.buttonsRendered.props);
    return (
      <div className="d-flex flex-column align-items-center justify-content-center popupCard">
        <div className="col-sm-4">
          {/* {this.renderSelect(
            "kit",
            "Select Kit",
            this.props.allKits,
            // ["12"],
            false,
            false,
            true,
            this.handleSelectChange,
            this.props.currentPlayerKit
          )} */}
          {buttonsRendered}
        </div>
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
