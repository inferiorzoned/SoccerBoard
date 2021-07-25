import React, { Component } from "react";
import CreateTraining from "../pages/createTraining";
import TrainingEditor from "../components/trainingEditor";
import Joi from "joi-browser";

class EditTraining extends CreateTraining {
  state = {
    // editorialContent: "",
    data: {
      // title: "",
      // difficulty: "",
      // category: "",
      // mediaUrl: "",
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

  render() {
    const { mediaUrl, title, category, difficulty, description, doneEditing } =
      this.props;
    console.log(this.props.title);

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
            {!this.state.data.mediaUrl && (
              <img
                src={mediaUrl}
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
          <div>{this.renderInput("title", "Title", "text", false, title)}</div>
          <div className="row">
            <div className="col-sm-6">
              {this.renderSelect(
                "difficulty",
                "Difficulty",
                difficultyLevels,
                false,
                false,
                false,
                this.handleSelectChange,
                { label: difficulty, value: difficulty.toLowerCase() }
              )}
            </div>
            <div className="col-sm-6">
              {this.renderSelect(
                "category",
                "Category",
                categories,
                false,
                false,
                false,
                this.handleSelectChange,
                { label: category, value: category.toLowerCase() }
              )}
            </div>
          </div>
        </form>
        <div style={{ margin: "8px 8px 0 8px" }}>Details</div>
        <TrainingEditor
          setContent={this.setEditorialContent}
          description={description}
        />
        <div className="d-flex justify-content-center align-items-center my-5">
          {/* {this.renderButton("Save", doneEditing)} */}
          <button
            // disabled={this.validate()}
            onClick={() =>
              doneEditing(this.state.data, this.state.editorialContent)
            }
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default EditTraining;
