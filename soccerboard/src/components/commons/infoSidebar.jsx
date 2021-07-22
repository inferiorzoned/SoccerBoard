import React from "react";

// infoHeading: an array of objects containing key and label of the information
// data: object containing the information
// object must contain name, and avatar

const InfoSidebar = ({ infoHeading, data }) => {
  return (
    <div className="sidebar p-4">
      <div className="image-holder m-2 align-self-center">
        <img src={data.avatar} alt="" id="img" className="img-thumbnail" />
      </div>
      <div className="sidebar-name">{data.name}</div>

      <table style={{ tableLayout: "fixed", width: "100%" }}>
        <tbody>
          {infoHeading.map((info) => (
            <tr key={info.key}>
              <td className="sidebar-table-label">{info.label}</td>
              {data[info.key] && data[info.key].constructor === Array ? (
                <td className="sidebar-table-value">
                  {data[info.key].toString().replaceAll(",", ", ")}
                </td>
              ) : (
                <td className="sidebar-table-value">{data[info.key]}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoSidebar;
