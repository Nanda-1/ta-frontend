import React, { createContext, useState } from "react";

export const AgoraContext = createContext();

export const AgoraProvider = (props) => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <AgoraContext.Provider
      value={{
        inCall,
        setInCall,
        channelName,
        setChannelName,
      }}
    >
      {props.children}
    </AgoraContext.Provider>
  );
};
