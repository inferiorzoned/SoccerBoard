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

  let audioUrl = mediaData.url;
  if (mediaData) {
    if (!mediaData.url) audioUrl = mediaData;
  }

  return (
    <div className={iClasses}>
      {audioUrl ? (
        <div className="i-badge-record" onClick={onBadgeClicked}>
          <AudioPlayer uri={audioUrl} />
        </div>
      ) : (
        <div className="d-flex flex-row">
          <AudioRecorder
            audioURL={audioUrl}
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
