import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = (props) => {
  var stepPercentage = 0;

  // if (props.currentStep === 1) {
  //   stepPercentage = 0;
  // } else if (props.currentStep === 2) {
  //   stepPercentage = 17;
  // } else if (props.currentStep === 3) {
  //   stepPercentage = 34;
  // } else if (props.currentStep === 4) {
  //   stepPercentage = 51;
  // } else if (props.currentStep === 5) {
  //   stepPercentage = 68;
  // } else if (props.currentStep === 6) {
  //   stepPercentage = 85;
  // } else if (props.currentStep === 7) {
  //   stepPercentage = 100;
  // } else {
  //   stepPercentage = 0;
  // }

  if (props.currentStep === 1) {
    stepPercentage = 0;
  } else if (props.currentStep === 2) {
    stepPercentage = 16;
  } else if (props.currentStep === 3) {
    stepPercentage = 32;
  } else if (props.currentStep === 4) {
    stepPercentage = 48;
  } else if (props.currentStep === 5) {
    stepPercentage = 64;
  } else if (props.currentStep === 6) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      {/* <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute mt-10 text-sm w-48 text-center text-blue">
              <small> SK PPAT</small>
            </div>
          </>
        )}
      </Step> */}
      <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute mt-10 text-sm w-36 text-center text-blue">
              <small>Foto KTP</small>
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
            <div className="absolute mt-10 text-sm w-36 text-center text-blue">
              <small>Foto NPWP</small>
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
            <div className="absolute mt-10 text-sm w-36 text-center text-blue">
              <small>Foto BPJS</small>
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
            <div className="absolute mt-10 text-sm w-48 text-center text-blue">
              <small> Data Diri</small>
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
            <div className="absolute mt-10 text-sm w-48 text-center text-blue">
              <small> Swafoto</small>
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
            <div className="absolute mt-10 text-sm w-48 text-center text-blue">
              <small> Rekam Wajah</small>
            </div>
          </>
        )}
      </Step>
      {/* <Step>
        {({ accomplished, index }) => (
          <>
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
            <div className="absolute mt-10 text-sm w-48 text-center text-blue">
              <small>Tanda Tangan</small>
            </div>
          </>
        )}
      </Step> */}
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
