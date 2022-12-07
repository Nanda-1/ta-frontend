import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import Cookies from "js-cookie";

const appId = "15ade710d3de457bbd2ddc96f487c621"; //ENTER APP ID HERE
const token =
  "007eJxTYPAubJ2bFZuavH7mhXu6BWzL2Hps90V+r+g8VBi6qljtyT0FBkPTxJRUc0ODFOOUVBNT86SkFKOUlGRLszQTC/NkMyPDdvYJyQ2BjAztjh3MjAwQCOKzM5SkFpdk5qUzMAAAzpQg+g==";

const AgoraVideoCall = () => {
  const [inCall, setInCall] = useState(true);
  let channel = Cookies.get("channelName");
  return (
    <div>
      <h1 className="heading" style={{ marginTop: "20px" }}>
        Agora RTC NG SDK React Wrapper
      </h1>
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
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = (props) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
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
  );
};

export const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
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

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    Cookies.remove("channelName");
    window.location.reload();
  };
  return (
    <div className="controls">
      <p onClick={() => mute("audio")}>
        {trackState.audio ? (
          <i className={"fa fa-microphone"} style={{ color: "white" }}></i>
        ) : (
          <i
            className={"fa fa-microphone-slash"}
            style={{ color: "white" }}
          ></i>
        )}
      </p>
      <p onClick={() => mute("video")}>
        {trackState.video ? (
          <i className={"fa fa-video"} style={{ color: "white" }}></i>
        ) : (
          <i className={"fa fa-video-slash"} style={{ color: "white" }}></i>
        )}
      </p>
      {<p onClick={() => leaveChannel()}> <i className={"fa fa-phone-slash"} style={{ color: "white" }}></i></p>}
    </div>
  );
};

export default AgoraVideoCall;
