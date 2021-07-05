import React from "react";
import Draggable from "react-draggable";

// const Player = ({ kit, fromLeft, fromBottom, isGK, isSelected, onClick }) => {
//   const left = fromLeft - 4 + "%";
//   const bottom = fromBottom - 2 + "%";
//   const styles = {
//     left: left,
//     bottom: bottom,
//   };
//   let classes = isGK ? "player green" : "player";
//   if (isSelected) classes += " violet";
//   return (
//     <div className={classes} style={styles} onClick={onClick}>
//       <div className="kit-no">{kit}</div>
//     </div>
//   );
// };

const Player = ({
  kit,
  fromLeft,
  fromTop,
  isGK,
  isSelected,
  onClick,
  savePosition,
}) => {
  const fieldHeight = 735;
  const fieldWidth = 472;
  let x = fieldWidth * (fromLeft / 100) - 24;
  let y = fieldHeight * (fromTop / 100) - 24;
  let classes = isGK ? "player green" : "player";
  if (isSelected) classes += " violet";
  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: x, y: y }}
      onStop={(e, data) => {
        const left = (data.x + 24) * (100 / fieldWidth);
        const top = (data.y + 24) * (100 / fieldHeight);
        // console.log(_x, _y);
        savePosition({ left: left, top: top });
      }}
    >
      <div className={classes} onClick={onClick}>
        <div className="kit-no">{kit}</div>
      </div>
    </Draggable>
  );
};

export default Player;
