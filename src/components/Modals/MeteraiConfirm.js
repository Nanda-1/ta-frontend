import React, { useContext } from "react";

// Context
import { DokumenContext } from "Context/DokumenContext";
import Meterai from "assets/img/signature/meterai.png";

export default function MeteraiConfirm() {
  const {
    // meterai,
    setBtnConfirm,
    confirmModal,
    setConfirmModal,
    // setMeterai,
    functions,
    setLoadingFile,
  } = useContext(DokumenContext);

  const { addMeterai } = functions;

  const ppatConfirm = () => {
    setConfirmModal(false);
    setBtnConfirm(false);
    // setMeterai(true);
    addMeterai('akta_pemberian_hak_tanggungan');
    setLoadingFile(true);
  };

  return (
    <>
      {confirmModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
            <div className="relative w-auto my-2 mx-auto font-roboto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
                {/*body*/}
                <div className="relative py-6 px-40 flex-col text-blue font-roboto">
                  <label className="text-xs text-black block text-center pb-2">
                    <img
                      src={Meterai}
                      className="mx-auto"
                      width="120"
                      alt="meterai"
                    />
                  </label>
                  <div className="text-center text-black text-sm pb-4">
                    <div className="text-bold-700 font-bold text-blue text-2xl">
                      E-Meterai Dokumen
                    </div>
                    Saya menyetujui pembubuhan meterai digital <br /> untuk
                    dokumen ini.
                  </div>
                </div>
              </div>
              <button
                className="text-white float-right cursor-pointer text-xs bg-blue mt-2 border-blue rounded-lg background-transparent font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={ppatConfirm}
              >
                Bubuhkan
              </button>
              <button
                className="text-blue float-right text-xs cursor-pointer bg-white mt-2 mr-4 border-blue rounded-lg background-transparent font-bold px-6 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setConfirmModal(false)}
              >
                Batalkan
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
