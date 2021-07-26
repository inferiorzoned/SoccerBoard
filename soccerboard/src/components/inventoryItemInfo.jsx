import React, { Component } from "react";
import InfoSidebar from "./commons/infoSidebar";
import LeftAngle from "./commons/leftAngle";
import RightAngle from "./commons/rightAngle";
import EditInventoryModel from "./editInventoryModel";

class InventoryItemInfo extends Component {
  state = { editModel: false };

  setEditModelForm = (toEdit) => {
    this.setState({ editModel: toEdit });
  };

  render() {
    const {
      title,
      infoHeading,
      data,
      leftOnClick,
      rightOnClick,
      handleEditModel,
    } = this.props;
    console.log(data);
    // console.log(title);
    if (!data) {
      return null;
    }

    if (this.state.editModel) {
      return (
        <EditInventoryModel
          title={title}
          infoHeading={infoHeading}
          modelData={data}
          handleEditModel={handleEditModel}
        />
      );
    }
    return (
      <div className="sideBar" style={{ width: "300px", fontSize: "small" }}>
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
        <div className="text-center py-3">{data.modelLabel}</div>
        <div className="m-3">
          {infoHeading.map((info) => (
            <div key={info.key} className="row">
              <div className="col-sm-8 text-start">{info.label}</div>
              <div className="col-sm-4 text-start">{data[info.key]}</div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={() => this.setEditModelForm(true)}
        >
          Edit
        </button>
      </div>
    );
  }
}

export default InventoryItemInfo;
