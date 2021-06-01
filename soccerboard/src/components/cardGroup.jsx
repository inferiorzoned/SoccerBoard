import React, { Component } from "react";
import TrainingCard from "./trainingCard";
import { trainingRepoData } from "../utils/repoElements";
/*
input:
    trainingCategoryName
*/

class CardGroup extends Component {
  render() {
    const { trainingCategoryName } = this.props;
    console.log(trainingCategoryName);
    console.log(
      trainingRepoData.trainingRepoCategoryData[trainingCategoryName]
    );
    return (
      <>
        <h1 style={{ textAlign: "left" }}>{trainingCategoryName}</h1>
        <div className="container-fluid">
          <div className="row ">
            {trainingRepoData.trainingRepoCategoryData[
              trainingCategoryName
            ].map((trainingInstance, trainingInstanceID) => (
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex align-items-stretch">
                {/* {trainingInstance.trainingDescription} */}
                <TrainingCard
                  trainingImage={trainingInstance.trainingImage}
                  trainingTitle={trainingInstance.trainingTitle}
                  trainingDifficulty={trainingInstance.trainingDifficulty}
                  trainingDescription={trainingInstance.trainingDescription}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default CardGroup;
