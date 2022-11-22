import React, { createContext, useState } from "react";

export const PexipContext = createContext();

export const PexipProvider = (props) => {
  // Create a reference for the URI to dial
  const [dialURI, setDialURI] = useState("");
  // Create a reference for the name of the participant
  const [participantName, setParticipantName] = useState("");
  const [pinStatus, setPinStatus] = useState("");
  // Create a state for storing the video device list
  const [videoDevices, setVideoDevices] = useState([]);
  // Create a state for storing the audio device list
  const [audioDevices, setAudioDevices] = useState([]);
  const [streamSrc, setStreamSrc] = useState({});
  // Create a state for microphone mute
  const [micMute, setMicMute] = useState(false);
  // Create a state for video mute
  const [vidMute, setVidMute] = useState(false);

  return (
    <PexipContext.Provider
      value={{
        dialURI,
        setDialURI,
        participantName,
        setParticipantName,
        videoDevices,
        setVideoDevices,
        audioDevices,
        setAudioDevices,
        streamSrc,
        setStreamSrc,
        micMute,
        setMicMute,
        vidMute,
        setVidMute,
        pinStatus,
        setPinStatus,
      }}
    >
      {props.children}
    </PexipContext.Provider>
  );
};
