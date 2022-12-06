import React, { useContext } from "react";
import { MySuratKuasaContext } from "Context/SuratKuasaContext";

const FormDokumenSuratKuasa = ({ dataPtsl, setDataPtsl, uploadPtsl2 }) => {
  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setDataPtsl({ ...dataPtsl, [formInput]: inputValue });
  };

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
        <span>Yang bertanda tangan :</span>
        <br />
        <span>Nama</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="nama"
          value={dataPtsl.nama}
          onChange={handleChange}
        />
        <span>Tempat Lahir</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="tempat_lahir"
          value={dataPtsl.tempat_lahir}
          onChange={handleChange}
        />
        <span>Tanggal Lahir</span>
        <input
          type="date"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="tanggal_lahir"
          value={dataPtsl.tanggal_lahir}
          onChange={handleChange}
        />
        <span>Nomor Identitas</span>
        <input
          type="number"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="no_identitas"
          value={dataPtsl.no_identitas}
          onChange={handleChange}
        />
        <span>Alamat</span>
        <div className="w-full">
          <textarea
            name="alamat"
            value={dataPtsl.alamat}
            onChange={handleChange}
            className="bg-white border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
            rows="4"
            cols="20"
          >
            {dataPtsl.alamat}
          </textarea>
        </div>
        <span>Letak Jalan</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="letak_jalan"
          value={dataPtsl.letak_jalan}
          onChange={handleChange}
        />
        <span>Letak Kelurahan</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="letak_kelurahan"
          value={dataPtsl.letak_kelurahan}
          onChange={handleChange}
        />
        <span>Letak Kecamatan</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="letak_kecamatan"
          value={dataPtsl.letak_kecamatan}
          onChange={handleChange}
        />
        <span>Letak Kota</span>
        <input
          type="text"
          className="px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full mb-2"
          name="letak_kota"
          value={dataPtsl.letak_kota}
          onChange={handleChange}
        />
        <button
          className="bg-green-2 text-white w-full py-2 rounded font-700 mt-4"
          onClick={() => uploadPtsl2()}
          // disabled={
          //   dataPtsl.bidang_tanah_kota === undefined &&
          //   dataPtsl.bidang_tanah_kecamatan === undefined &&
          //   dataPtsl.bidang_tanah_kelurahan === undefined &&
          //   dataPtsl.bidang_tanah_terletak === undefined &&
          //   dataPtsl.no_hak_milik === undefined
          //     ? true
          //     : false
          // }
        >
          Perbaharui Data
        </button>
      </div>
    </div>
  );
};

export default FormDokumenSuratKuasa;
