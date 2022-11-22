import React, { useContext } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { MyAphtcontext } from "Context/AphtContext";

const InputDataDokumen = () => {
  const { inputApht, setInputApht, dokTemplate, functions } =
    useContext(MyAphtcontext);

  const { addDokumenApht, dokumenApht } = functions;

  if (!dokTemplate && !inputApht.doc) {
    dokumenApht("akta_pemberian_hak_tanggungan");
  }

  const dokReview = () => {
    addDokumenApht();
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputApht({ ...inputApht, [formInput]: inputValue });
  };

  return (
    <div className="rounded-t mb-0 px-6 text-grey py-6">
      <div className="relative w-full mb-3">
        <label className="block text-xs font-bold mb-2" htmlFor="grid-password">
          Nama Dokumen
        </label>
        <input
          className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="nama_dokumen"
          value={inputApht.nama_dokumen}
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
          value={inputApht.nomor_dokumen}
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
          className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="ppat_name"
          value={inputApht.ppat_name}
          onChange={handleChange}
          // required
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
          value={inputApht.alamat}
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
          value={inputApht.kota}
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
          value={inputApht.nilai_transaksi}
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
  );
};

export default InputDataDokumen;
