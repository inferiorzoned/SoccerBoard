import React from "react";
import { HashLink } from "react-router-hash-link";
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
          <HashLink className="sideBarRow" smooth to={`/${data.link}`}>
            {data.label}
          </HashLink>
        </li>
      ))}
    </ul>
  );
};

export default SideBarList;
