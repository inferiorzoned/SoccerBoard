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
      description: "",
      mediaUrl:
        "https://i.pinimg.com/originals/6e/99/be/6e99bef54fb51324e8ea438a030e8b87.jpg",
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
  }

  doSubmit = async () => {
    const { data } = this.state;
    const { imageFile } = data;
    // Call the server
    const { mediaUrl } = await uploadImage(imageFile);
    // const user =  auth.getCurrentUser();
    // this.setState({ user });
    // this.setState({ data: element })
    const { title, category, difficulty, description } = data;
    const form = {
      trainingTitle: title,
      trainingCategoryName: category,
      trainingDescription: description,
      trainingDifficulty: difficulty,
      mediaUrl: mediaUrl,
      editorialContent: this.state.editorialContent
    };
    console.log(form);
    console.log('from create training ', this.state.editorialContent);
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
    const {
      difficultyLevels,
      categories
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          {/* <div className="col-sm-auto bg-light sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
              {this.renderRadio("formType", false)}
            </div>
          </div> */}
          {/* <div className="col-3"></div> */}
          {/* <div className="col min-vh-100"> */}
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-sm-5 text-center">
                    <div className="row image-holder m-2">
                      <img
                        src={this.state.data.mediaUrl}
                        alt=""
                        id="img"
                        className="img-training"
                      />
                    </div>
                    <div className="row">
                      <input
                        className="btn btn-maroon m-3"
                        type="file"
                        accept="image/*"
                        name="image-upload"
                        id="image-input"
                        onChange={this.handleImage}
                        hidden
                      />
                    </div>

                    <div className="row">
                      <div className="col-sm-2 text-center">
                        <label
                          htmlFor="image-input"
                          className="btn btn-maroon m-2"
                        >
                        CHOOSE DEMO PICTURE
                        </label>          
                      </div>
                    </div>                

                  </div>
                  
                  
                  <div className="col-sm-5">
                    <div className="row">
                      
                      {this.renderMultilineInput(
                        "description",
                        "Description"
                      )}
                    </div>
                      <div className="row mt-5">
                        <div className="col">
                          {this.renderInput("title", "Title")}
                        </div>
                      </div>
                      <div className="row mb-3">
                        {/* <div className="col">
                          {this.renderInput("email", "Email", "email")}
                          </div>*/}
                        <div className="col-sm"></div>
                        <div className="col-sm-5">
                          {this.renderSelect(
                            "difficulty",
                            "Difficulty",
                            difficultyLevels
                          )}
                        </div>
                        <div className="col-sm-5">
                          {this.renderSelect("category", "Category", categories)}
                        </div>
                      </div>
                    
                    
                  </div>
                </div>
                
              </form>
            </div>
          {/* </div> */}
        </div>
        <div className="row">
          <TrainingEditor
            setContent={this.setEditorialContent}
          />
        </div>
        <div className="row text-center py-3">
            {this.renderButton("CREATE TRAINING", this.doSubmit, "btn-primary")}
        </div>
      </div>
    );
  }
}

export default CreateTraining;
