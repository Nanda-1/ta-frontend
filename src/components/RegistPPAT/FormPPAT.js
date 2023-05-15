import React from "react";

const FormPPAT = ({
  changeHandle,
  inputRegist,
  dataKec,
  dataKota,
  dataProv,
  filter,
  object,
}) => {
  return (
    <div className="rounded-t mb-0 px-6 py-6">
      <div className="text-center mb-2">
        <h1 className="text-blue text-xl font-bold">
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
          value={inputRegist.ppat_name || object ? object.ppat_name : ""}
          // required
        />
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
          value={inputRegist.ppat_alamat || object ? object.ppat_alamat : ""}
          // required
        />
      </div>
      <div className="relative flex flex-wrap my-6 w-full">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Provinsi
        </label>
        <select
          value={object ? object.ppat_prov : filter.ppat_prov}
          onChange={changeHandle}
          name="ppat_prov"
          className="bg-white rounded text-sm shadow w-full"
        >
          <option value="">
            Pilih Provinsi
          </option>
          {dataProv.map((item) => {
            return (
              <option value={item.province_id} key={item.province_id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="relative flex flex-wrap my-6 w-full">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Kota
        </label>
        <select
          value={object ? object.ppat_kotkab : ""}
          onChange={changeHandle}
          name="ppat_kotkab"
          className="bg-white rounded text-black text-sm shadow w-full"
        >
          <option value="">
            Pilih Kota
          </option>
          {dataKota
            .filter((el) => el.province_id === Number(object ? object.ppat_prov : filter.ppat_prov))
            .map((item) => {
              return (
                <option value={item.city_id} key={item.city_id}>
                  {item.name}
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
          value={object ? object.ppat_kecamatan : ""}
          onChange={changeHandle}
          name="ppat_kecamatan"
          className="bg-white rounded text-sm shadow w-full"
        >
          <option value="">
            Pilih Kecamatan
          </option>
          {dataKec
            .filter((el) => el.city_id === Number(object ? object.ppat_kotkab : filter.ppat_kotkab))
            .map((item) => {
              return (
                <option value={item.district_id} key={item.district_id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      {/* <div className="relative flex flex-wrap my-6 w-full">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Kelurahan
        </label>
        <select
          value={object ? object.ppat_kelurahan : ""}
          onChange={changeHandle}
          name="ppat_kelurahan"
          className="bg-white rounded text-sm shadow w-full"
        >
          <option value="" disabled>
            Pilih Kelurahan
          </option>
          {dataKel
            .filter((el) => el.district_id === Number(object ? object.ppat_kecamatan : filter.ppat_kecamatan))
            .map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.nama}
                </option>
              );
            })}
        </select>
      </div> */}
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="relative w-auto mb-1 mr-2">
          <label className="block text-blueGray-600 text-xs font-bold mb-2">
            RT
          </label>
          <input
            type="text"
            id="ppat_rt"
            name="ppat_rt"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="RT"
            onChange={changeHandle}
            value={inputRegist.ppat_rt || object ? object.ppat_rt : ""}
            // required
          />
        </div>
        <div className="relative w-auto mb-1 mr-2">
          <label className="block text-blueGray-600 text-xs font-bold mb-2">
            RW
          </label>
          <input
            type="text"
            id="ppat_rw"
            name="ppat_rw"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="RW"
            onChange={changeHandle}
            value={inputRegist.ppat_rw || object ? object.ppat_rw : ""}
            // required
          />
        </div>
        <div className="relative w-auto mb-1 mr-2">
          <label className="block text-blueGray-600 text-xs font-bold mb-2">
            Kode Pos
          </label>
          <input
            type="text"
            id="ppat_kodepos"
            name="ppat_kodepos"
            className="border-0 px-4 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Kode Pos"
            onChange={changeHandle}
            value={inputRegist.ppat_kodepos || object ? object.ppat_kodepos : ""}
            // required
          />
        </div>
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
                inputRegist.no_sk_pengangkatan || object
                  ? object.no_sk_pengangkatan
                  : ""
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
              value={inputRegist.tgl_sk || object ? object.tgl_sk : ""}
              // required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPPAT;