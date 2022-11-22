// Import the React methods we want to use
import React, { useRef, useEffect, useState, useContext } from "react";
import { PexipContext } from "Context/PexipContect";

// Import the SCSS file for styling
import "./Preflight.scss";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Preflight2 = props => {
  const {
    audioDevices,
    setAudioDevices,
    videoDevices,
    setVideoDevices,
  } = useContext(PexipContext);
  // Create a reference for our participant name input field
  // alert(dialURI)
  const [pexRTC] = useState(new window["PexRTC"]());
  const history = useHistory();
  const participantName = useRef("");
  // Create a refernece for our dial URL input field
  const dialURI = useRef("");
  // Create a refernece for our video device selector
  const videoDevice = useRef("");
  // Create a refernece for our audio device selector
  const audioDevice = useRef("");

  // This method is called on button push to connect our call
  function connectCall() {
    // Set our Dial URI for other components to use
    // setDialURI(dialURI.current.value);
    let uri = dialURI.current.value
    let name = participantName.current.value
    // Set our participant name for other components to use
    // setParticipantName(participantName.current.value);
    props.addRoom(uri, name)
    // props.addParticipantName(name)

    // If a video device has been selected
    if (videoDevice !== "loading") {
      // Set the video device to the ID from our video dropdown
      pexRTC.video_device = videoDevice.current.value;
    }

    // If an audio device has been selected
    if (audioDevice !== "loading") {
      // Set the audio device to the ID from our audio dropdown
      pexRTC.audio_device = audioDevice.current.value;
    }

    // Navigate to the call component
    // navigate('/call');
    // history.push("/admin/step6/call");
  }

  // Important! You must have a valid SSL cert for device selection to work!!
  // This useEffect will run when the component loads
  useEffect(() => {
    // Set the constraints of the video to search for
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    let constraints = {
      video: {
        height: 1080,
        width: 1920,
      },
      audio: true,
    };

    // An async function to get the video and audio devices
    async function getMediaDevices(constraints) {
      // Request permission to list devices
      await navigator.mediaDevices.getUserMedia(constraints);
      // Enumerate the devices
      let devices = await navigator.mediaDevices.enumerateDevices();

      // Filter only video devices
      let video_devices = devices.filter((d) => d.kind === "videoinput");
      // Filter only audio devices
      let audio_devices = devices.filter((d) => d.kind === "audioinput");

      // Set the Video Devices so we can show on the UI
      setVideoDevices(video_devices);
      // Set the Audio Devices so we can show on the UI
      setAudioDevices(audio_devices);
    }

    // Run the async function
    getMediaDevices(constraints);
  }, [setAudioDevices, setVideoDevices]);

  return (
    <div className="preflightContainer">
      <div className="preflightTitle">Get Started</div>
      <div className="preflightContent">
        <div className="preflightContentHead">Your Name</div>
        <div className="preflightContentBody z-10">
          <input type="text" ref={participantName} />
        </div>

        <div className="preflightContentHead">URI to Dial</div>
        <div className="preflightContentBody">
          <input type="text" ref={dialURI} />
        </div>

        <div className="preflightContentHead">Video Device</div>
        <div className="preflightContentBody">
          <select ref={videoDevice}>
            {/*
              Iterate through the video devices, if the array is not empty
              If it is empty, show a loading message
              */}
            {videoDevices === [] ? (
              <option value="loading">Loading...</option>
            ) : (
              videoDevices.map((device) => {
                return <option value={device.deviceId}>{device.label}</option>;
              })
            )}
          </select>
        </div>

        <div className="preflightContentHead">Audio Device</div>
        <div className="preflightContentBody">
          <select ref={audioDevice}>
            {/*
              Iterate through the audio devices, if the array is not empty
              If it is empty, show a loading message
              */}
            {audioDevices === [] ? (
              <option value="loading">Loading...</option>
            ) : (
              audioDevices.map((device) => {
                return <option value={device.deviceId}>{device.label}</option>;
              })
            )}
          </select>
        </div>

        <div className="preflightContentButton">
          <button onClick={() => connectCall()}>Connect</button>
        </div>
      </div>
    </div>
  );
}

export default Preflight2;
