import React, { useContext } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { MyAjbContext } from "Context/AjbContext";
import ModalDokumen from "components/Modals/ModalDokumen";
// import { connect } from "socket.io-client";

const InputDataDokumen = () => {
  const {
    inputAjb,
    setInputAjb,
    setLoadingFile,
    loadingFile,
    functions,
  } = useContext(MyAjbContext);

  const { addDokumenAjb } = functions;

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  if (inputAjb.ppat_name === undefined) {
    setInputAjb({ ...inputAjb, ppat_name: object.nama });
  }

  const dokReview = (e) => {
    e.preventDefault();
    setLoadingFile(true);
    addDokumenAjb();
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputAjb({ ...inputAjb, [formInput]: inputValue });
  };

  return (
    <>
      {loadingFile ? <ModalDokumen /> : null}
      <div className="rounded-t mb-0 px-6 text-grey py-6">
        <div className="relative w-full mb-3">
          <label
            className="block text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Nama Dokumen
          </label>
          <input
            className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="nama_dokumen"
            value={inputAjb.nama_dokumen}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-xs pt-6 font-bold mb-2"
            htmlFor="grid-password"
          >
            Nomor Dokumen
          </label>
          <input
            type="text"
            className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="nomor_dokumen"
            value={inputAjb.nomor_dokumen}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-xs pt-6 font-bold mb-2"
            htmlFor="grid-password"
          >
            Nama Notaris
          </label>
          <input
            type="text"
            className="border-0 px-3 py-2 border-grey rounded disabled-2 text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="ppat_name"
            value={inputAjb.ppat_name}
            onChange={handleChange}
            // required
            disabled
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-xs pt-6 font-bold mb-2"
            htmlFor="grid-password"
          >
            Alamat
          </label>
          <input
            type="text"
            className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="alamat"
            value={inputAjb.alamat}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-xs pt-6 font-bold mb-2"
            htmlFor="grid-password"
          >
            Kota
          </label>
          <input
            type="text"
            className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="kota"
            value={inputAjb.kota}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block text-xs pt-6 font-bold mb-2"
            htmlFor="grid-password"
          >
            Nilai Transaksi
          </label>
          <input
            type="number"
            className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="nilai_transaksi"
            value={inputAjb.nilai_transaksi}
            onChange={handleChange}
            // required
          />
        </div>
        <button
          className="bg-green-2 text-white w-full py-2 rounded-md"
          onClick={dokReview}
        >
          Cek Dokumen
        </button>
      </div>
    </>
  );
};

export default InputDataDokumen;
