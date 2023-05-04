import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PernyataanTransaksi() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-960-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 mb-0 px-6 py-6">
                <div className="text-left mt-3 mb-6">
                  <a
                    href="/syaratKetentuan"
                    className="text-blue px-4 py-2 outline-none text-xs"
                  >
                    <i className="fas fa-angle-left text-blue text-md"></i>{" "}
                    Kembali
                  </a>
                </div>
                <div className="text-center mb-2">
                  <h1 className="text-blue text-xl font-bold">
                    Pernyataan
                    <br />
                    Tanggung Jawab Mutlak Uang Transaksi
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center mb-1 font-bold">
                  <small>
                    Saya, yang selanjutnya melaksanakan transaksi, dengan ini
                    menyatakan:
                  </small>
                </div>
                <hr className="mt-3 border-b-0" />
              </div>
              <div className="box-border text-justify h-80 p-8 pt-0">
                <div className="text-sm">
                  <ol>
                    <li>
                      1. Bahwa seluruh data / informasi yang diberikan dalam
                      dokumen persyaratan transaksi elektronik pada aplikasi ini
                      adalah benar.
                    </li>
                    <li>
                      2. Bahwa saya akan menaati segala ketentuan dan tidak akan
                      melakukan perbuatan yang melawan hukum dalam pelaksanaan
                      transaksi elektronik ini.
                    </li>
                    <li>
                      3. Bahwa uang yang digunakan dalam transaksi elektronik
                      ini adalah jelas, aman, tidak berasal dari segala sesuatu
                      yang berlawanan dengan Undang-Undang maupun aturan hukum
                      lain di Republik Indonesia, dan dapat
                      dipertanggungjawabkan oleh saya secara sah di mata hukum.
                    </li>
                    <li>
                      4. Apabila dikemudian hari ternyata data / informasi yang
                      saya berikan tersebut tidak benar, maka saya bersedia
                      dikenakan sanksi hukuman menurut ketentuan peraturan
                      perundangan maupun aturan hukum yang mengikat di Republik
                      Indonesia.
                    </li>
                  </ol>
                </div>
                <div className="text-sm py-6 mb-12">
                  Demikian pernyataan ini saya buat dalam keadaan sadar, tanpa
                  paksaan dari pihak manapun, dan dengan sebenarnya-benarnya
                  untuk dipergunakan sebagaimana mestinya.
                  <br />
                </div>
              </div>
              <hr className="mt-6 border-0" />
            </div>
            <div className="flex w-960-d mb-6 mx-auto setuju-btn">
              <div className="w-2/3">
                <div className="flex justify-left">
                  <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      name="toggle"
                      id="toggle"
                      className="items-center bg-white mr-1 focus:ring-transparent toggle-checkbox absolute block w-6 h-6 rounded-full border-2 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label-d block h-8 -ml-1 -mt-1 rounded-full bg-gray-d border-blue-500 border-2 cursor-pointer"
                    ></label>
                  </div>
                  <div className="text-xs ml-2">
                    <label
                      className="form-check-label text-gray-700"
                      htmlFor="kt_login_toc_agree"
                    >
                      Saya telah membaca dan menyetujui{" "}
                      <a
                        href="https://ca.peruri.co.id/ca/legal/"
                        className="ms-1 a-primary fw-bold text-blue"
                      >
                        ketentuan legal, (CP, CPS, Subscriber Agreement, Privacy
                        Policy)
                      </a>{" "}
                      dari Peruri CA.
                    </label>
                  </div>
                </div>
              </div>
              {checked === false ? (
                <div className="w-1/3 text-right syarat-next">
                  <button
                    disabled
                    className="get-started opacity-50 text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mb-1 bg-blue active:bg-blue text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Lanjutkan
                  </button>
                </div>
              ) : (
                <div className="w-1/3 text-right syarat-next">
                  <Link to="/register">
                    <button className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mb-1 bg-blue active:bg-blue text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                      Lanjutkan
                    </button>
                  </Link>
                </div>
              )}
            </div>
            {/* <div className="relative flex flex-wrap w-960-d mb-6 mx-auto">
              <div className="w-1/2">
                <div className="flex justify-left">
                  <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      name="toggle"
                      id="toggle"
                      className="items-center bg-white mr-1 focus:ring-transparent toggle-checkbox absolute block w-6 h-6 rounded-full border-2 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label-d block h-8 -ml-1 -mt-1 rounded-full bg-sky-500 border-blue-500 border-2 cursor-pointer"
                    ></label>
                  </div>
                  <div className="text-xxs ml-2">
                    Dengan ini saya menyatakan telah membaca dan setuju pada
                    pernyataan di atas.
                  </div>
                </div>
              </div>
              {checked === false ? (
                <div className="w-1/2 text-right">
                  <button
                    disabled
                    className="get-started opacity-50 text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mb-1 bg-blue active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Lanjutkan
                  </button>
                </div>
              ) : (
                <div className="w-1/2 text-right">
                  <Link to="/register">
                    <button className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mb-1 bg-blue active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                      Lanjutkan
                    </button>
                  </Link>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
      <p className="pb-16"></p>
    </>
  );
}
