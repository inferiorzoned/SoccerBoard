import React, { Component } from "react";
import { render } from "react-dom";
import CardGroup from "./commons/cardGroup";
import {
  trainingCategories,
  getTrainingRepoCategoryData,
} from "../utils/repoElements";
import { CircularProgress } from "@material-ui/core";

class TrainingCards extends Component {
  state = { name: "dummy" };

  async componentDidMount() {
    // const { trainingRepoCategoryData, trainingCategories } = this.state;
    const trainingRepoCategoryData = await getTrainingRepoCategoryData();
    // const trainingCategories = trainingCategories;
    this.setState({ trainingRepoCategoryData });
  }

  render() {
    const { handleLink, linkType } = this.props;
    const { trainingRepoCategoryData } = this.state;
    console.log(trainingRepoCategoryData);
    if (trainingRepoCategoryData) {
      return (
        <ul style={{ listStyleType: "none" }}>
          {trainingCategories.map((trainingType, trainingTypeIndex) => (
            <li key={trainingTypeIndex}>
              <CardGroup
                groupType={"trainingRepo"}
                categoryName={trainingType}
                categoryData={trainingRepoCategoryData}
                handleLink={handleLink}
                linkType={linkType}
              />
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div className="centered">
          <CircularProgress color="secondary" />
        </div>
      );
    }
  }
}

export default TrainingCards;
