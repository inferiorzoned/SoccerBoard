import React, { Component } from "react";
import CardGroup from "./commons/cardGroup";
import { squadPositions, getSquadPositionData } from "../utils/squadData";
import LoaderSoccer from "./commons/loaderSoccer";

class SquadCards extends Component {
  state = { name: "dummy" };
  async componentDidMount() {
    const squadPositionData = await getSquadPositionData();
    this.setState({ squadPositionData });
  }

  getAllKits = (squaddPositionData, squadPositions) => {
    // console.log(squadPositiondData);
    const allKits = [];
    squadPositions.map((positionType, positionTypeIndex) => {
      const positionTypeData = squaddPositionData[positionType];
      console.log(positionTypeData);
      positionTypeData.map((player, playerIdx) => {
        allKits.push({
          label: player["kit"],
          value: "kit",
        });
      });
    });
    return allKits;
  };

  render() {
    const { squadPositionData } = this.state;
    console.log(squadPositionData);
    if (squadPositionData) {
      const allKits = this.getAllKits(squadPositionData, squadPositions);
      // console.log(allKits);
      return (
        <ul style={{ listStyleType: "none" }}>
          {squadPositions.map((positionType, positionTypeIndex) => (
            <li key={positionTypeIndex}>
              <CardGroup
                groupType={"squad"}
                categoryName={positionType}
                categoryData={squadPositionData}
                allKits={allKits}
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
