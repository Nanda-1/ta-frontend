import React, { useContext } from "react";
// import "./MultiStepProgressBar.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { MyAphtcontext } from "Context/AphtContext";

const MultiStepProgressBar = props => {
  const { inputApht } = useContext(MyAphtcontext);

  var stepPercentage = 0;

  if(inputApht.tipe_debitor === 'personal'){
    if(inputApht.status_debitor === 'menikah'){
      if (props.currentStep < 8) {
        stepPercentage = 0;
      }else if(props.currentStep === 8){
        stepPercentage = 34;
      }else if(inputApht.tipe_kreditor === 'personal'){
        if(inputApht.status_kreditor === 'menikah'){
          if (props.currentStep === 8 || props.currentStep < 12) {
            stepPercentage = 34;
          } else if (props.currentStep === 12 || props.currentStep < 15) {
            stepPercentage = 67;
          } else if (props.currentStep > 15) {
            stepPercentage = 100;
          } else {
            stepPercentage = 0;
          }
        }else{
          if (props.currentStep === 8 || props.currentStep < 11) {
            stepPercentage = 34;
          } else if (props.currentStep === 11 || props.currentStep < 12) {
            stepPercentage = 67;
          } else if (props.currentStep > 12) {
            stepPercentage = 100;
          } else {
            stepPercentage = 0;
          }
        }
      }else{
        if (props.currentStep === 8 || props.currentStep < 11) {
          stepPercentage = 34;
        } else if (props.currentStep === 11 || props.currentStep < 13) {
          stepPercentage = 67;
        } else if (props.currentStep > 13) {
          stepPercentage = 100;
        } else {
          stepPercentage = 0;
        }
      }
    }else{
      if (props.currentStep < 7) {
        stepPercentage = 0;
      }else if(props.currentStep === 7){
        stepPercentage = 34;
      }else if(inputApht.tipe_kreditor === 'personal'){
        if(inputApht.status_kreditor === 'menikah'){
          if (props.currentStep === 7 || props.currentStep < 11) {
            stepPercentage = 34;
          } else if (props.currentStep === 11 || props.currentStep < 15) {
            stepPercentage = 67;
          } else if (props.currentStep > 15) {
            stepPercentage = 100;
          } else {
            stepPercentage = 0;
          }
        }else{
          if (props.currentStep === 7 || props.currentStep < 10) {
            stepPercentage = 34;
          } else if (props.currentStep === 10 || props.currentStep < 15) {
            stepPercentage = 67;
          } else if (props.currentStep > 15) {
            stepPercentage = 100;
          } else {
            stepPercentage = 0;
          }
        }
      }else{
        if (props.currentStep === 9 || props.currentStep < 10) {
          stepPercentage = 34;
        } else if (props.currentStep === 10 || props.currentStep < 12) {
          stepPercentage = 67;
        } else if (props.currentStep > 12) {
          stepPercentage = 100;
        } else {
          stepPercentage = 0;
        }
      }
    }
  }else{
    if (props.currentStep < 4) {
      stepPercentage = 0;
    }else if (props.currentStep === 4 ){
      stepPercentage = 34;
    }else if(inputApht.tipe_kreditor === 'personal'){
      if(inputApht.status_kreditor === 'menikah'){
        if (props.currentStep === 4 || props.currentStep < 8) {
          stepPercentage = 34;
        } else if (props.currentStep === 8 || props.currentStep < 9) {
          stepPercentage = 67;
        } else if (props.currentStep > 10) {
          stepPercentage = 100;
        } else {
          stepPercentage = 0;
        }
      }else{
        if (props.currentStep === 4 || props.currentStep < 7) {
          stepPercentage = 34;
        } else if (props.currentStep === 7 || props.currentStep < 8) {
          stepPercentage = 67;
        } else if (props.currentStep > 9) {
          stepPercentage = 100;
        } else {
          stepPercentage = 0;
        }
      }
    }else{
      if (props.currentStep === 4 || props.currentStep < 7) {
        stepPercentage = 34;
      } else if (props.currentStep === 7 || props.currentStep < 9) {
        stepPercentage = 67;
      } else if (props.currentStep > 9) {
        stepPercentage = 100;
      } else {
        stepPercentage = 0;
      }
    }
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
          <div className='absolute pt-12 text-xs w-36 text-center text-blue'>Data Debitor</div>
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
           <div className='absolute pt-12 text-xs w-36 text-center text-blue'>Data Kreditor</div>
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
          <div className='absolute pt-12 text-xs w-36 text-center text-blue'>Materi dan Stempel</div>
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
          <div className='absolute pt-12 text-xs w-36 text-center text-blue'>Ringkasan</div>
          </>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
