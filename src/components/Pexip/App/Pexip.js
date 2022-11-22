// Import useState for our React Hooks
import React, { useState } from "react";
// Import our CSS
import "./App.scss";

// Import the Preflight component
import Preflight from "../Preflight/Preflight";
import Preflight2 from "../Preflight/Preflight2";
// Import the Call component
import Call from "../Call/Call";
import Call2 from "../Call/Call2";

// Our App function
class Pexip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      dialURI: "",
      participantName: "",
    };

    this.addRoom = this.addRoom.bind(this);
    // this.addParticipantName = this.addParticipantName.bind(this);
  }

  addRoom(uri, name) {
    this.setState((prevState) => {
      return {
        ...prevState,
        dialURI: uri,
        participantName: name,
        currentStep: 2
      };
    });
  }

  // Return the JSX for the page to render
  render() {
    return (
      <>
        {this.state.currentStep === 1 ? (
          <Preflight2
            pexRTC={this.state.pexRTC}
            addRoom={this.addRoom}
            // addParticipantName={this.addParticipantName}
          />
        ) : (
          <Call2
            pexRTC={this.state.pexRTC}
            setDialURI={this.state.dialURI}
            setParticipantName={this.state.participantName}
          />
        )}
      </>
    );
  }
}

// Export the Pexip
export default Pexip;
