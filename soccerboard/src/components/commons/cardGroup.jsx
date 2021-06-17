import React, { Component } from "react";
import TrainingCard from "../trainingCard";
// import { trainingRepoData } from "../../utils/repoElements";
// import {
//   trainingCategories,
//   trainingRepoCategoryData,
// } from "../../utils/repoElements";
import SquadCard from "../squadCard";
// import { squadData } from "../../utils/squadData";
/*
input:
    groupType
    categoryName
    categoryData
*/

class CardGroup extends Component {
  // state = { trainingRepoCategoryData: null, trainingCategories: null };

  // async componentDidMount() {
  //   const { trainingRepoCategoryData, trainingCategories } = this.state;
  //   trainingRepoCategoryData = await trainingRepoCategoryData();
  //   trainingCategories = trainingCategories;
  //   this.setState({ trainingRepoCategoryData, trainingCategories });
  // }

  render() {
    const { groupType, categoryName, categoryData } = this.props;

    let groupData;
    console.log(categoryName);
    console.log(categoryData);
    console.log(categoryData[categoryName]);

    if (groupType === "trainingRepo") {
      groupData = (
        <div className="row ">
          {categoryData[categoryName] &&
            categoryData[categoryName].map((trainingInstance, index) => (
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6" key={index}>
                {/* {trainingInstance.trainingDescription} */}
                <TrainingCard
                  trainingImage={trainingInstance.mediaUrl}
                  trainingTitle={trainingInstance.trainingTitle}
                  trainingDifficulty={trainingInstance.trainingDifficulty}
                  trainingDescription={trainingInstance.trainingDescription}
                  trainingID={trainingInstance._id}
                />
              </div>
            ))}
        </div>
      );
    } else if (groupType === "squad") {
      // groupData = <SquadCard />;
      groupData = (
        <div className="row ">
          {categoryData[categoryName] &&
            categoryData[categoryName].map(
              (playerInstance, playerInstanceIndex) => (
                <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-items-stretch">
                  {/* {trainingInstance.trainingDescription} */}
                  <SquadCard
                    playerImageURL={playerInstance.playerImage}
                    playerKit={playerInstance.kit}
                    playerPosition={playerInstance.position}
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
        <h1
          className="text-left pt-4"
          id={`${categoryName.toLowerCase().replace(" ", "-")}`}
        >
          {categoryName}
        </h1>
        <hr className="categoryLine" />
        <div className="container-fluid">{groupData}</div>
      </>
    );
  }
}

export default CardGroup;
