import React from "react";

const Player = ({ kit, fromLeft, fromBottom, isGK, isSelected, onClick }) => {
  const left = fromLeft - 4 + "%";
  const bottom = fromBottom - 2 + "%";
  const styles = {
    left: left,
    bottom: bottom,
  };
  let classes = isGK ? "player green" : "player";
  if (isSelected) classes += " violet";
  return (
    <div className={classes} style={styles} onClick={onClick}>
      <div className="kit-no">{kit}</div>
    </div>
  );
};

export default Player;
