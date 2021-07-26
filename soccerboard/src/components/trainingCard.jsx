import React, { Component } from "react";
/*
input: 
  trainingImage
  trainingTitle
  trainingDifficulty
  trainingDescription
*/

class TrainingCard extends Component {
  async getImage() {}
  state = {
    // selected: false,
  };
  render() {
    let selecetdTrainings = [];
    const {
      trainingImage,
      trainingTitle,
      trainingDifficulty,
      trainingDescription,
      trainingID,
      handleLink,
      linkType,
    } = this.props;

    // const description = trainingDescription.replace(/<figure>.*<\/figure>/, "");
    const div = document.createElement("div");
    div.innerHTML = trainingDescription;
    const description = div.textContent || div.innerText || "";

    return (
      <div
        onClick={(e) => {
          selecetdTrainings.push(trainingID);
          handleLink(e, linkType, trainingID, selecetdTrainings);
          if (e.ctrlKey || e.metaKey) {
            const isSelected = this.state.selected ? false : true;
            this.setState({ selected: isSelected });
          }
        }}
        className={`t-card${this.state.selected ? " t-card-selected" : ""}`}
      >
        <div className="d-flex flex-row me-3">
          <img className="t-card-image" src={trainingImage} />

          <div className="d-flex flex-column ms-3">
            <div className="t-card-title">{trainingTitle}</div>
            <div
              className={`t-difficulty-badge t-difficulty-badge-${trainingDifficulty.toLowerCase()}`}
            >
              {trainingDifficulty}
            </div>
          </div>
        </div>
        <div className="t-card-text">{description.substr(0, 50)}</div>
      </div>
    );
  }
}

export default TrainingCard;
