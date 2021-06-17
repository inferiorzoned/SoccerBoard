import React, { Component } from "react";
import { Link } from "react-router-dom";
/*
input: 
  trainingImage
  trainingTitle
  trainingDifficulty
  trainingDescription
*/

class TrainingCard extends Component {
  async getImage() {}
  render() {
    const str = "hello";
    const {
      trainingImage,
      trainingTitle,
      trainingDifficulty,
      trainingDescription,
      trainingID,
    } = this.props;
    // const epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";
    // const trainingImage2 = epMedia + trainingImage;
    return (
      <Link
        to={`/Training Repo/${trainingID}`}
        style={{ textDecoration: "none" }}
      >
        <div className="t-card">
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
          <div className="t-card-text">{trainingDescription}</div>
        </div>
      </Link>
    );
  }
}

export default TrainingCard;
