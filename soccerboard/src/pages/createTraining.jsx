import React from "react";
import Joi from "joi-browser";
import Form from "../components/commons/form";
import { uploadTraining, uploadImage } from "../utils/trainingRepoService";
import TrainingEditor from "../components/trainingEditor";

class CreateTraining extends Form {
  state = {
    editorialContent: "",
    data: {
      title: "",
      difficulty: "",
      category: "",
      mediaUrl: "",
    },
    difficultyLevels: [
      {
        value: "beginner",
        label: "Beginner",
      },
      {
        value: "classic",
        label: "Classic",
      },
      {
        value: "professional",
        label: "Professional",
      },
      {
        value: "basic",
        label: "Basic",
      },
      {
        value: "amateur",
        label: "Amateur",
      },
    ],
    categories: [
      { value: "Passing", label: "Passing" },
      { value: "Defense", label: "Defense" },
      { value: "Attack", label: "Attack" },
      { value: "Keeping", label: "Keeping" },
      { value: "Shooting", label: "Shooting" },
    ],
    selectedOption: "player",
    errors: {},
    schema: {
      title: Joi.string().required().label("Title"),
      difficulty: Joi.string().required().label("Difficulty"),
      description: Joi.string().required().label("Description"),
      category: Joi.string().required().label("Category"),
      mediaUrl: Joi.any(),
      imageFile: Joi.any(),
    },
  };

  setEditorialContent = (content) => {
    this.setState({ editorialContent: content });
  };

  doSubmit = async () => {
    const { data } = this.state;
    const { imageFile } = data;
    // Call the server
    const { mediaUrl } = await uploadImage(imageFile);
    const { title, category, difficulty } = data;
    const form = {
      trainingTitle: title,
      trainingCategoryName: category,
      trainingDescription: this.state.editorialContent,
      trainingDifficulty: difficulty,
      mediaUrl: mediaUrl,
      // editorialContent: this.state.editorialContent,
    };
    console.log(form);
    console.log("from create training ", this.state.editorialContent);
    await uploadTraining(form);

    // Call the server

    console.log("Submitted");
    window.location = "/Training Repo";
  };

  handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          data: {
            ...this.state.data,
            mediaUrl: reader.result,
            imageFile: file,
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { difficultyLevels, categories } = this.state;

    const thumnailClasses = this.state.data.mediaUrl
      ? "tr-thumbnail"
      : "tr-thumbnail bg-gray";
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className={thumnailClasses}>
            {this.state.data.mediaUrl && (
              <img
                src={this.state.data.mediaUrl}
                alt=""
                id="img"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
            <input
              className="btn btn-maroon m-3"
              type="file"
              accept="image/*"
              name="image-upload"
              id="image-input"
              onChange={this.handleImage}
              hidden
            />
            <label
              className="btn btn-maroon"
              id="upload-thumbnail"
              htmlFor="image-input"
            >
              UPLOAD THUMBNAIL
            </label>
          </div>
          <div>{this.renderInput("title", "Title")}</div>
          <div className="row">
            <div className="col-sm-6">
              {this.renderSelect("difficulty", "Difficulty", difficultyLevels)}
            </div>
            <div className="col-sm-6">
              {this.renderSelect("category", "Category", categories)}
            </div>
          </div>
        </form>
        <div style={{ margin: "8px 8px 0 8px" }}>Details</div>
        <TrainingEditor setContent={this.setEditorialContent} />
        <div className="d-flex justify-content-center align-items-center my-5">
          {this.renderButton("CREATE TRAINING", this.doSubmit)}
        </div>
      </div>
    );
  }
}

export default CreateTraining;
