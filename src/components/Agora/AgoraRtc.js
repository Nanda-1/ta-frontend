import React, { useState } from "react";
import Cookies from "js-cookie";

const appId = "15ade710d3de457bbd2ddc96f487c621"; //ENTER APP ID HERE7eJxTYPjPIsG6PXX/ptlCk40LKt7nFy71Y4j7ZO5yaEHxfedXTyUUGAxNE1NSzQ0NUoxTUk1MzZOSUoxSUpItzdJMLMyTzYwMv8+sTW4IZGToYytmZWSAQBCfnaEktbgkMy+dgQEAsIUg/g==";

const AgoraRtc = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  if (inCall) {
    Cookies.set("channelName", channelName);
    window.location.reload();
  }
  return (
    <div>
      <h1 className="heading" style={{ marginTop: "20px" }}>
        Agora RTC NG SDK React Wrapper
      </h1>
      <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
    </div>
  );
};

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;
  return (
    <form className="join">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default AgoraRtc;
