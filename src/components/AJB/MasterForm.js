import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";

// Penjual
import Step1 from "views/admin/AktaJualBeli/Step1";
import SuratNikahPenjual from "views/admin/AktaJualBeli/SuratNikahPenjual";
import KartuKeluargaPenjual from "views/admin/AktaJualBeli/KartuKeluargaPenjual";
import Pbb from "views/admin/AktaJualBeli/Pbb";
import Stts from "views/admin/AktaJualBeli/Stts";
import SertifikatTanah from "views/admin/AktaJualBeli/SertifikatTanah";
import NpwpPenjual from "views/admin/AktaJualBeli/NpwpPenjual";
import AktaPendirianPenjual from "views/admin/AktaJualBeli/AktaPendirianPenjual";
import SkPengangkatanPenjual from "views/admin/AktaJualBeli/SkPengangkatanPenjual";
// Pembeli
import Step3 from "views/admin/AktaJualBeli/Step3";
import SuratNikahPembeli from "views/admin/AktaJualBeli/SuratNikahPembeli";
import KartuKeluargaPembeli from "views/admin/AktaJualBeli/KartuKeluargaPembeli";
import NpwpPembeli from "views/admin/AktaJualBeli/NpwpPembeli";
import AktaPendirianPembeli from "views/admin/AktaJualBeli/AktaPendirianPembeli";
import SkPengangkatanPembeli from "views/admin/AktaJualBeli/SkPengangkatanPembeli";
// import Step4 from "views/admin/AktaJualBeli/Step4";
// Dokumen AJB
import Step5 from "views/admin/AktaJualBeli/Step5";
// import Step5 from "views/admin/AktaJualBeli/Step5";
import Step6 from "views/admin/AktaJualBeli/Step6_v2";

// import styled from "styled-components";
import MultiStepProgressBar from "./MultiStepProgressBar";

import { MyAjbContext } from "Context/AjbContext";
import Cookies from "js-cookie";
import ModalDokumen from "components/Modals/ModalDokumen";
import swal from "sweetalert";

class MasterFormAjb extends Component {
  static contextType = MyAjbContext;

