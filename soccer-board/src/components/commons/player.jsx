import React from "react";

const Player = ({ kit, fromLeft, fromBottom, isGK }) => {
  const left = fromLeft - 4 + "%";
  const bottom = fromBottom - 2 + "%";
  const styles = {
    left: left,
    bottom: bottom,
  };
  const classes = isGK ? "player green" : "player";
  return (
    <div className={classes} style={styles}>
      <div className="kit-no">{kit}</div>
    </div>
  );
};

export default Player;
