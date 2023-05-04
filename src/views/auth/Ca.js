import React, { useState, useContext } from "react";
import { RegistContext } from "views/auth/RegistContext";
import { Link } from "react-router-dom";

export default function Ca() {
  // eslint-disable-next-line no-unused-vars
  const { inputRegist, setInputRegist } = useContext(RegistContext);

  //Show Spinner
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = useState(false);
  //Show Modal
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  //Disable Button Simpan
  // eslint-disable-next-line no-unused-vars
  const [disable, setDisable] = useState(true);

  //** Testing Section **//
  // eslint-disable-next-line no-unused-vars
  const [isShow, setShow] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isShow1, setShow1] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [defaults, setDefaults] = React.useState(true);

  return (
    <>
      <p className="pt-12"></p>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-800-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-blue-500 text-xl font-bold">
                    Tanda Tangan
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center text-xs">
                  Silahkan pilih tanda tangan elektronik yang telah Anda miliki
                </div>
              </div>
              <div className="space-y-4">
                <span className="flex w-auto mx-auto mb-2 mt-0">
                  <ul className="mx-auto text-center">
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox1"
                        name="umum"
                        // onChange={addRegistAPI}
                        value="umum"
                      />
                      <label
                        htmlFor="myCheckbox1"
                        className="group block mx-auto h-28 w-24-d mr-3 ml-3 mb-4 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/Logo_Privyid.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-5"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          PrivyID
                        </h3>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox2"
                        name="ppat"
                        // onChange={addRegistAPI}
                        value="ppat"
                      />
                      <label
                        htmlFor="myCheckbox2"
                        className="group block mx-auto h-28 w-24-d mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/logo_ta.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-20-d"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          TekenAja!
                        </h3>
                      </label>
                    </li>
                  </ul>
                </span>
              </div>
              <div className="text-center mt-6 w-auto ml-12 mr-12 mx-auto">
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-800-d my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-center rounded-t">
                            <h3 className="text-2xl font-semibold text-blue-500 pt-7">
                              Lengkapi Diri Selesai
                            </h3>
                          </div>
                          <img
                            className="mx-auto my-4 align-middle h-24 w-24 bg-fix"
                            src={
                              require("assets/img/ic_konfirmasiemail.png")
                                .default
                            }
                            alt="no data"
                          />
                          <p className="mb-8 text-blueGray-500 text-sm text-center">
                            Anda telah selesai melakukan registrasi.
                            <br />
                            Kami akan memproses verifikasi data Anda selama
                            60-120 menit.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
              <hr className="mt-8 border-0 pt-2" />
            </div>
            <div className="relative flex flex-wrap my-6 w-800-d mx-auto">
              <div className="w-1/2"></div>
              <div className="w-1/2 text-right">
              <Link to="/lengkapiDiri/modal3">
                <button
                  className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Lanjutkan
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pb-16"></p>
    </>
  );
}
