import React, { useContext } from "react";

import { MyAjbContext } from "Context/AjbContext";
import Cookies from "js-cookie";
import swal from "sweetalert";

const InputPenjual = () => {
  const {
    inputAjb,
    setAjb,
    setDataNik,
    setInputAjb,
    cekKtp,
    warning,
    setWarning,
    setLoadingFile,
    setPenjual,
  } = useContext(MyAjbContext);

  const addPenjual = (e) => {
    if (inputAjb.nik_penjual && inputAjb.nik_penjual.length !== 16) {
      swal("Gagal", "NIK harus 16 digit", "error");
    } else {
      if (
        inputAjb.nik_penjual !== undefined &&
        inputAjb.email_penjual !== undefined &&
        inputAjb.tlp_penjual !== undefined &&
        inputAjb.tipe_penjual !== undefined &&
        inputAjb.status_penjual !== undefined
      ) {
        let inputValue = e.target.value;
        let formInput = e.target.name;
        setInputAjb({
          ...inputAjb,
          [formInput]: inputValue,
          id_transaksi: Cookies.get("id_transaksi"),
        });
        setAjb({ ...inputAjb });
        setPenjual(true);
      }
    }
  };

  const invitePenjual = (e) => {
    e.preventDefault();
    setWarning(0);
    setDataNik(null);
    setAjb({ ...inputAjb });
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputAjb({ ...inputAjb, [formInput]: inputValue });
  };

  const searchKtpPenjual = () => {
    if (inputAjb.nik_penjual) {
      setLoadingFile(true);
      cekKtp(inputAjb.nik_penjual, "penjual");
    }
    setWarning(false)
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-xs font-bold mb-2 mt-3"
        htmlFor="grid-password"
      >
        Tambahkan Identitas Pihak Pertama (Penjual)
      </label>
      <label className="text-xs">Nomor Induk Kependudukan (NIK)</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="text"
        className="border-0 px-3 py-2 bg-broken-white rounded shadow-input text-sm focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
        name="nik_penjual"
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <button
        type="button"
        onClick={searchKtpPenjual}
        className="showPass focus:outline-none"
      >
        <i className={"fa fa-search search-nik bg-blue"}></i>
      </button>
      <label className="text-xs pt-5">E-Mail Aktif</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="email"
        className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full cursor-text mb-2"
        name="email_penjual"
        onChange={handleChange}
        value={inputAjb.email_penjual}
        autoComplete="off"
        required
      />
      <label className="text-xs pt-5">Nomor Handphone</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="text"
        className="border-0 px-3 py-2 bg-broken-white cursor-text rounded text-sm shadow-input focus:outline-none w-full mb-2"
        name="tlp_penjual"
        onChange={handleChange}
        value={inputAjb.tlp_penjual}
        autoComplete="off"
        required
      />
      {warning ? (
        <label className="text-sm bg-yellow-300 text-black rounded-md flex mb-2 mt-2">
          <i className="far fa-times-circle mr-1 ml-2 text-red-500 text-xl pt-2"></i>
          <div className="py-3">
            Belum Memiliki Akun Infinite Digital Security
          </div>
        </label>
      ) : null}
      <div className="relative w-full mb-3">
        <label className="block text-xs pt-2 font-bold mb-2">
          Apakah Status Pihak Pertama (Penjual) Sudah Menikah?
          <label className="text-red-500 px-1">*</label>
        </label>
        <select
          className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="status_penjual"
          onChange={handleChange}
          required
        >
          <option></option>
          <option value="menikah">Menikah</option>
          <option value="belum_menikah">Belum Menikah</option>
        </select>
      </div>
      <div className="relative w-full mb-3">
        <label className="text-xs pt-5 font-bold">Status Hukum</label>
        <label className="text-red-500 px-1">*</label>
        <select
          className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
          name="tipe_penjual"
          onChange={handleChange}
          required
        >
          <option></option>
          <option value="personal">Perseorangan</option>
          <option value="perusahaan">Perusahaan</option>
        </select>
      </div>
      {inputAjb.tipe_penjual === "perusahaan" ? (
        <div className="relative w-full mb-3">
          <label className="text-xs pt-5 font-bold">Bank</label>
          <label className="text-red-500 px-1">*</label>
          <select
            className="border-0  cursor-pointer px-3 py-2 bg-broken-white rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
            name="tipe_bank_penjual"
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

      <button
        className={`${
          warning ? "bg-blue" : "bg-green-n"
        }  text-white text-s mt-2 font-bold mb-6 cursor-pointer rounded-lg py-2 px-10 w-full`}
        onClick={warning ? invitePenjual : addPenjual}
      >
        {warning ? "Undang & Lanjutkan" : "Submit"}
      </button>
    </div>
  );
};

export default InputPenjual;
