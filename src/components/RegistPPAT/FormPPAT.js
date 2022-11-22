import React from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Cookies from "js-cookie";

const FormPPAT = ({
  changeHandle,
  inputRegist,
  dataKec,
  dataKota,
  dataProv,
  filter,
}) => {

  return (
    <div className="rounded-t mb-0 px-6 py-6">
      <div className="text-center mb-2">
        <h1 className="text-blue-500 text-xl font-bold">
          Lengkapi Form Data Diri <br /> Pejabat Pembuat Akta Tanah
        </h1>
      </div>
      <div className="text-coolGray-900 text-center mb-1 font-bold">
        <small>Lengkapi form legalitas PPAT dengan baik dan benar.</small>
      </div>
      <hr className="mt-3 border-b-0" />
      {/* <form> */}
      <div className="relative flex flex-wrap my-6 w-auto">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Nama Pejabat Pembuat Akta Tanah
        </label>
        <input
          type="text"
          name="ppat_name"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Nama Pejabat Pembuat Akta Tanah"
          onChange={changeHandle}
          value={inputRegist.ppat_name || Cookies.get("ppat_name") || ""}
          // required
        />
      </div>
      <div className="relative flex flex-wrap my-6 w-full">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Provinsi
        </label>
        <select
          value={Cookies.get("ppat_prov")}
          onChange={changeHandle}
          name="ppat_prov"
          className="bg-white rounded text-sm shadow w-full"
        >
          <option value="">Pilih Provinsi</option>
          {dataProv.map((item) => {
            return (
              <option value={item.id_provinsi} key={item.id_provinsi}>
                {item.nama_provinsi}
              </option>
            );
          })}
        </select>
      </div>
      <div className="relative flex flex-wrap my-6 w-full">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Kabupaten/Kota
        </label>
        <select
          value={Cookies.get("ppat_kotkab")}
          onChange={changeHandle}
          name="ppat_kotkab"
          className="bg-white rounded text-sm shadow w-full"
        >
          <option value="">Pilih Kota</option>
          {dataKota
            .filter((el) => el.id_provinsi === Number(filter.ppat_prov))
            .map((item) => {
              return (
                <option value={item.id_kota} key={item.id_kota}>
                  {item.nama_kota}
                </option>
              );
            })}
        </select>
      </div>
      <div className="relative flex flex-wrap my-6 w-full">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Kecamatan
        </label>
        <select
          value={Cookies.get("ppat_kecamatan")}
          onChange={changeHandle}
          name="ppat_kecamatan"
          className="bg-white rounded text-sm shadow w-full"
        >
          <option value="">Pilih Kecamatan</option>
          {dataKec
            .filter((el) => el.id_kota === Number(filter.ppat_kotkab))
            .map((item) => {
              return (
                <option value={item.id_kecamatan} key={item.id_kecamatan}>
                  {item.nama_kecamatan}
                </option>
              );
            })}
        </select>
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Alamat Kantor PPAT
        </label>
        <input
          type="text"
          name="ppat_alamat"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Alamat Kantor PPAT"
          onChange={changeHandle}
          value={inputRegist.ppat_alamat || Cookies.get("ppat_alamat") || ""}
          // required
        />
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="w-1/2">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Nomor SK Pengangkatan PPAT
            </label>
            <input
              type="text"
              name="no_sk_pengangkatan"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="No.SK Pengangkatan PPAT"
              onChange={changeHandle}
              value={
                inputRegist.no_sk_pengangkatan ||
                Cookies.get("no_sk_pengangkatan") ||
                ""
              }
              // required
            />
          </div>
        </div>
        <div className="w-1/2 text-left">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Tanggal SK
            </label>
            <input
              type="date"
              name="tgl_sk"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Tanggal SK"
              onChange={changeHandle}
              value={inputRegist.tgl_sk || Cookies.get("tgl_sk") || ""}
              // required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPPAT;
