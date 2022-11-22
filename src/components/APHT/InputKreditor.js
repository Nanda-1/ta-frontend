import React, { useContext } from "react";

import { MyAphtcontext } from "Context/AphtContext";

const InputKreditor = () => {
  const {
    inputApht,
    setInputApht,
    cekKtp,
    dataNik,
    warning,
    setWarning,
    setLoadingFile,
  } = useContext(MyAphtcontext);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputApht({ ...inputApht, [formInput]: inputValue });
  };

  const searchKtpKreditor = () => {
    if (inputApht.nik_kreditor) {
      setWarning(0);
      setLoadingFile(true);
      cekKtp(inputApht.nik_kreditor, "penjual");
    }
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-xs font-bold mb-2 mt-3"
        htmlFor="grid-password"
      >
        Tambahkan Identitas Pihak Kedua (Kreditor)
      </label>
      <label className="text-xs">Nomor Induk Kependudukan (NIK)</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="text"
        className="border-0 px-3 py-2 bg-broken-white rounded shadow-input text-sm focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
        name="nik_kreditor"
        onChange={handleChange}
        required
      />
      <button
        type="button"
        onClick={searchKtpKreditor}
        className="showPass focus:outline-none bg-gray-2"
      >
        <i className={"fa fa-search search-nik bg-blue"}></i>
      </button>
      {/* {kreditor && inputApht.nik_kreditor === undefined ? (
        <div className="mx-auto mt--2 mb-1">
          <label className="text-xxs italic text-red-600">
            NIK Tidak Boleh Kosong
          </label>
        </div>
      ) : null} */}
      <label className="text-xs pt-5">E-Mail Aktif</label>
      <label className="text-red-500 px-1">*</label>
      {dataNik ? (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full cursor-default mb-2"
          name="email_kreditor"
          onChange={handleChange}
          value={dataNik.email}
        />
      ) : (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="email_kreditor"
          onChange={handleChange}
          required
        />
      )}
      <label className="text-xs pt-5">Nomor Handphone</label>
      <label className="text-red-500 px-1">*</label>
      {dataNik ? (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full cursor-default mb-2"
          name="tlp_kreditor"
          onChange={handleChange}
          value={dataNik.phone}
        />
      ) : (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="tlp_kreditor"
          onChange={handleChange}
          required
        />
      )}
      {/* {kreditor && inputApht.tlp_kreditor === undefined ? (
        <div className="mx-auto mt--2 mb-1">
          <label className="text-xxs italic text-red-600">
            Nomor Handphone Tidak Boleh Kosong
          </label>
        </div>
      ) : null} */}
      {warning === 2 ? (
        <label className="text-sm bg-yellow-300 text-black rounded-md flex mb-2 mt-2">
          <i className="far fa-times-circle mr-1 ml-2 text-red-500 text-xl pt-2"></i>
          <div className="py-3">
            Belum Memiliki Akun Infinite Digital Security
          </div>
        </label>
      ) : null}
      <div className="relative w-full mb-3">
        <label className="block text-xs pt-2 font-bold mb-2">
          Apakah Status Pihak Kedua (Kreditor) Sudah Menikah?
          <label className="text-red-500 px-1">*</label>
        </label>
        <select
          className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="status_kreditor"
          onChange={handleChange}
          required
        >
          <option></option>
          <option value="menikah">Menikah</option>
          <option value="belum_menikah">Belum Menikah</option>
        </select>
      </div>
      {/* {kreditor && inputApht.status_kreditor === undefined ? (
        <div className="mx-auto mt--3 mb-1">
          <label className="text-xxs italic text-red-600">
            Pilih Salah Satu
          </label>
        </div>
      ) : null} */}
      <div className="relative w-full mb-3">
        <label className="text-xs pt-5 font-bold">Status Hukum</label>
        <label className="text-red-500 px-1">*</label>
        <select
          className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="tipe_kreditor"
          onChange={handleChange}
          required
        >
          <option></option>
          <option value="personal">Perseorangan</option>
          <option value="perusahaan">Perusahaan</option>
        </select>
      </div>
      {/* {kreditor && inputApht.tipe_kreditor === undefined ? (
        <div className="mx-auto mt--3 mb-1">
          <label className="text-xxs italic text-red-600">
            Pilih Salah Satu
          </label>
        </div>
      ) : null} */}
      {inputApht.tipe_kreditor === "perusahaan" ? (
        <div className="relative w-full mb-3">
          <label className="text-xs pt-5 font-bold">Bank</label>
          <label className="text-red-500 px-1">*</label>
          <select
            className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="tipe_bank_kreditor"
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="bca">BCA</option>
            <option value="mandiri">Mandiri</option>
            <option value="bni">BNI</option>
            <option value="bri">BRI</option>
          </select>
        </div>
      ) : null}
      {/* {inputApht.tipe_kreditor === "perusahaan" &&
      inputApht.tipe_bank_kreditor === undefined ? (
        <div className="mx-auto mt--3 mb-1">
          <label className="text-xxs italic text-red-600">
            Pilih Salah Satu
          </label>
        </div>
      ) : null} */}
      {/* {warning ? (
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
      )} */}
    </div>
  );
};

export default InputKreditor;
