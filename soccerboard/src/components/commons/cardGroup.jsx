import React, { Component } from "react";
import TrainingCard from "../trainingCard";
import SquadCard from "../squadCard";

class CardGroup extends Component {
  render() {
    const { groupType, categoryName, categoryData } = this.props;

    let groupData;
    // console.log(categoryName);
    // console.log(categoryData);
    // console.log(categoryData[categoryName]);

    if (groupType === "trainingRepo") {
      groupData = (
        <div className="row ">
          {categoryData[categoryName] &&
            categoryData[categoryName].map((trainingInstance, index) => (
              <div
                className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-6"
                key={index}
              >
                <TrainingCard
                  trainingImage={trainingInstance.mediaUrl}
                  trainingTitle={trainingInstance.trainingTitle}
                  trainingDifficulty={trainingInstance.trainingDifficulty}
                  trainingDescription={trainingInstance.trainingDescription}
                  trainingID={trainingInstance._id}
                  handleLink={this.props.handleLink}
                  linkType={this.props.linkType}
                />
              </div>
            ))}
        </div>
      );
    } else if (groupType === "squad") {
      groupData = (
        <div className="row">
          {categoryData[categoryName] &&
            categoryData[categoryName].map(
              (playerInstance, playerInstanceIndex) => (
                <div className="d-flex col-xxl-3 col-xl-4 col-lg-6 col-md-6">
                  <SquadCard
                    playerImageURL={playerInstance.playerImage}
                    playerKit={playerInstance.kit}
                    playerPositions={playerInstance.positions}
                    playerName={playerInstance.name}
                    numberOfMatches={playerInstance.numberOfMatches}
                    gameTime={playerInstance.gameTime}
                    goals={playerInstance.goals}
                    assist={playerInstance.assist}
                    yellows={playerInstance.yellows}
                    reds={playerInstance.reds}
                    cleanSheets={playerInstance.cleanSheets}
                  />
                </div>
              )
            )}
        </div>
      );
    }
    return (
      <>
        <h3
          className="text-left pt-4"
          id={`${categoryName.toLowerCase().replace(" ", "-")}`}
        >
          {categoryName}
        </h3>
        <hr className="category-line" />
        <div className="container-fluid">{groupData}</div>
      </>
    );
  }
}

export default CardGroup;
