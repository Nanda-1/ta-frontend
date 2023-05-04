import React, { useContext } from "react";

import { MyAjbContext } from "Context/AjbContext";
import ModalDokumen from "components/Modals/ModalDokumen";

import { FormGroup } from "reactstrap";
import InputPembeli from "components/AJB/InputPembeli";
import InputSaksiPembeli from "components/AJB/InputSaksiPembeli";

const Step3 = (props) => {
  const { loadingFile, pembeli } = useContext(MyAjbContext);

  if (props.currentStep !== "input_data_pembeli") {
    return null;
  }

  return (
    <>
      <FormGroup>
        {loadingFile && <ModalDokumen />}
        <div className="flex content-center items-center justify-center h-full mt-16">
          <div className="w-full lg:w-8/12 px-1">
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 text-grey py-6">
                {!pembeli ? (
                  <InputPembeli />
                ) : (
                  <InputSaksiPembeli next={props.next} />
                )}
              </div>
            </div>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step3;
