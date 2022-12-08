import React, { useContext, useEffect } from "react";
import { MySuratKuasaContext } from "Context/SuratKuasaContext";

const FormDokumen = () => {
  const {
    dataPtsl,
    setDataPtsl,
    getDataProv,
    getDataKota,
    getDataKec,
    uploadPtsl,
  } = useContext(MySuratKuasaContext);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setDataPtsl({ ...dataPtsl, [formInput]: inputValue });
  };

  useEffect(() => {
    getDataProv();
    getDataKota();
    getDataKec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-t mb-0 px-6 text-grey py-6 bg-white w-800-d shadow-lg rounded-lg border-0">
      <div className="text-center">
        <label
          className="block text-blue text-lg font-bold mb-4 mt-4"
          htmlFor="grid-password"
        >
          Lengkapi Dokumen
        </label>
      </div>
      <div className="text-sm">
        <span>Nomor Hak Milik</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="no_hak_milik"
          value={dataPtsl.no_hak_milik}
          onChange={handleChange}
        />
        <span>Terletak di :</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="bidang_tanah_terletak"
          value={dataPtsl.bidang_tanah_terletak}
          onChange={handleChange}
        />
        <span>Kelurahan</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="bidang_tanah_kelurahan"
          value={dataPtsl.bidang_tanah_kelurahan}
          onChange={handleChange}
        />
        <span>Kecamatan</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="bidang_tanah_kecamatan"
          value={dataPtsl.bidang_tanah_kecamatan}
          onChange={handleChange}
        />
        <span>Kota</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="bidang_tanah_kota"
          value={dataPtsl.bidang_tanah_kota}
          onChange={handleChange}
        />
        <button
          className="bg-green-2 text-white w-full py-2 rounded font-700 mt-4"
          onClick={() => uploadPtsl()}
          disabled={
            dataPtsl.bidang_tanah_kota === undefined &&
            dataPtsl.bidang_tanah_kecamatan === undefined &&
            dataPtsl.bidang_tanah_kelurahan === undefined &&
            dataPtsl.bidang_tanah_terletak === undefined &&
            dataPtsl.no_hak_milik === undefined
              ? true
              : false
          }
        >
          Perbaharui Data
        </button>
      </div>
    </div>
  );
};

export default FormDokumen;