  constructor(props) {
    super(props);

    this.num = Cookies.get("step");

    this.stepNum = this.num ? this.num : "input_data_penjual";
    // Set the intiial input values
    this.state = {
      currentStep: this.stepNum,
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

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    // let history = useHistory()
    if (this.context.meterai) {
      this.context.functions.submitAJB(this.context.inputAjb.penjual_id);
    }
  };

  _next() {
    if (this.state.currentStep === "input_data_penjual") {
      if (this.context.inputAjb.tipe_penjual === "personal") {
        this.setState({
          currentStep: "sertifikat_tanah",
        });
      } else {
        this.setState({
          currentStep: "akta_pendirian_penjual",
        });
      }
    } else if (this.state.currentStep === "akta_pendirian_penjual") {
      this.setState({
        currentStep: "sk_pengangkatan_penjual",
      });
    } else if (this.state.currentStep === "sk_pengangkatan_penjual") {
      this.setState({
        currentStep: "input_data_pembeli",
      });
    } else if (this.state.currentStep === "sertifikat_tanah") {
      this.setState({
        currentStep: "pbb",
      });
    } else if (this.state.currentStep === "pbb") {
      this.setState({
        currentStep: "stts",
      });
    } else if (this.state.currentStep === "stts") {
      if (this.context.inputAjb.status_penjual === "menikah") {
        this.setState({
          currentStep: "surat_nikah_penjual",
        });
      } else {
        this.setState({
          currentStep: "kk_penjual",
        });
      }
    } else if (this.state.currentStep === "surat_nikah_penjual") {
      this.setState({
        currentStep: "kk_penjual",
      });
    } else if (this.state.currentStep === "kk_penjual") {
      this.setState({
        currentStep: "npwp_penjual",
      });
    } else if (this.state.currentStep === "npwp_penjual") {
      if (this.context.nextStep) {
        this.setState({
          currentStep: "input_data_pembeli",
        });
      } else {
        this.context.functions.addPenjual();
        this.context.setLoadingFile(true);
        this.setState({
          currentStep: "input_data_pembeli",
        });
      }
    } else if (this.state.currentStep === "input_data_pembeli") {
      if (this.context.inputAjb.status_pembeli === "menikah") {
        this.setState({
          currentStep: "surat_nikah_pembeli",
        });
      } else {
        this.setState({
          currentStep: "kk_pembeli",
        });
      }
    } else if (this.state.currentStep === "surat_nikah_pembeli") {
      this.setState({
        currentStep: "kk_pembeli",
      });
    } else if (this.state.currentStep === "kk_pembeli") {
      this.setState({
        currentStep: "npwp_pembeli",
      });
    } else if (this.state.currentStep === "npwp_pembeli") {
      if (this.context.nextStep) {
        this.setState({
          currentStep: "dokumen",
        });
      } else {
        this.context.setLoadingFile(true);
        this.setState({
          currentStep: "dokumen",
        });
        this.context.functions.addDokumenAjb();
      }
    } else if (this.state.currentStep === "dokumen") {
      this.setState({
        currentStep: "stamping",
      });
    }
  }

  _prev() {
    if (
      this.state.currentStep === "akta_pendirian_penjual" ||
      this.state.currentStep === "sertifikat_tanah"
    ) {
      this.setState({
        currentStep: "input_data_penjual",
      });
    } else if (this.state.currentStep === "sk_pengangkatan_penjual") {
      this.setState({
        currentStep: "akta_pendirian_penjual",
      });
    } else if (this.state.currentStep === "surat_nikah_penjual") {
      this.setState({
        currentStep: "stts",
      });
    } else if (this.state.currentStep === "pbb") {
      this.setState({
        currentStep: "sertifikat_tanah",
      });
    } else if (this.state.currentStep === "stts") {
      this.setState({
        currentStep: "pbb",
      });
    } else if (this.state.currentStep === "kk_penjual") {
      if (this.context.inputAjb.status_penjual === "menikah") {
        this.setState({
          currentStep: "surat_nikah_penjual",
        });
      } else {
        this.setState({
          currentStep: "stts",
        });
      }
    } else if (this.state.currentStep === "npwp_penjual") {
      this.setState({
        currentStep: "kk_penjual",
      });
    } else if (this.state.currentStep === "input_data_pembeli") {
      if (this.context.inputAjb.tipe_penjual === "personal") {
        this.setState({
          currentStep: "npwp_penjual",
        });
      } else {
        this.setState({
          currentStep: "sk_pengangkatan_penjual",
        });
      }
    } else if (this.state.currentStep === "surat_nikah_pembeli") {
      this.setState({
        currentStep: "input_data_pembeli",
      });
    } else if (this.state.currentStep === "kk_pembeli") {
      if (this.context.pembeli) {
        swal("Berhasil", "Berhasil menambah data pembeli", "success");
      }
      this.setState({
        currentStep: "surat_nikah_pembeli",
      });
    } else if (this.state.currentStep === "npwp_pembeli") {
      this.setState({
        currentStep: "kk_pembeli",
      });
    } else if (this.state.currentStep === "dokumen") {
      this.setState({
        currentStep: "npwp_pembeli",
      });
    } else if (this.state.currentStep === "stamping") {
      this.setState({
        currentStep: "dokumen",
      });
    }
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== "input_data_penjual") {
      return (
        <Button
          color="secondary float-left border-blue bg-white text-blue px-6 py-1 rounded-md"
          onClick={this._prev}
        >
          Previous
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get handleButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep !== "selesai") {
      return (
        <Button
          color="primary float-right bg-blue text-white px-6 py-1 rounded-md"
          onClick={this._next}
        >
          Next
        </Button>
      );
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 20) {
      return (
        <Button
          color="primary float-right bg-blue text-white px-6 py-1 rounded-md"
          onClick={this._next}
        >
          Next
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 20) {
      return (
        <Button className="primary float-right bg-blue text-white cursor-pointer px-6 py-1 rounded-md">
          Submit
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButtonDisabled() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 20) {
      return (
        <button
          className="primary float-right bg-darkgray-2 text-white cursor-not-allowed px-6 py-1 rounded-md"
          disabled
        >
          Submit
        </button>
      );
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <>
        {this.context.loadingFile ? <ModalDokumen /> : null}
        <Form onSubmit={this.handleSubmit}>
          <Card>
            {/* <CardHeader>Create an Account</CardHeader> */}
            <CardBody className={"pb-16"}>
              <CardTitle className="lg:w-8/12 mx-auto">
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              {/* <CardText /> */}
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                next={this._next}
              />
              <SuratNikahPenjual
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <KartuKeluargaPenjual
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <SertifikatTanah
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Pbb
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Stts
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <NpwpPenjual
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                addPenjual={this._addPenjual}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                next={this._next}
              />
              <SuratNikahPembeli
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <KartuKeluargaPembeli
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <NpwpPembeli
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                addPembeli={this._addPembeli}
              />
              <Step5
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step6
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <AktaPendirianPenjual
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <AktaPendirianPembeli
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <SkPengangkatanPenjual
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <SkPengangkatanPembeli
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
            </CardBody>
            <CardFooter style={{ marginTop: "-5rem" }}>
              {this.state.currentStep === this.num ? null : (
                <>{this.previousButton}</>
              )}
              {this.handleButton}
              {this.context.meterai === true ? (
                <>{this.submitButton}</>
              ) : (
                <>{this.submitButtonDisabled}</>
              )}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterFormAjb;
