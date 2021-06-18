import React, { useEffect, useRef } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CmdButton from "./commons/cmdButton";
library.add(faCheck);

const Instruction = ({
  name,
  description,
  isSelected,
  isEditable,
  onBadgeClicked,
  onChange,
  onSave,
  order,
}) => {
  let iClasses = "i-badge";
  if (isSelected) iClasses += " i-badge-selected";
  if (isEditable) iClasses += "d-flex flex-row align-items-center";
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [description]);

  return isEditable ? (
    <div className="d-flex flex-row align-items-center">
      <div className={iClasses}>
        <textarea
          ref={textareaRef}
          rows="1"
          cols="60"
          name={name}
          className="i-input"
          value={description}
          onChange={onChange}
          wrap="soft"
          placeholder="Write instruction here..."
        ></textarea>
      </div>
      <CmdButton
        faIcon={faCheck}
        iconClasses="fa-icon-white"
        buttonClasses="btn-cmd-check mx-5"
        onClick={onSave}
      />
    </div>
  ) : (
    <div className={iClasses} onClick={() => onBadgeClicked(order)}>
      {description}
    </div>
  );
};

export default Instruction;
