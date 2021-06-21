import React from "react";

const AudioPlayer = ({ uri }) => {
  return (
    <div className="audio-player">
      <audio controls>
        <source src={uri} type="audio/ogg" />
        <source src={uri} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
