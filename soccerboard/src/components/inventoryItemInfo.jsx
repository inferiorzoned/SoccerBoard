import React, { Component } from "react";
import InfoSidebar from "./commons/infoSidebar";
import LeftAngle from "./commons/leftAngle";
import RightAngle from "./commons/rightAngle";

class InventoryItemInfo extends Component {
  state = {};
  render() {
    const { title, infoHeading, data, leftOnClick, rightOnClick } = this.props;
    console.log(data);
    console.log(title);
    if (!data) {
      return null;
    }
    return (
      <div className="sideBar" style={{ width: "300px" }}>
        <h3>{title}</h3>
        {/* <InfoSidebar infoHeading={infoHeading} data={data} /> */}
        <div className="row ">
          <div className="col-sm-2">
            <LeftAngle onClick={leftOnClick} />
          </div>
          <div className="col-sm-8">
            <div className="image-holder m-2 ">
              <img
                src={data.avatar}
                alt=""
                id="img"
                className="img-thumbnail"
              />
            </div>
          </div>
          <div className="col-sm-2">
            <RightAngle onClick={rightOnClick} />
          </div>
        </div>
        <div className="text-center py-3">{data.label}</div>
        <div className="m-3">
          {infoHeading.map((info) => (
            <div key={info.key} className="row">
              <div className="col-sm-8 text-start">{info.label}</div>
              <div className="col-sm-4 text-start">{data[info.key]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default InventoryItemInfo;
