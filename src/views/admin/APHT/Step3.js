import React, { useContext } from "react";

import ModalDokumen from "components/Modals/ModalDokumen";
import Success from "assets/img/sukses.png";

import { FormGroup } from "reactstrap";
import Cookies from "js-cookie";
import { MyAphtcontext } from "Context/AphtContext";
import InputKreditor from "components/APHT/InputKreditor";
import InputSaksiKreditor from "components/APHT/InputSaksiKreditor";
import swal from "sweetalert";

const Step3 = (props) => {
  const {
    apht,
    setApht,
    inputApht,
    setInputApht,
    dataNik,
    setDataNik,
    warning,
    setWarning,
    loadingFile,
    kreditor,
    setKreditor,
  } = useContext(MyAphtcontext);

  const addKreditor = (e) => {
    if (inputApht.nik_kreditor) {
      let nikNum = inputApht.nik_kreditor.length;

      if (nikNum !== 16) {
        swal("Gagal", "NIK harus 16 digit", "error");
      }
    }
    if (dataNik) {
      let name = "id_transaksi";
      let id_transaksi = Cookies.get("id_transaksi");
      let emailPembeli = "email_kreditor";
      let phonePembeli = "tlp_kreditor";
      let inputValue = e.target.value;
      let formInput = e.target.name;
      setInputApht({
        ...inputApht,
        [emailPembeli]: dataNik.email,
        [phonePembeli]: dataNik.phone,
        [formInput]: inputValue,
        [name]: id_transaksi,
      });
      if (
        inputApht.tipe_kreditor !== undefined &&
        inputApht.status_kreditor !== undefined
      ) {
        setApht({ ...inputApht });
        setKreditor(true);
      }
    } else {
      if (
        inputApht.nik_kreditor !== undefined &&
        inputApht.email_kreditor !== undefined &&
        inputApht.tlp_kreditor !== undefined &&
        inputApht.tipe_kreditor !== undefined &&
        inputApht.status_kreditor !== undefined
      ) {
        setApht({ ...inputApht });
        setKreditor(true);
      }
    }
    setDataNik("");
  };

  const inviteKreditor = (e) => {
    e.preventDefault();
    setWarning(0);
    setDataNik(null);
    setApht({ ...inputApht });
    // return {props.}
  };

  const stepNum = () => {
    if (inputApht.tipe_debitor === "personal") {
      if (inputApht.status_debitor !== "menikah") {
        return 7;
      } else {
        return 8;
      }
    } else {
      return 4;
    }
  };

  if (props.currentStep !== stepNum()) {
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
                {!kreditor ? (
                  <>
                    <InputKreditor />
                    {warning ? (
                      <button
                        className="bg-blue text-white text-s mt-2 font-bold mb-6 cursor-pointer rounded-lg py-2 px-10 w-full"
                        onClick={inviteKreditor}
                      >
                        Undang & Lanjutkan
                      </button>
                    ) : (
                      <button
                        className="bg-green-n text-white float-right text-sm mt-2 mb-6 cursor-pointer rounded-lg py-2 px-10 w-full"
                        onClick={addKreditor}
                      >
                        Submit
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {apht.nik_saksi_kreditor === undefined &&
                    apht.tlp_saksi_kreditor === undefined &&
                    apht.email_saksi_kreditor === undefined ? (
                      <InputSaksiKreditor />
                    ) : null}
                  </>
                )}
                {apht.nik_saksi_kreditor ? (
                  <div className="py-6">
                    <img
                      src={Success}
                      width="100"
                      className="mb-4 mx-auto flex flex-row"
                      alt="success"
                    />
                    <div className="font-bold w-full text-center text-md text-black">
                      Berhasil membuat data Kreditor!
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

export default Step3;
