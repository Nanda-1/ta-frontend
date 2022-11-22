import React, { Component } from "react";
// import { Link } from "react-router-dom";
import swal from "sweetalert";

import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";

//1.Foto KTP
import Step1 from "./Step2";
//2.Foto NPWP
import Step2 from "./Step2a";
//3.Foto BPJS
import Step3 from "./Step2b";
//5.Swafoto
import Step4 from "./Step3";
//4.Data Diri
import Step5 from "./Step3r";
//6.Rekam Wajah
import Step6 from "./Step4";
//7.Tandatangan
// import Step7 from "./Step5";

// import styled from "styled-components";
import MultiStepProgressBar from "./MultiStepProgressBar";

//get data from context
import { RegistContext } from "views/auth/RegistContext";

class MasterForm extends Component {
  static contextType = RegistContext;

  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,
      email: "",
      username: "",
      password: "",
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 5 ? 6 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
    // if (currentStep === 6) {
    //   this.context.testFaceAPI();
    // }

    //sbentar
    if (currentStep === 5) {
      this.context.cekKTP();
    }
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button
          className="get-started shadow text-black font-bold px-6 py-3 mb-4 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-sky-600 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
          onClick={this._prev}
        >
          Kembali
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 6) {
      return (
        <>
          <Button
            className="text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-4 bg-blue-500 active:bg-indigo-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 float-right"
            onClick={this._next}
          >
            Lanjutkan
          </Button>
          <hr className="pt-6 border-0" />
        </>
      );
    }
    // ...else render nothing
    return null;
  }

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    swal("Apakah anda telah memiliki tanda tangan elektronik sebelumnya ??", {
      buttons: {
        cancel: "Batal",
        catchSign: {
          text: "Belum",
          value: "catchSign",
        },
        catchCA: {
          text: "Sudah",
          value: "catchCA",
        },
      },
    }).then((value) => {
      switch (value) {
        case "catchSign":
          this.context.toSign();
          break;

        case "catchCA":
          this.context.toCA();
          break;

        default:
          swal("Submit dibatalkan");
      }
    });
  };

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 5) {
      return (
        <>
          <Button
            onClick={this.handleSubmit}
            className="text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-4 bg-blue-500 active:bg-indigo-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 float-right"
          >
            Submit
          </Button>
          <hr className="pt-6 border-0" />
        </>
      );
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              <CardText />

              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step4
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step5
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step6
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              {/* <Step7
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              /> */}
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;
