// Import the React methods we want to use
import React, { useRef, useEffect, useState, useContext } from "react";
import { PexipContext } from "Context/PexipContect";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import File from "../../../assets/pdf/apht_demo.pdf";

// Import the SCSS file for styling
import "./CallMobile.scss";
import { useHistory } from "react-router-dom";
// import Cookies from "js-cookie";

export default function CallMobile() {
  const {
    // pexRTC,
    // dialURI,
    // participantName,
    pinStatus,
    setPinStatus,
    streamSrc,
    setStreamSrc,
    micMute,
    setMicMute,
    vidMute,
    setVidMute,
  } = useContext(PexipContext);
  // Create a reference to the video tag that will hold our video
  const pexipVideoRef = useRef(null);
  // const pexipVideoRef1 = useRef(null);
  const [pexRTC] = useState(new window["PexRTC"]());
  // Create a reference to the pin entry text box
  const enteredPin = useRef("");
  const history = useHistory();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Create a state for pin entry
  // const [pinStatus, setPinStatus] = useState('');
  // // Create a state for the video stream source
  // const [streamSrc, setStreamSrc] = useState(null);
  // // Create a state for microphone mute
  // const [micMute, setMicMute] = useState(false);
  // // Create a state for video mute
  // const [vidMute, setVidMute] = useState(false);
  const [screenLayout, setScreenLayout] = useState({
    // transform : {
    layout: "4:0",
    // }
  });

  // This will run when the component mounts
  useEffect(() => {
    // Linke the callSetup method to the onSetup callback
    pexRTC.onSetup = callSetup;
    // Linke the callConnected method to the onConnect callback
    pexRTC.onConnect = callConnected;
    // Linke the callDisconnected method to the onError callback
    pexRTC.onError = callDisconnected;
    // Linke the callDisconnected method to the onDisconnect callback
    pexRTC.onDisconnect = callDisconnected;

    // Make the actual call with the PexRTC Library
    // The first parameter should be changed to your conference nodes name
    pexRTC.makeCall("pexipdemo.com", "meet.bob", "nabilah");

    // When the component unmounts
    return () => {
      // Disconnect the call
      pexRTC.disconnect();
    };
  }, []);
  // alert(streamSrc)
  // When the stream source is updated
  useEffect(() => {
    // If the source is not null
    if (streamSrc != null) {
      // alert(MediaStream)
      // Check if the source is a MediaStream type
      if (
        typeof MediaStream !== "undefined" &&
        streamSrc instanceof MediaStream
      ) {
        // Set the sourc object to the stream source
        pexipVideoRef.current.srcObject = streamSrc;
        // pexipVideoRef1.current.srcObject = streamSrc;
      } else {
        // It's not a Media Stream so we assume it is just a regular source and apply it
        pexipVideoRef.current.src = streamSrc;
        // pexipVideoRef1.current.src = streamSrc;
      }
    }
  }, [streamSrc]);

  // This method is called when the call is setting up
  function callSetup(stream, pinStatus) {
    // If no pin is required, connect to the call with no pin
    if (pinStatus === "none") {
      pexRTC.connect();
    } else {
      // A pin is either required or optional
      // We use this to show the pin entry popup
      setPinStatus(pinStatus);
    }
  }

  // When the call is connected
  const callConnected = (stream) => {
    // alert(stream)
    // Set the stream source to the stream sent by the PexRTC library
    setStreamSrc(stream);
  };

  // When the call is disconnected
  function callDisconnected(reason = "") {
    history.push("/admin/step6");
  }

  // This method is used to connect to the call with a pin
  function enterCall() {
    pexRTC.connect(enteredPin.current.value);
    setPinStatus("");
  }

  // This method hangs up the cxall
  function hangup() {
    pexRTC.disconnect();
    callDisconnected();
  }

  // Toggle the microphone mute
  function toggleMicMute() {
    setMicMute(pexRTC.muteAudio());
  }

  function changeLayout() {
    pexRTC.transformLayout(screenLayout);
  }

  // function addShareScreen() {
  //   // Tell the pexRTC lib to mute the microphone and store the response
  //   // This will ensure that the mute state is in sync
  //   // pexRTC.getPresentation();
  //   pexRTC.present({ call_type: "screen" });
  // }

  // Toggle the video mute
  function toggleVidMute() {
    setVidMute(pexRTC.muteVideo());
  }

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function firstPage() {
    setPageNumber(1);
  }

  function lastPage() {
    setPageNumber(numPages);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(+1);
  }

  return (
    <div className="bg-darkgray-2 call-mobile">
      <Document
        file={File}
        // file={b64}
        onLoadSuccess={onDocumentLoadSuccess}
        className="px-3"
      >
        <Page pageNumber={pageNumber}></Page>
      </Document>
      <div className="flex mt-3">
        <button className="btn-ttd">TTD</button>
        <div className="callContainer">
          <div className="callVideoContainer">
            <video
              ref={pexipVideoRef}
              autoPlay="autoplay"
              className="mx-auto"
            ></video>
          </div>
          <div className="callVideoControls">
            <div className="callVideoControl" onClick={() => hangup()}>
              <i className={"fa fa-phone-slash"}></i>
            </div>
            {/* <div className="callVideoControl" onClick={() => addShareScreen()}>
          <i className={"fa fa-tv"}></i>
        </div> */}
            {/* If the mic is muted, show one button state, otherwise show the other */}
            {micMute ? (
              <div
                className="callVideoControl active"
                onClick={() => toggleMicMute()}
              >
                <i className={"fa fa-microphone-slash"}></i>
              </div>
            ) : (
              <div className="callVideoControl" onClick={() => toggleMicMute()}>
                <i className={"fa fa-microphone"}></i>
              </div>
            )}
            {vidMute ? (
              <div
                className="callVideoControl active"
                onClick={() => toggleVidMute()}
              >
                <i className={"fa fa-video-slash"}></i>
              </div>
            ) : (
              <div className="callVideoControl" onClick={() => toggleVidMute()}>
                <i className={"fa fa-video"}></i>
              </div>
            )}
          </div>
          {pinStatus === "" ? (
            <></>
          ) : (
            <div className="callPinRequestContainer">
              <div className="callPinRequestWindow">
                <div className="callPinTitle">
                  {pinStatus === "required"
                    ? "A PIN is required to enter this meeting"
                    : "Enter your PIN or press Connect"}
                </div>

                <div className="callPinContent">
                  <div className="callPinContentHead">Your Pin</div>
                  <div className="callPinContentBody">
                    <input type="text" ref={enteredPin} />
                  </div>
                </div>

                <div className="callPinContentButton">
                  <button onClick={() => enterCall()}>Connect</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
