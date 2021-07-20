import { ContentState, convertFromHTML, Editor, EditorState } from "draft-js";
import React, { Component } from "react";
import { getTraining } from "../utils/trainingRepoService";
import parse from "html-react-parser";

class Training extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  async componentDidMount() {
    const trainingId = this.props.match.params._id;
    if (trainingId) {
      const training = await getTraining(trainingId);
      console.log(training);
      // const blocksFromHTML = convertFromHTML(
      //   training.trainingDescription.replace(/(<\/?)figure((?:\s+.*?)?>)/g, "")
      // );
      // console.log(
      //   training.trainingDescription.replace(/(<\/?)figure((?:\s+.*?)?>)/g, "")
      // );
      // const contentState = ContentState.createFromBlockArray(
      //   blocksFromHTML.contentBlocks,
      //   blocksFromHTML.entityMap
      // );
      this.setState({
        mediaUrl: training.mediaUrl,
        title: training.trainingTitle,
        category: training.trainingCategoryName,
        difficulty: training.trainingDifficulty,
        description: training.trainingDescription,
        // editorState: EditorState.createWithContent(contentState),
      });
    }
  }

  render() {
    const { mediaUrl, title, category, difficulty, description, editorState } =
      this.state;

    return (
      <div className="container">
        <div className="tr-thumbnail">
          <img
            src={mediaUrl}
            alt=""
            id="img"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="tr-title">{title}</div>
        <table className="my-3">
          <tbody>
            <tr>
              <td className="tr-label">Category</td>
              <td className="tr-value">{category}</td>
            </tr>
            <tr>
              <td className="tr-label">Difficulty</td>
              <td className="tr-value">{difficulty}</td>
            </tr>
          </tbody>
        </table>
        {/* <Editor editorState={editorState} readOnly={true}></Editor> */}
        <div id="tr-view">{description && parse(description)}</div>
      </div>
    );
  }
}

export default Training;
