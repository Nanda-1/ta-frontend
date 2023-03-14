import React, { Component } from "react";
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
import swal from "sweetalert";
import cookies from "js-cookie";

//1.Upload SK
import Step1 from "./Step1";
//2.Foto KTP
import Step2 from "./Step2";
//3.Foto NPWP
import Step3 from "./Step2a";
//4.Foto BPJS
import Step4 from "./Step2b";
//5.Swafoto
import Step5 from "./Step3";
//6.Data Diri
import Step6 from "./Step3r";
//7.Rekam Wajah
import Step7 from "./Step4";
//8.Tandatangan
// import Step8 from "./Step5r";

// import styled from "styled-components";
import MultiStepProgressBar from "./MultiStepProgressBar";

//get data from context
import { RegistContext } from "views/auth/RegistContext";

class MasterForm extends Component {
  static contextType = RegistContext;

  constructor(props) {
    super(props);

    // Set the intiial input values
    this.num = cookies.get('step')
    this.state = {
      currentStep: this.num ? Number(this.num) : 1,
      email: "",
      username: "",
      password: "",
      statues: false,
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
    currentStep = currentStep >= 6 ? 7 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });

    if (currentStep === 7) {
      // this.context.cekKTPPPAT();
      this.context.sendLengkapiDiriUmum(); 
      this.context.setLoading(true);
      this.context.ppatDetail(); 
    }
    cookies.set('step', currentStep)
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button
          className="get-started shadow text-black font-bold px-6 py-3 mb-4 rounded-lg outline-none focus:outline-none mr-1 bg-white active:bg-sky-600 text-sm hover:shadow-lg ease-linear transition-all duration-150"
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
    if (currentStep < 7) {
      return (
        <>
          <Button
            className="text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-4 bg-blue active:bg-blue text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 float-right"
            onClick={this._next}
          >
            Lanjutkan
          </Button>
        </>
      );
    }
    return null;
  }

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    swal("Apakah anda telah memiliki tanda tangan elektronik sebelumnya ?", {
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
    if (currentStep > 6) {
      return (
        // <Link to="/login">
        <>
          <Button
            onClick={this.handleSubmit}
            className="text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-4 bg-blue active:bg-indigo-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 float-right"
          >
            Submit
          </Button>
        </>
        // </Link>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButtonDisabled() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 6) {
      return (
        // <Link to="/login">
        <>
          <Button
            onClick={this.handleSubmit}
            disabled
            className="text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-4 bg-gray-d active:bg-indigo-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 float-right"
          >
            Submit
          </Button>
        </>
        // </Link>
      );
    }
    // ...else render nothing
    return null;
  }

  get statues() {
    let status = cookies.get("statues");
    return status;
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
              <Step7
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.statues === true
                ? this.submitButtonDisabled
                : this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;
