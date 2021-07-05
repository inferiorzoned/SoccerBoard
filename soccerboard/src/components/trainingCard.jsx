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
      // <Link
      //   to={`/Training Repo/${trainingID}`}
      //   style={{ textDecoration: "none" }}
      // >
      //   <div className="t-card">
      //     <div className="d-flex flex-row me-3">
      //       <img className="t-card-image" src={trainingImage} />

      //       <div className="d-flex flex-column ms-3">
      //         <div className="t-card-title">{trainingTitle}</div>
      //         <div
      //           className={`t-difficulty-badge t-difficulty-badge-${trainingDifficulty.toLowerCase()}`}
      //         >
      //           {trainingDifficulty}
      //         </div>
      //       </div>
      //     </div>
      //     <div className="t-card-text">{trainingDescription}</div>
      //   </div>
      // </Link>

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
        <div className="t-card-text">{trainingDescription}</div>
      </div>
    );
  }
}

export default TrainingCard;
