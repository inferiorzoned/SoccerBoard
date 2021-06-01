import React, { Component } from "react";
import pic from "./test.jpg";

/*
input: 
  trainingImage
  trainingTitle
  trainingDifficulty
  trainingDescription
*/

class TrainingCard extends Component {
  render() {
    const str = "hello";
    const {
      trainingImage,
      trainingTitle,
      trainingDifficulty,
      trainingDescription,
    } = this.props;
    return (
      //   <>
      //     <div class="row">
      //       <div class="col-2" style={{ backgroundColor: "yellow" }}>
      //         {str}
      //       </div>
      //       <div class="col-7" style={{ backgroundColor: "blue" }}>
      //         {str}
      //       </div>
      //       <div class="col-1" style={{ backgroundColor: "yellow" }}>
      //         {str}
      //       </div>
      //       <div class="col-2" style={{ backgroundColor: "blue" }}>
      //         {str}
      //       </div>
      //     </div>
      //   </>

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
      <div className="card w-100">
        <div className="cardStyle">
          <img className="cardImage" src={trainingImage} />
          <div className="card-body">
            <h5 className="card-title">{trainingTitle}</h5>
            <p className="card-text">
              <small className="text-muted">{trainingDifficulty}</small>
            </p>
            <p className="card-text cardDesc line-clamp">
              {trainingDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TrainingCard;
