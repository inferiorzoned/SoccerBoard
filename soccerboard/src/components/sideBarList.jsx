import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sideBarData } from "../utils/sideBarData";

/*
input: 
    pageName
    sectionType

output: rendered sideBarList
*/

const SideBarList = (props) => {
  const { pageName, sectionType } = props;

  if (typeof sideBarData[sectionType][pageName] === "undefined") return null;

  return (
    <ul className="sideBarList">
      {sideBarData[sectionType][pageName].map((data, index) => (
        <li key={index} className="sideBarRow">
          <Link className="sideBarRow" to={`/${data.link}`}>
            {data.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideBarList;
