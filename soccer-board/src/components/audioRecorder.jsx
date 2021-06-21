import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRedoAlt,
  faPlay,
  faPause,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import CmdButton from "./commons/cmdButton";

const audioType = "audio/*";

library.add(faRedoAlt, faPlay, faPause, faStop);

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 0,
      recording: false,
      stopped: false,
      medianotFound: false,
      audioURL: null,
      audioBlob: null,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleAudioPause(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.mediaRecorder.pause();
    this.setState({ pauseRecord: true });
  }
  handleAudioStart(e) {
    e.preventDefault();
    this.startTimer();
    this.mediaRecorder.resume();
    this.setState({ pauseRecord: false });
  }

  startTimer() {
    //if (this.timer === 0 && this.state.seconds > 0) {
    this.timer = setInterval(this.countDown, 1000);
    //}
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  async componentDidMount() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.props.mimeTypeToUseWhenRecording) {
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: this.props.mimeTypeToUseWhenRecording,
        });
      } else {
        this.mediaRecorder = new MediaRecorder(stream);
      }
      this.chunks = [];
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };
      this.startRecording();
    } else {
      this.setState({ medianotFound: true });
      console.log("Media Decives will work only with SSL.....");
    }
  }

  startRecording = () => {
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    this.startTimer();
    // say that we're recording
    this.setState({ recording: true });
  };

  handleStartRecording(e) {
    e.preventDefault();
    this.startRecording();
  }

  stopRecording(e) {
    clearInterval(this.timer);
    this.setState({ time: {} });
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false, pauseRecord: false, stopped: true });
    // save the video to memory
    this.saveAudio();
  }

  handleReset(e) {
    if (this.state.recording) {
      this.stopRecording(e);
    }
    this.setState(
      {
        time: {},
        seconds: 0,
        recording: false,
        stopped: false,
        medianotFound: false,
        audioURL: null,
        audioBlob: null,
      },
      () => {
        this.props.handleReset(this.state);
      }
    );
  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: audioType });
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    this.setState({ audioURL, audioBlob: blob });
    this.props.handleAudioStop({
      url: audioURL,
      blob: blob,
      chunks: this.chunks,
      duration: this.state.time,
    });
  }

  render() {
    const { recording, time, medianotFound, pauseRecord, stopped } = this.state;
    const { audioURL, iconClasses } = this.props;
    let { buttonClasses } = this.props;

    buttonClasses = buttonClasses ? buttonClasses : "btn-cmd-mini";

    return (
      <div>
        {!medianotFound && (
          <div className="recorder">
            {audioURL && stopped ? null : ( //   <AudioPlayer uri={audioURL} />
              <div className="recorder-timer-box">
                <span className="recorder-timer-font">
                  {time.m !== undefined
                    ? `${time.m <= 9 ? "0" + time.m : time.m}`
                    : "00"}
                </span>
                <span className="recorder-timer-font">:</span>
                <span className="recorder-timer-font">
                  {time.s !== undefined
                    ? `${time.s <= 9 ? "0" + time.s : time.s}`
                    : "00"}
                </span>
              </div>
            )}
            <div className="d-flex flex-row align-items-center justify-content-center">
              {!recording ? (
                <React.Fragment>
                  {stopped && (
                    <CmdButton
                      faIcon={faRedoAlt}
                      buttonClasses={buttonClasses}
                      iconClasses={iconClasses}
                      onClick={(e) => this.handleReset(e)}
                    />
                  )}
                </React.Fragment>
              ) : (
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {pauseRecord ? (
                    <CmdButton
                      faIcon={faPlay}
                      buttonClasses={buttonClasses}
                      iconClasses={iconClasses}
                      onClick={(e) => this.handleAudioStart(e)}
                    />
                  ) : (
                    <CmdButton
                      faIcon={faPause}
                      buttonClasses={buttonClasses}
                      iconClasses={iconClasses}
                      onClick={(e) => this.handleAudioPause(e)}
                    />
                  )}
                  <CmdButton
                    faIcon={faStop}
                    buttonClasses={buttonClasses}
                    iconClasses={iconClasses}
                    onClick={(e) => this.stopRecording(e)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AudioRecorder;
