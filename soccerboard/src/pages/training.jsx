import { EditorState } from "draft-js";
import React, { Component } from "react";
import {
  getTraining,
  editTraining,
  uploadImage,
  deleteTraining,
} from "../services/trainingRepoService";
import parse from "html-react-parser";
import { library } from "@fortawesome/fontawesome-svg-core";
import EditTraining from "../components/editTraining";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CmdButton from "../components/commons/cmdButton";

library.add(faEdit, faTrash);

class Training extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    toEditFlag: false,
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
        trainingId: trainingId,
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
        <div className="d-flex justify-content-center mt-3">
          <CmdButton
            faIcon={faEdit}
            buttonClasses="btn-cmd-mini btn-cmd-edit"
            onClick={() => this.editFlag(true)}
          />
          <CmdButton
            faIcon={faTrash}
            buttonClasses="btn-cmd-mini btn-cmd-delete"
            onClick={() => this.editFlag(true)}
          />
        </div>
      </div>
    );
  }
}

export default Training;
