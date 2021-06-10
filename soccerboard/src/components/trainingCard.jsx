import React, { Component } from "react";
import { Link } from "react-router-dom";
/*
input: 
  trainingImage
  trainingTitle
  trainingDifficulty
  trainingDescription
*/

class TrainingCard extends Component {
  async getImage() {}
  render() {
    const str = "hello";
    const {
      trainingImage,
      trainingTitle,
      trainingDifficulty,
      trainingDescription,
      trainingID,
    } = this.props;
    const epMedia = "http://localhost:3900/api/medias/image?mediaUrl=";
    const trainingImage2 = epMedia + trainingImage;
    return (
      // <div className="card bg-light mb-3 mb-3" style={{ width: "18rem" }}>

      // <div className="card bg-light  mb-3 mb-3">
      //   <div className="container cardStyle">
      //     <div className="row card-header">
      //       <div className="col-6 cardImage">
      //         <img className="card-img-top " src={trainingImage} />
      //       </div>
      //       <div className="col-6 cardImage">
      //         <div className="row">
      //           <div className="card-text">
      //             <h5 class="card-title">{trainingTitle}</h5>
      //           </div>
      //         </div>
      //         <div className="row">
      //           <p className="card-text">
      //             <small className="text-muted">{trainingDifficulty}</small>
      //           </p>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <p className="card-text cardDesc line-clamp">
      //         {trainingDescription}
      //       </p>
      //     </div>
      //   </div>
      // </div>

      // <div className="card w-100">
      //   <div className="cardStyle">
      //     <img className="cardImage" src={trainingImage} />
      //     <div className="card-body">
      //       <h5 className="card-title">{trainingTitle}</h5>
      //       <p className="card-text">
      //         <small className="text-muted">{trainingDifficulty}</small>
      //       </p>
      //       <p className="card-text cardDesc line-clamp">
      //         {trainingDescription}
      //       </p>
      //     </div>
      //   </div>
      // </div>

      <Link to={`/Training Repo/${trainingID}`}>
        <div className="card w-100">
          <div className="container-fluid p-0 cardStyle">
            <div className="row h-50 m-0">
              <div className="col pt-2">
                <img className="cardImage" src={trainingImage2} />
              </div>
              <div className="col p-2">
                <h6 className="card-title ">{trainingTitle}</h6>
                <p className="card-text ">
                  <small className={`cardDiff `}>{trainingDifficulty}</small>
                </p>
              </div>
            </div>
            <div className="row m-0">
              <div className="card-body">
                <p className="card-text cardDesc line-clamp ">
                  {trainingDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default TrainingCard;
