import React from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const FormDataDiri = ({
  changeHandle,
  inputRegist,
  dataKel,
  dataKec,
  dataKota,
  dataProv,
  filter,
  object,
}) => {
  return (
    <div className="rounded-t mt-8 px-6 py-6">
      <div className="text-center mb-2">
        <h1 className="text-blue text-xl font-bold">Lengkapi Form Data Diri</h1>
      </div>
      <div className="text-coolGray-900 text-center mb-1 font-bold">
        <small>Lengkapi form data diri dengan baik dan benar.</small>
      </div>
      <hr className="mt-3 border-b-0" />
      {/* <form onSubmit={changeHandle}> */}
      <div className="relative flex flex-wrap my-6 w-auto">
        <label
          className="block text-blueGray-600 text-xs font-bold mb-2"
          name="nama"
        >
          Nama Lengkap
        </label>
        <input
          type="text"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Nama Lengkap"
          name="nama"
          id="nama"
          onChange={changeHandle}
          value={object ? object.nama : ""}
          required
        />
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="w-1/2">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Tempat Lahir
            </label>
            <input
              type="text"
              id="tempat_lahir"
              name="tempat_lahir"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Tempat Lahir"
              onChange={changeHandle}
              value={
                inputRegist.tempat_lahir || object ? object.tempat_lahir : ""
              }
              required
            />
          </div>
        </div>
        <div className="w-1/2 text-left">
          <div className="relative w-auto mb-1">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tanggal_lahir"
              name="tanggal_lahir"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Tanggal Lahir"
              onChange={changeHandle}
              value={
                inputRegist.tanggal_lahir || object ? object.tanggal_lahir : ""
              }
              required
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="w-1/2">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Jenis Kelamin
            </label>
            <select
              value={object ? object.gender : ""}
              onChange={changeHandle}
              name="gender"
              required
              className="bg-white rounded text-sm shadow w-full"
            >
              <option value="">
                Pilih Jenis Kelamin
              </option>
              <option value="M">Laki-laki</option>
              <option value="F">Perempuan</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 text-left">
          <div className="relative w-auto mb-1">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Status
            </label>
            <select
              value={object ? object.status_nikah : ""}
              onChange={changeHandle}
              name="status_nikah"
              required
              className="bg-white rounded text-sm shadow w-full"
            >
              <option value="">
                Pilih Status
              </option>
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Cerai">Cerai</option>
              <option value="Cerai Mati">Cerai Mati</option>
            </select>
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          Alamat Rumah
        </label>
        <input
          type="text"
          id="alamat"
          name="alamat"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Alamat Rumah"
          onChange={changeHandle}
          value={inputRegist.alamat || object ? object.alamat : ""}
          required
        />
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="w-1/2">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Provinsi
            </label>
            <select
              value={object ? object.id_prov : ""}
              onChange={changeHandle}
              name="id_prov"
              required
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
        </div>
        <div className="w-1/2 text-left">
          <div className="relative w-auto mb-1">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Kota
            </label>
            <select
              value={object ? object.id_kota : ""}
              onChange={changeHandle}
              name="id_kota"
              required
              className="bg-white rounded text-black text-sm shadow w-full"
            >
              <option value="">
                Pilih Kota
              </option>
              {dataKota
                .filter(
                  (el) =>
                    el.province_id ===
                    Number(object ? object.id_prov : filter.id_prov)
                )
                .map((item) => {
                  return (
                    <option value={item.city_id} key={item.city_id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="w-1/2">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Kecamatan
            </label>
            <select
              value={object ? object.id_camat : ""}
              onChange={changeHandle}
              name="id_camat"
              required
              className="bg-white rounded text-sm shadow w-full"
            >
              <option value="">
                Pilih Kecamatan
              </option>
              {dataKec
                .filter(
                  (el) =>
                    el.city_id ===
                    Number(object ? object.id_kota : filter.id_kota)
                    
                )
                .map((item) => {
                  return (
                    <option value={item.district_id} key={item.district_id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="w-1/2 text-left">
          <div className="relative w-auto mb-1 mr-2">
            <label className="block text-blueGray-600 text-xs font-bold mb-2">
              Kelurahan
            </label>
            <select
              value={object ? object.id_lurah : ""}
              onChange={changeHandle}
              name="id_lurah"
              required
              className="bg-white rounded text-sm shadow w-full"
            >
              <option value="">
                Pilih Kelurahan
              </option>
              {dataKel?.map((item) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.nama}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <div className="relative w-auto mb-1 mr-2">
          <label className="block text-blueGray-600 text-xs font-bold mb-2">
            RT
          </label>
          <input
            type="text"
            id="rt"
            name="rt"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="RT"
            onChange={changeHandle}
            value={inputRegist.rt || object ? object.rt : ""}
            required
          />
        </div>
        <div className="relative w-auto mb-1 mr-2">
          <label className="block text-blueGray-600 text-xs font-bold mb-2">
            RW
          </label>
          <input
            type="text"
            id="rw"
            name="rw"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="RW"
            onChange={changeHandle}
            value={inputRegist.rw || object ? object.rw : ""}
            required
          />
        </div>
        <div className="relative w-auto mb-1 mr-2">
          <label className="block text-blueGray-600 text-xs font-bold mb-2">
            Kode Pos
          </label>
          <input
            type="text"
            id="kodepos"
            name="kodepos"
            className="border-0 px-4 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Kode Pos"
            onChange={changeHandle}
            value={inputRegist.kodepos || object ? object.kodepos : ""}
            required
          />
        </div>
      </div>
      <div className="relative flex flex-wrap my-6 w-auto">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          NIK
        </label>
        <input
          // type="number"
          id="no_nik"
          name="no_nik"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Nomor Induk Kependudukan"
          onChange={changeHandle}
          value={inputRegist.no_nik || object ? object.no_nik : ""}
          required
        />
      </div>
      <div className="relative w-full mb-1">
        <label className="block text-blueGray-600 text-xs font-bold mb-2">
          NPWP
        </label>
        <input
          // type="number"
          id="no_npwp"
          name="no_npwp"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Nomor Pokok Wajib Pajak"
          onChange={changeHandle}
          value={inputRegist.no_npwp || object ? object.no_npwp : ""}
          required
        />
      </div>
    </div>
  );
};

export default FormDataDiri;
