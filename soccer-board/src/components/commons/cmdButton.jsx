import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CmdButton = ({ faIcon, buttonClasses, iconClasses, onClick }) => {
  const btnClasses = "btn-cmd " + buttonClasses;
  return (
    <div className={btnClasses} onClick={onClick}>
      <FontAwesomeIcon className={iconClasses} icon={faIcon} />
    </div>
  );
};

export default CmdButton;
