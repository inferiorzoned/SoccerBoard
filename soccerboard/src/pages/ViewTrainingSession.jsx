import React from "react";
import TrainingSession from "./trainingSession";

const ViewTrainingSession = () => {
  return (
    <TrainingSession
      sessionId={window.location.pathname.substr(
        window.location.pathname.lastIndexOf("/") + 1
      )}
    />
  );
};

export default ViewTrainingSession;
