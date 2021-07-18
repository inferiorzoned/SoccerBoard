import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../components/commons/form";
import { renderMediaUrl } from "../utils/mediaUtils";
import { getTraining } from "../utils/trainingRepoService";

class Training extends Component {
  state = {};

  async componentDidMount() {
    console.log(this.props);
    const trainingId = this.props.match.params._id;
    if (trainingId) {
      const training = await getTraining(trainingId);
      this.setState({
        mediaUrl: training.mediaUrl,
        title: training.trainingTitle,
        category: training.trainingCategoryName,
        difficulty: training.trainingDifficulty,
        description: training.trainingDescription,
        editorialContent: training.editorialContent
      });
      document.getElementById("editorialContent").innerHTML = this.state.editorialContent;
    }
  }

  render() {
    const { mediaUrl, title, category, difficulty, description, editorialContent } = this.state;

    return (
      <div className="container">
        <img
          src={mediaUrl}
          alt=""
          id="img"
          className="img-training py-3"
        />
        <div className="py-3">Title : {title}</div>
        <div className="py-3">Category : {category}</div>
        <div className="py-3">Difficulty : {difficulty}</div>
        <div className="py-3">Description : {description}</div>
        <div className="py-3 editorBorder" id="editorialContent"></div>
      </div>
    );
  }
}

export default Training;
