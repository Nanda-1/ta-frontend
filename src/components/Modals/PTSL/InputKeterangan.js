import React, { useContext } from "react";

// Context
import { MySuratKuasaContext } from "Context/SuratKuasaContext";
import Cookies from "js-cookie";

export default function InputKeterangan() {
  const { dataPtsl, setDataPtsl, uploadPtsl } = useContext(MySuratKuasaContext);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setDataPtsl({ ...dataPtsl, [formInput]: inputValue });
    Cookies.set(formInput, inputValue);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
        <div className="relative w-80 my-2 mx-auto font-roboto bg-white p-6 rounded">
          <h1 className="font-bold mb-4 text-center">
            Buat Dokumen Pendaftaran Peralihan Hak Jual - Beli
          </h1>
          <div className="text-sm">
            <span>Nama Dokumen</span>
            <input
              type="text"
              className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
              name="doc_name"
              value={dataPtsl.doc_name}
              onChange={handleChange}
            />
            <span>Nomor Dokumen</span>
            <input
              type="text"
              className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
              name="doc_num"
              value={dataPtsl.doc_num}
              onChange={handleChange}
            />
            <span>Nominal Transaksi</span>
            <input
              type="number"
              className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
              name="price_value"
              value={dataPtsl.price_value}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue w-full text-white font-bold mt-4 py-1 rounded-lg"
            onClick={() => uploadPtsl()}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
