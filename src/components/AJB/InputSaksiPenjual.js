import React, { useContext, useState } from "react";

import { MyAjbContext } from "Context/AjbContext";
import Cookies from "js-cookie";
import swal from "sweetalert";

const InputSaksiPenjual = ({ next }) => {
  const { setAjb, inputAjb, setInputAjb, cekKtp, warning, setLoadingFile } =
    useContext(MyAjbContext);
  const [saksi, setSaksi] = useState(false);

  if (saksi) {
    return next;
  }

  const addSaksi = (e) => {
    if (inputAjb.nik_saksi_penjual?.length !== 16) {
      swal("Gagal", "NIK harus 16 digit", "error");
    } else {
      if (
        inputAjb.nik_saksi_penjual !== undefined &&
        inputAjb.email_saksi_penjual !== undefined &&
        inputAjb.tlp_saksi_penjual !== undefined
      ) {
        let inputValue = e.target.value;
        let formInput = e.target.name;
        setInputAjb({
          ...inputAjb,
          [formInput]: inputValue,
          id_transaksi: Cookies.get("id_transaksi"),
        });
        setAjb({ ...inputAjb });
        setSaksi(true);
        next();
      }
    }
  };

  const inviteSaksi = (e) => {
    e.preventDefault();
    setAjb({ ...inputAjb });
    swal({
      title: "Berhasil",
      text: "Berhasil mengisi data penjual!",
      type: "success",
    }).then(function () {
      // props._next();
    });
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputAjb({ ...inputAjb, [formInput]: inputValue });
  };

  const searchKtpSaksi = () => {
    if (inputAjb.nik_saksi_penjual) {
      setLoadingFile(true);
      cekKtp(inputAjb.nik_saksi_penjual, "saksi_penjual");
    }
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block text-xs font-bold mt-6 mb-2"
        htmlFor="grid-password"
      >
        Tambahkan Identitas Saksi Pihak Pertama (Penjual)
      </label>
      <label className="text-xs">Nomor Induk Kependudukan (NIK)</label>
      <input
        type="number"
        className="border-0 px-3 py-2 bg-broken-white rounded shadow-input text-sm focus:outline-none w-full ease-linear transition-all duration-150 mb-2"
        name="nik_saksi_penjual"
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <button
        type="button"
        onClick={searchKtpSaksi}
        className="showPass focus:outline-none"
      >
        <i className={"fa fa-search search-nik bg-blue"}></i>
      </button>
      <label className="text-xs pt-5">E-Mail Aktif</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="email"
        className="border-0 px-3 py-2 bg-broken-white rounded text-sm shadow-input focus:outline-none w-full cursor-text mb-2"
        name="email_saksi_penjual"
        onChange={handleChange}
        value={inputAjb.email_saksi_penjual}
        autoComplete="off"
        required
      />
      <label className="text-xs pt-5">Nomor Handphone</label>
      <label className="text-red-500 px-1">*</label>
      <input
        type="text"
        className="border-0 px-3 py-2 bg-broken-white cursor-text rounded text-sm shadow-input focus:outline-none w-full mb-2"
        name="tlp_saksi_penjual"
        onChange={handleChange}
        value={inputAjb.tlp_saksi_penjual}
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

      <button
        className={`${
          warning ? "bg-blue" : "bg-green-n"
        }  text-white text-s mt-2 font-bold mb-6 cursor-pointer rounded-lg py-2 px-10 w-full`}
        onClick={warning ? inviteSaksi : addSaksi}
      >
        {warning ? "Undang & Lanjutkan" : "Submit"}
      </button>
    </div>
  );
};

export default InputSaksiPenjual;
