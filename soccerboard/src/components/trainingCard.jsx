import React, { Component } from "react";
import pic from "./test.jpg";

class TrainingCard extends Component {
  render() {
    const str = "hello";
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
      <div className="card bg-light mb-3 mb-3" style={{ width: "18rem" }}>
        <div className="container">
          <div className="row card-header">
            <div className="col-6">
              <img className="card-img-top" src={pic} width="100%" />
            </div>
            <div className="col-6">
              <div className="row">
                <div className="card-text">
                  <h5 class="card-title">Card title</h5>
                </div>
              </div>
              <div className="row">
                <p className="card-text">
                  <small className="text-muted">Beginner</small>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TrainingCard;
