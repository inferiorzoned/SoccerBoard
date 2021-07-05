import React from "react";
import MediaInstruction from "./mediaInstruction";
import TextInstruction from "./textInstruction";

const Instruction = ({
  name,
  instruction,
  isSelected,
  isEditable,
  onBadgeClicked,
  onChange,
  onSave,
  handleMediaStop,
  handleMediaReset,
}) => {
  return (
    <React.Fragment>
      {instruction.type === "text" && (
        <TextInstruction
          name={name}
          text={instruction.content}
          isSelected={isSelected}
          isEditable={isEditable}
          onBadgeClicked={onBadgeClicked}
          onChange={onChange}
          onSave={onSave}
        />
      )}
      {instruction.type === "audio" && (
        <MediaInstruction
          mediaData={instruction.content}
          handleMediaStop={handleMediaStop}
          handleMediaReset={handleMediaReset}
          onBadgeClicked={onBadgeClicked}
          isSelected={isSelected}
        />
      )}
    </React.Fragment>
  );
};

export default Instruction;
