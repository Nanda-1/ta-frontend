import React from "react";
// import "./MultiStepProgressBar.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = (props) => {
  var stepPercentage = 0;

  if (props.currentStep.includes("pembeli")) {
    stepPercentage = 34;
  } else if (
    props.currentStep === "dokumen" ||
    props.currentStep === "stamping"
  ) {
    stepPercentage = 67;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute pt-12 text-xs w-36 text-center text-blue">
              Data Penjual
            </div>
          </>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute pt-12 text-xs w-36 text-center text-blue">
              Data Pembeli
            </div>
          </>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute pt-12 text-xs w-36 text-center text-blue">
              Meterai dan Stempel
            </div>
          </>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute pt-12 text-xs w-36 text-center text-blue">
              Ringkasan
            </div>
          </>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
