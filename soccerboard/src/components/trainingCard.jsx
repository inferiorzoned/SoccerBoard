import React, { Component } from "react";
import parse from "html-react-parser";

class TrainingCard extends Component {
  async getImage() {}
  state = {
    // selected: false,
  };
  render() {
    const str = "hello";
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
        className={`t-card${
          this.state.selected ? " border border-danger border-4" : ""
        }`}
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
        <div className="t-card-text">
          {parse(trainingDescription.replace(/<figure>.*<\/figure>/, ""))}
        </div>
      </div>
    );
  }
}

export default TrainingCard;
