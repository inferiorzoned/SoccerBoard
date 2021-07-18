import React, { Component } from "react";
import "reactjs-popup/dist/index.css";

class PopupWindow extends Component {
  render() {
    const { popupImage, popupTitle, popupText } = this.props;
    const stats = popupText.split(", ").map((s) => s.split(": "));
    console.log(stats);
    return (
      <div className="d-flex flex-column align-items-center justify-content-center popup-card">
        <img
          className="popup-card-img"
          src={popupImage}
          alt={`Picture of ${popupTitle}`}
        />
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
