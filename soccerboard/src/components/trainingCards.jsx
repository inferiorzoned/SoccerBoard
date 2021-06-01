import React, { Component } from "react";
import CardGroup from "./cardGroup";
import { trainingRepoData } from "../utils/repoElements";

class TrainingCards extends Component {
  render() {
    return (
      <ul style={{ listStyleType: "none" }}>
        {trainingRepoData.trainingCategories.map(
          (trainingType, trainingTypeIndex) => (
            <li key={trainingTypeIndex}>
              <CardGroup trainingCategoryName={trainingType} />;
            </li>
          )
        )}
      </ul>
    );
  }
}

export default TrainingCards;
