import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter
} from "reactstrap";

// Kreditor
import Step1 from "views/admin/APHT/Step1";
import SuratNikahKreditor from "views/admin/APHT/SuratNikahKreditor";
import KartuKeluargaKreditor from "views/admin/APHT/KartuKeluargaKreditor";
import Pbb from "views/admin/APHT/Pbb";
import Stts from "views/admin/APHT/Stts";
import SertifikatTanah from "views/admin/APHT/SertifikatTanah";
import NpwpKreditor from "views/admin/APHT/NpwpKreditor";
import AktaPendirianKreditor from "views/admin/APHT/AktaPendirianKreditor";
import SkPengangkatanKreditor from "views/admin/APHT/SkPengangkatanKreditor";
// Debitor
import Step3 from "views/admin/APHT/Step3";
import SuratNikahDebitor from "views/admin/APHT/SuratNikahDebitor";
import KartuKeluargaDebitor from "views/admin/APHT/KartuKeluargaDebitor";
import NpwpDebitor from "views/admin/APHT/NpwpDebitor";
import AktaPendirianDebitor from "views/admin/APHT/AktaPendirianDebitor";
import SkPengangkatanDebitor from "views/admin/APHT/SkPengangkatanDebitor";
// import Step4 from "views/admin/APHT/Step4";
// Dokumen AJB
import Step5 from "views/admin/APHT/Step5";
import Step6 from "views/admin/APHT/Step6_v2";

// import styled from "styled-components";
import MultiStepProgressBar from "./MultiStepProgressBar";

import { MyAphtcontext } from "Context/AphtContext";
import Cookies from "js-cookie";

class MasterFormApht extends Component {

  static contextType = MyAphtcontext
  
