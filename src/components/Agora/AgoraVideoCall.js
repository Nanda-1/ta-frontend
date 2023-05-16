import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import { useParams } from "react-router";

const appId = "15ade710d3de457bbd2ddc96f487c621"; //ENTER APP ID HERE
const token =
  "007eJxTYGBg/Vg6oTf1ZloLX2ioZuOqOawLMrvfeTQ9Fmta/Sq89YECg6FpYkqquaFBinFKqompeVJSilFKSrKlWZqJhXmymZHh2uNJKQ2BjAy7O5yYGBkgEMRnZyhJLS7JzEtnYAAArdQhRQ==";

const AgoraVideoCall = () => {
  const setInCall = true;

  let { channelName } = useParams();
  let channel = channelName;
  return (
    <div className="px-4 h-screen">
      <VideoCall setInCall={setInCall} channelName={channel} />
    </div>
  );
};

const useClient = createClient({ mode: "rtc", codec: "vp8" });
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        // console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });
      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });
      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    if (ready && tracks) {
      // console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="App">
      {start && tracks && (
        <Videos
          users={users}
          tracks={tracks}
          ready={ready}
          setStart={setStart}
          setInCall={setInCall}
        />
      )}
    </div>
  );
};

const Videos = (props) => {
  const { users, tracks, ready, setInCall, setStart } = props;

  return (
    <div>
      <div>
        <div id="videos" className="grid grid-cols-2">
          {/* <div id="videos" className={users.length > 2 ? "grid grid-cols-2" : ""}> */}
          <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer
                    className="vid"
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                );
              } else return null;
            })}
        </div>
      </div>
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
    </div>
  );
};

export const Controls = (props) => {
  // const client = useClient();
  const { tracks } = props;
  // const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  // const leaveChannel = async () => {
  //   await client.leave();
  //   client.removeAllListeners();
  //   tracks[0].close();
  //   tracks[1].close();
  //   setStart(false);
  //   setInCall(false);
  //   window.location.reload();
  // };

  return (
    <div className="controls w-full bg-white rounded-lg mt-2">
      <p onClick={() => mute("audio")} className="my-2">
        {trackState.audio ? (
          <i
            className={"fa fa-microphone fa-lg"}
            style={{ color: "black", width: "16.62px" }}
          ></i>
        ) : (
          <i
            className={"fa fa-microphone-slash fa-lg"}
            style={{ color: "black" }}
          ></i>
        )}
      </p>
      <p onClick={() => mute("video")}>
        {trackState.video ? (
          <i className={"fa fa-video fa-lg"} style={{ color: "black" }}></i>
        ) : (
          <i
            className={"fa fa-video-slash fa-lg"}
            style={{ color: "black" }}
          ></i>
        )}
      </p>
    </div>
  );
};

export default AgoraVideoCall;
