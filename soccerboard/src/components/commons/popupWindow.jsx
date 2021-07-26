import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import Joi from "joi-browser";
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
    const stats = popupText.split(", ").map((s) => s.split(": "));
    console.log(stats);
    return (
      <div className="d-flex flex-column align-items-center justify-content-center popup-card">
        <div className="col-sm-4">{buttonsRendered}</div>
        <img className="popup-card-img" src={popupImage} alt={popupTitle} />
        <h3>{popupTitle}</h3>
        <table className="popup-card-table">
          <tbody>
            {stats.map((item) => (
              <tr key={item[0]}>
                <td>
                  <div className="popup-card-table-label">{item[0]}</div>
                </td>
                <td>
                  <div className="popup-card-table-value">{item[1]}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PopupWindow;
