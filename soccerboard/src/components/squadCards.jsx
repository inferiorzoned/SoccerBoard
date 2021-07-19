import React, { Component } from "react";
import CardGroup from "./commons/cardGroup";
import { squadPositions, getSquadPositionData } from "../utils/squadData";
import { CircularProgress } from "@material-ui/core";
import LoaderSoccer from "./commons/loader";

class SquadCards extends Component {
  state = { name: "dummy" };
  async componentDidMount() {
    const squadPositionData = await getSquadPositionData();
    this.setState({ squadPositionData });
  }

  render() {
    const { squadPositionData } = this.state;
    console.log(squadPositionData);
    if (squadPositionData) {
      return (
        <ul style={{ listStyleType: "none" }}>
          {squadPositions.map((positionType, positionTypeIndex) => (
            <li key={positionTypeIndex}>
              <CardGroup
                groupType={"squad"}
                categoryName={positionType}
                categoryData={squadPositionData}
              />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="centered">
        {/* <CircularProgress color="secondary" /> */}
        <LoaderSoccer />
      </div>
    );
  }
}

export default SquadCards;
