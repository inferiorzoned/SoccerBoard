import { ContentState, convertFromHTML, Editor, EditorState } from "draft-js";
import React, { Component } from "react";
import { getTraining } from "../utils/trainingRepoService";
import parse from "html-react-parser";
import EditTraining from "../components/editTraining";
import {
  editTraining,
  uploadImage,
  deleteTraining,
} from "../utils/trainingRepoService";
import {
  trainingCategories,
  getTrainingRepoCategoryData,
} from "../utils/repoElements";

class Training extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    toEditFlag: false,
  };

  async componentDidMount() {
    const trainingId = this.props.match.params._id;
    if (trainingId) {
      this.setState({ trainingId });
      const training = await getTraining(trainingId);
      // console.log(training);
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

  handleDelete = async () => {
    // alert("Deleted " + this.state.trainingId);
    const trainingId = this.state.trainingId;
    await deleteTraining(trainingId);
    // window.location = "/Training Repo";
  };

  editFlag = (flag) => {
    this.setState({ toEditFlag: flag });
  };

  doneEditing = async (data, descriptionContent) => {
    console.log(data);
    // check if "title" is not in as a key of  the data object
    if (!data.title) {
      data["title"] = this.state.title;
    }
    if (!data.category) {
      data["category"] = this.state.category;
    }
    if (!data.difficulty) {
      data["difficulty"] = this.state.difficulty;
    }
    if (!descriptionContent) {
      data["description"] = this.state.description;
    } else {
      data["description"] = descriptionContent;
    }
    const { title, category, difficulty, description } = data;
    const { imageFile } = data;
    let { mediaUrl } = imageFile
      ? await uploadImage(imageFile)
      : this.state.mediaUrl;
    if (!imageFile) {
      mediaUrl = this.state.mediaUrl;
    }
    // console.log(mediaUrl);

    const form = {
      trainingTitle: title,
      trainingCategoryName: category,
      trainingDescription: description,
      trainingDifficulty: difficulty,
      mediaUrl: mediaUrl,
      // mediaUrl: data.mediaUrl ? mediaUrl : this.state.mediaUrl,
      institution: "BUET",
      // editorialContent: this.state.editorialContent,
    };
    // console.log(form);
    await editTraining(form, this.state.trainingId);
    this.editFlag(false);
    window.location.reload();
  };

  render() {
    const {
      mediaUrl,
      title,
      category,
      difficulty,
      description,
      editorState,
      toEditFlag,
    } = this.state;
    if (toEditFlag) {
      return (
        <EditTraining
          mediaUrl={mediaUrl}
          title={title}
          category={category}
          difficulty={difficulty}
          description={description}
          doneEditing={this.doneEditing}
        />
      );
    }
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
        <div className="d-flex justify-content-center mt-5">
          {/* create an green edit button */}
          <div className="m-1">
            <button
              className="btn btn-success btn-sm"
              onClick={() => this.editFlag(true)}
            >
              Edit
            </button>
          </div>
          <div className="m-1">
            <button
              className="btn btn-danger btn-sm"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Training;
