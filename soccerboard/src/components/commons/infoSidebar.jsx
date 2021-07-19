import React from "react";

// infoHeading: an array of objects containing key and label of the information
// data: object containing the information
// object must contain name, and avatar

const InfoSidebar = ({ infoHeading, data }) => {
  console.log(infoHeading, data);
  return (
    <React.Fragment>
      <div className="image-holder m-2">
        <img src={data.avatar} alt="" id="img" className="img-thumbnail" />
      </div>
      <div className="text-center py-3">{data.name}</div>
      {infoHeading.map((info) => (
        <div key={info.key} className="row">
          <div className="col text-start">{info.label}</div>
          {data[info.key] && data[info.key].constructor === Array ? (
            <div className="col text-start">{data[info.key].toString()}</div>
          ) : (
            <div className="col text-start">{data[info.key]}</div>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default InfoSidebar;
