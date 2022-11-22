import React, { useContext } from "react";

import { MyAphtcontext } from "Context/AphtContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import Success from "assets/img/sukses.png";
import InputDebitor from "components/APHT/InputDebitor";
import InputSaksiDebitor from "components/APHT/InputSaksiDebitor";
import { FormGroup } from "reactstrap";

const Step1 = (props) => {
  const { apht, loadingFile, debitor } = useContext(MyAphtcontext);

  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <FormGroup>
        {loadingFile ? <ModalDokumen /> : null}
        <div className="flex content-center items-center justify-center h-full mt-16">
          <div className="w-full lg:w-8/12 px-1">
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 text-grey py-6">
                {!debitor ? (
                  <>
                    <InputDebitor />
                  </>
                ) : (
                  <>
                    {apht.nik_saksi_debitor === undefined &&
                    apht.tlp_saksi_debitor === undefined &&
                    apht.email_saksi_debitor === undefined ? (
                      <InputSaksiDebitor />
                    ) : null}
                  </>
                )}
                {apht.nik_saksi_debitor ? (
                  <div className="py-6">
                    <img
                      src={Success}
                      width="100"
                      className="mb-4 mx-auto flex flex-row"
                      alt="success"
                    />
                    <div className="font-bold w-full text-center text-md text-black">
                      Berhasil membuat data debitor!
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step1;
