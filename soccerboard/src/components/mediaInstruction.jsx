import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import AudioRecorder from "./audioRecorder";
import AudioPlayer from "./commons/audioPlayer";
library.add(faCheck);

const MediaInstruction = ({
  mediaData,
  handleMediaStop,
  handleMediaReset,
  isSelected,
  onBadgeClicked,
}) => {
  let iClasses = "i-badge";
  if (isSelected) iClasses += " i-badge-selected";
  return (
    <div className={iClasses}>
      {mediaData.url ? (
        <div className="i-badge-record" onClick={onBadgeClicked}>
          <AudioPlayer uri={mediaData.url} />
        </div>
      ) : (
        <div className="d-flex flex-row">
          <AudioRecorder
            audioURL={mediaData.url}
            handleAudioStop={handleMediaStop}
            handleReset={handleMediaReset}
            mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
          />
        </div>
      )}
    </div>
  );
};

export default MediaInstruction;
