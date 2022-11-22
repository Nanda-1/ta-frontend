import React, { useContext, useState } from "react";

import { MyAphtcontext } from "Context/AphtContext";
import Cookies from "js-cookie";
import swal from "sweetalert";

const InputSaksiKreditor = () => {
  const {
    setApht,
    inputApht,
    setInputApht,
    cekKtp,
    dataNik,
    setDataNik,
    warning,
    setWarning,
    setLoadingFile,
  } = useContext(MyAphtcontext);
  const [saksi, setSaksi] = useState(false);

  const addSaksi = (e) => {
    setSaksi(true);
    if (inputApht.nik_saksi_kreditor) {
      let nikNum = inputApht.nik_saksi_kreditor.length;

      if (nikNum !== 16) {
        swal("Gagal", "NIK harus 16 digit", "error");
      }
    }
    if (dataNik) {
      let name = "id_transaksi";
      let id_transaksi = Cookies.get("id_transaksi");
      let emailKreditor = "email_saksi_kreditor";
      let phoneKreditor = "tlp_saksi_kreditor";
      let inputValue = e.target.value;
      let formInput = e.target.name;
      setInputApht({
        ...inputApht,
        [emailKreditor]: dataNik.email,
        [phoneKreditor]: dataNik.phone,
        [formInput]: inputValue,
        [name]: id_transaksi,
      });
      setApht({ ...inputApht });
    } else {
      if (
        inputApht.nik_saksi_kreditor !== undefined &&
        inputApht.email_saksi_kreditor !== undefined &&
        inputApht.tlp_saksi_kreditor !== undefined
      ) {
        setApht({ ...inputApht });
      }
    }
    setDataNik("");
  };

  const inviteSaksi = (e) => {
    e.preventDefault();
    setDataNik(null);
    setWarning(0);
    setApht({ ...inputApht });
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputApht({ ...inputApht, [formInput]: inputValue });
  };

  const searchKtpSaksi = () => {
    if (inputApht.nik_saksi_kreditor) {
      setWarning(0);
      setLoadingFile(true);
      cekKtp(inputApht.nik_saksi_kreditor, "saksi_kreditor");
    }
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-xs font-bold mt-6 mb-2"
        htmlFor="grid-password"
      >
        Tambahkan Identitas Saksi Pihak Kedua (Kreditor)
      </label>
      <label className="text-xs">Nomor Induk Kependudukan (NIK)</label>
      <input
        type="number"
        className="border-0 px-3 py-2 bg-broken-white rounded shadow-input text-sm focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
        name="nik_saksi_kreditor"
        onChange={handleChange}
        required
      />
      <button
        type="button"
        onClick={searchKtpSaksi}
        className="showPass focus:outline-none bg-gray-2"
      >
        <i className={"fa fa-search search-nik bg-blue"}></i>
      </button>
      {saksi && inputApht.nik_saksi_kreditor === undefined ? (
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
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="email_saksi_kreditor"
          onChange={handleChange}
          value={dataNik.email}
        />
      ) : (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="email_saksi_kreditor"
          onChange={handleChange}
          required
        />
      )}
      {saksi && inputApht.email_saksi_kreditor === undefined ? (
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
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="tlp_saksi_kreditor"
          onChange={handleChange}
          value={dataNik.phone}
        />
      ) : (
        <input
          type="text"
          className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
          name="tlp_saksi_kreditor"
          onChange={handleChange}
          required
        />
      )}
      {saksi && inputApht.tlp_saksi_kreditor === undefined ? (
        <div className="mx-auto mt--2 mb-1">
          <label className="text-xxs italic text-red-600">
            Nomor Handphone Tidak Boleh Kosong
          </label>
        </div>
      ) : null}
      {warning === 1 ? (
        <label className="text-sm bg-yellow-300 text-black rounded-md flex mb-2 mt-2">
          <i className="far fa-times-circle mr-1 ml-2 text-red-500 text-xl pt-2"></i>
          <div className="py-3">
            Belum Memiliki Akun Infinite Digital Security
          </div>
        </label>
      ) : null}
      {warning ? (
        <button
          className="bg-blue text-white text-s mt-2 font-bold mb-6 cursor-pointer rounded-lg py-2 px-10 w-full"
          onClick={inviteSaksi}
        >
          Undang & Lanjutkan
        </button>
      ) : (
        <button
          className="bg-green-n text-white float-right text-sm mt-2 mb-6 cursor-pointer rounded-lg py-2 px-10 w-full"
          onClick={addSaksi}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default InputSaksiKreditor;