  constructor(props) {
    super(props);

    this.num = Number(Cookies.get("step"));

    this.stepNum = this.num ? this.num : 1;
    
    // Set the intiial input values
    this.state = {
      currentStep: this.stepNum,
      email: "",
      username: "",
      password: ""
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
      [name]: value
    });
  }
  
  // Trigger an alert on form submission
  handleSubmit = event => {
    event.preventDefault();
    // let history = useHistory()
    if(this.context.meterai){
      this.context.functions.submitApht(this.context.inputApht.kreditor_id)
    }
  };

  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 19 ? 20 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });

    if(this.context.inputApht.tipe_debitor === 'personal'){
      if(this.context.inputApht.status_debitor !== 'menikah'){
        if(currentStep === 7){
          this.context.functions.addDebitor()
        }else if(this.context.inputApht.tipe_kreditor === 'personal'){
          if(this.context.inputApht.status_kreditor !== 'menikah'){
            if(currentStep === 10){
              this.context.functions.addKreditor()
              this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
            }else if(currentStep === 11){
              this.context.functions.addDokumenApht()
              this.context.setLoadingFile(true)
            }else if(currentStep === 12){
              this.context.functions.submitApht()
            }
          }else{
            if(currentStep === 11){
              this.context.functions.addKreditor()
              this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
            }else if(currentStep === 12){
              this.context.functions.addDokumenApht()
              this.context.setLoadingFile(true)
            }else if(currentStep === 13){
              this.context.functions.submitApht()
            }
          }
        }else{
          if(currentStep === 10){
            this.context.functions.addKreditor()
            this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
          }else if(currentStep === 11){
            this.context.functions.addDokumenApht()
            this.context.setLoadingFile(true)
          }else if(currentStep === 12){
            this.context.functions.submitApht()
          }
        }
      }else{
        if(currentStep === 8){
          this.context.functions.addDebitor()
        }else if(this.context.inputApht.tipe_kreditor === 'personal'){
          if(this.context.inputApht.status_kreditor !== 'menikah'){
            if(currentStep === 11){
              this.context.functions.addKreditor()
              this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
            }else if(currentStep === 12){
              this.context.functions.addDokumenApht()
              this.context.setLoadingFile(true)
            }else if(currentStep === 13){
              this.context.functions.submitApht()
            }
          }else{
            if(currentStep === 12){
              this.context.functions.addKreditor()
              this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
            }else if(currentStep === 13){
              this.context.functions.addDokumenApht()
              this.context.setLoadingFile(true)
            }else if(currentStep === 14){
              this.context.functions.submitApht()
            }
          }
        }else{
          if(currentStep === 11){
            this.context.functions.addKreditor()
            this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
          }else if(currentStep === 12){
            this.context.functions.addDokumenApht()
            this.context.setLoadingFile(true)
          }else if(currentStep === 13){
            this.context.functions.submitApht()
          }
        }
      }
    }else{
      if(currentStep === 4){
        this.context.functions.addDebitor()
      }else if(this.context.inputApht.tipe_kreditor === 'personal'){
        if(this.context.inputApht.status_kreditor !== 'menikah'){
          if(currentStep === 7){
            this.context.functions.addKreditor()
            this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
          }else if(currentStep === 8){
            this.context.functions.addDokumenApht()
            this.context.setLoadingFile(true)
          }else if(currentStep === 9){
            this.context.functions.submitApht()
          }
        }else{
          if(currentStep === 8){
            this.context.functions.addKreditor()
            this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
          }else if(currentStep === 9){
            this.context.functions.addDokumenApht()
            this.context.setLoadingFile(true)
          }else if(currentStep === 10){
            this.context.functions.submitApht()
          }
        }
      }else{
        if(currentStep === 7){
          this.context.functions.addKreditor()
          this.context.functions.dokumenApht("akta_pemberian_hak_tanggungan")
        }else if(currentStep === 8){
          this.context.functions.addDokumenApht()
          this.context.setLoadingFile(true)
        }else if(currentStep === 9){
          this.context.functions.submitApht()
        }
      }
    }
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left border-blue bg-white text-blue px-6 py-1 rounded-md" onClick={this._prev}>
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
    if(currentStep < 20){
      // if (currentStep === 2 && this.context.inputApht.tipe_kreditor === 'personal' && this.context.inputApht.status_kreditor === 'menikah' ) {
      //     return ( 
      //       <>{this.nextButton}</>
      //     ); 
      // }
      // }else if (currentStep === 2 && this.context.inputApht.tipe_kreditor === 'personal' ) {
      //   if (this.context.inputApht.kartu_keluarga_kreditor !== undefined && this.context.inputApht.sertifikat_tanah !== undefined && this.context.inputApht.pbb_tahun_terakhir !== undefined && this.context.inputApht.stts !== undefined && this.context.inputApht.npwp_kreditor !== undefined ) {
      //     return (
      //       <>{this.nextButton}</>
      //     );
      //   }
      // }else if (currentStep === 2 && this.context.inputApht.tipe_kreditor === 'bank' ) {
      //   if (this.context.inputApht.akta_pendirian !== undefined && this.context.inputApht.sk_pengangkatan !== undefined) {
      //     return (
      //       <>{this.nextButton}</>
      //     );
      //   }
      // }else if (currentStep === 3 && this.context.ajb.nik_saksi_debitor !== undefined && this.context.ajb.tlp_saksi_debitor !== undefined && this.context.ajb.email_saksi_debitor !== undefined) {
      //   return (
      //     <>{this.nextButton}</>
      //   ); 
      // }else if (currentStep === 4 && this.context.inputApht.tipe_debitor === 'personal' ) {
      //   if (this.context.inputApht.kartu_keluarga_debitor !== undefined && this.context.inputApht.sertifikat_tanah !== undefined && this.context.inputApht.pbb_tahun_terakhir !== undefined && this.context.inputApht.stts !== undefined && this.context.inputApht.npwp_debitor !== undefined ) {
      //     return (
      //       <>{this.nextButton}</>
      //     );
      //   }
      // }else if (currentStep === 4 && this.context.inputApht.tipe_debitor === 'bank' ) {
      //   if (this.context.inputApht.akta_pendirian !== undefined && this.context.inputApht.sk_pengangkatan !== undefined) {
      //     return (
      //       <>{this.nextButton}</>
      //     );
      //   }
      // }else if (currentStep === 5 && this.context.inputApht.nama_dokumen !== undefined && this.context.inputApht.nomor_dokumen !== undefined && this.context.inputApht.dokumen_ajb !== undefined) {
      //   return (
      //     <>{this.nextButton}</>
      //   );
      // }else{
        return (
          <Button color="primary float-right bg-blue text-white px-6 py-1 rounded-md" onClick={this._next}>
            Next
          </Button>
      );
    }
  // }
    // ...else render nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 20) {
        return (
            <Button color="primary float-right bg-blue text-white px-6 py-1 rounded-md" onClick={this._next}>
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
      return <Button className="primary float-right bg-blue text-white cursor-pointer px-6 py-1 rounded-md">Submit</Button>
    }
    // ...else render nothing
    return null;
  }

  get submitButtonDisabled() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if(currentStep > 20){
      return <button className="primary float-right bg-darkgray-2 text-white cursor-not-allowed px-6 py-1 rounded-md" disabled>Submit</button>
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            {/* <CardHeader>Create an Account</CardHeader> */}
            <CardBody className={"pb-16"}>
              <CardTitle className='lg:w-8/12 mx-auto'>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              {/* <CardText /> */}
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                />
              <SuratNikahKreditor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <KartuKeluargaKreditor
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
              <NpwpKreditor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <SuratNikahDebitor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <KartuKeluargaDebitor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <NpwpDebitor
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
              <AktaPendirianDebitor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <AktaPendirianKreditor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <SkPengangkatanDebitor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
              <SkPengangkatanKreditor
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
              />
            </CardBody>
            <CardFooter style={{marginTop :'-5rem'}}>
            {this.state.currentStep <= this.num ? 
              null
              :
              <>
              {this.previousButton}
              </>  
            }
              {this.handleButton}
              {this.context.meterai === true ?
                <>
                {this.submitButton}
                </>
                :
                <>
                {this.submitButtonDisabled}
                </>
              }
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterFormApht;