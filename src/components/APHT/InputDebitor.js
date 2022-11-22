import React, { useContext } from "react";

import { MyAphtcontext } from "Context/AphtContext";
import Cookies from "js-cookie";
import swal from "sweetalert";

const InputDebitor = () => {
  const {
    inputApht,
    setApht,
    setDataNik,
    setInputApht,
    cekKtp,
    dataNik,
    warning,
    setWarning,
    setLoadingFile,
    debitor,
    setDebitor,
  } = useContext(MyAphtcontext);

  const addDebitor = (e) => {
    if (inputApht.nik_debitor) {
      let nikNum = inputApht.nik_debitor.length;

      if (nikNum !== 16) {
        swal("Gagal", "NIK harus 16 digit", "error");
      }
    }
    if (dataNik) {
      let name = "id_transaksi";
      let id_transaksi = Cookies.get("id_transaksi");
      let emailDebitor = "email_debitor";
      let phoneDebitor = "tlp_debitor";
      let inputValue = e.target.value;
      let formInput = e.target.name;
      setInputApht({
        ...inputApht,
        [emailDebitor]: dataNik.email,
        [phoneDebitor]: dataNik.phone,
        [formInput]: inputValue,
        [name]: id_transaksi,
      });
      if (
        inputApht.tipe_debitor !== undefined &&
        inputApht.status_debitor !== undefined
      ) {
        setApht({ ...inputApht });
        setDebitor(true);
      }
    } else {
      if (
        inputApht.nik_debitor !== undefined &&
        inputApht.email_debitor !== undefined &&
        inputApht.tlp_debitor !== undefined &&
        inputApht.tipe_debitor !== undefined &&
        inputApht.status_debitor !== undefined
      ) {
        setApht({ ...inputApht });
        setDebitor(true);
      }
    }
    setDataNik("");
  };

  const inviteDebitor = (e) => {
    e.preventDefault();
    setWarning(0);
    setDataNik(null);
    setApht({ ...inputApht });
    // return {props.}
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputApht({ ...inputApht, [formInput]: inputValue });
  };

  const searchKtpDebitor = () => {
    if (inputApht.nik_debitor) {
      setWarning(0);
      setLoadingFile(true);
      cekKtp(inputApht.nik_debitor, "penjual");
    }
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-xs font-bold mb-2 mt-3"
        htmlFor="grid-password"
      >
        Tambahkan Identitas Pihak Pertama (Debitor)
      </label>
      <label className="text-xs">Nomor Induk Kependudukan (NIK)</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="text"
        className="border-0 px-3 py-2 bg-broken-white rounded shadow-input text-sm focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
        name="nik_debitor"
        onChange={handleChange}
        required
      />
      <button
        type="button"
        onClick={searchKtpDebitor}
        className="showPass focus:outline-none bg-gray-2"
      >
        <i className={"fa fa-search search-nik bg-blue"}></i>
      </button>
      {debitor && inputApht.nik_debitor === undefined ? (
        <div className="mx-auto mt--2 mb-1">
          <label className="text-xxs italic text-red-600">
            NIK Tidak Boleh Kosong
          </label>
        </div>
      ) : null}
      <label className="text-xs pt-5">E-Mail Aktif</label>
      <label className="text-red-500 px-1">*</label>
      {dataNik ? (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full cursor-default mb-2"
          name="email_debitor"
          onChange={handleChange}
          value={dataNik.email}
        />
      ) : (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="email_debitor"
          onChange={handleChange}
          required
        />
      )}
      {debitor && inputApht.email_debitor === undefined ? (
        <div className="mx-auto mt--2 mb-1">
          <label className="text-xxs italic text-red-600">
            E-Mail Tidak Boleh Kosong
          </label>
        </div>
      ) : null}
      <label className="text-xs pt-5">Nomor Handphone</label>
      <label className="text-red-500 px-1">*</label>
      {dataNik ? (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full cursor-default mb-2"
          name="tlp_debitor"
          onChange={handleChange}
          value={dataNik.phone}
        />
      ) : (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="tlp_debitor"
          onChange={handleChange}
          required
        />
      )}
      {debitor && inputApht.tlp_debitor === undefined ? (
        <div className="mx-auto mt--2 mb-1">
          <label className="text-xxs italic text-red-600">
            Nomor Handphone Tidak Boleh Kosong
          </label>
        </div>
      ) : null}
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
          Apakah Status Pihak Pertama (Debitor) Sudah Menikah?
          <label className="text-red-500 px-1">*</label>
        </label>
        <select
          className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="status_debitor"
          onChange={handleChange}
          required
        >
          <option></option>
          <option value="menikah">Menikah</option>
          <option value="belum_menikah">Belum Menikah</option>
        </select>
      </div>
      {debitor && inputApht.status_debitor === undefined ? (
        <div className="mx-auto mt--3 mb-1">
          <label className="text-xxs italic text-red-600">
            Pilih Salah Satu
          </label>
        </div>
      ) : null}
      <div className="relative w-full mb-3">
        <label className="text-xs pt-5 font-bold">Status Hukum</label>
        <label className="text-red-500 px-1">*</label>
        <select
          className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="tipe_debitor"
          onChange={handleChange}
          required
        >
          <option></option>
          <option value="personal">Perseorangan</option>
          <option value="perusahaan">Perusahaan</option>
        </select>
      </div>
      {debitor && inputApht.tipe_debitor === undefined ? (
        <div className="mx-auto mt--3 mb-1">
          <label className="text-xxs italic text-red-600">
            Pilih Salah Satu
          </label>
        </div>
      ) : null}
      {inputApht.tipe_debitor === "perusahaan" ? (
        <div className="relative w-full mb-3">
          <label className="text-xs pt-5 font-bold">Bank</label>
          <label className="text-red-500 px-1">*</label>
          <select
            className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="tipe_bank_debitor"
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
      {inputApht.tipe_debitor === "perusahaan" &&
      inputApht.tipe_bank_debitor === undefined ? (
        <div className="mx-auto mt--3 mb-1">
          <label className="text-xxs italic text-red-600">
            Pilih Salah Satu
          </label>
        </div>
      ) : null}
      {warning ? (
        <button
          className="bg-blue text-white text-s mt-2 font-bold mb-6 cursor-pointer rounded-lg py-2 px-10 w-full"
          onClick={inviteDebitor}
        >
          Undang & Lanjutkan
        </button>
      ) : (
        <button
          className="bg-green-n text-white float-right text-sm mt-2 mb-6 cursor-pointer rounded-lg py-2 px-10 w-full"
          onClick={addDebitor}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default InputDebitor;
