import React, { useContext, useEffect, useState } from "react";
import { RegistContext } from "views/auth/RegistContext";
import cookies from "js-cookie";
import { FormGroup } from "reactstrap";
// import swal from "sweetalert";

const Step3r = (provs) => {
  const {
    inputRegist,
    setInputRegist,
    dataProv,
    dataKota,
    dataKec,
    dataCityFilter1,
    dataDistrictFilter1,
    all,
  } = useContext(RegistContext);

  const {
    getDataProv,
    getDataKota,
    getDataKec,
    getCityFilter1,
    getDistrictFilter1,
  } = all;

  const [filter, setFilter] = useState({});

  const changeHandlerProv1 = (provsdata) => {
    provsdata.preventDefault();
    let name = "id_prov";
    const id_prov = provsdata.target.value;
    setFilter({ ...filter, [name]: id_prov });
    setInputRegist({ ...inputRegist, [name]: id_prov });
    cookies.set("prov", id_prov);

    // setDataKota({});
    // if (id_prov !== null) {
    getCityFilter1(id_prov);
    // alert("berhasil");
    // }
  };

  const changehandlerKota1 = (kotadata) => {
    kotadata.preventDefault();
    let namakota = "id_kota";
    let id_kota = kotadata.target.value;
    setFilter({ ...filter, [namakota]: id_kota });
    setInputRegist({ ...inputRegist, [namakota]: id_kota });
    cookies.set("kotkab", id_kota);

    // console.log(inputRegist);
    if (filter.id_prov) {
      getDistrictFilter1(id_kota);
    }
  };

  const changeHandlerKec1 = (kecdata) => {
    kecdata.preventDefault();
    let namakec = "id_camat";
    let id_camat = kecdata.target.value;
    setFilter({ ...filter, [namakec]: id_camat });
    setInputRegist({ ...inputRegist, [namakec]: id_camat });
    cookies.set("kecamatan", id_camat);
  };

  //Save to Context
  const changeHandle = (masukin) => {
    let isian = masukin.target.value;
    let formIsian = masukin.target.name;
    setInputRegist({ ...inputRegist, [formIsian]: isian });
    cookies.set(formIsian, isian);
  };

  useEffect(() => {
    getDataProv();
    getDataKota();
    getDataKec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (provs.currentStep !== 4) {
    return null;
  }

  return (
    <>
      <p className="pt-10"></p>
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t mt-8 px-6 py-6">
            <div className="text-center mb-2">
              <h1 className="text-blue text-xl font-bold">
                Lengkapi Form Data Diri
              </h1>
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
                value={inputRegist.nama || ""}
                required
              />
            </div>
            <div className="relative flex flex-wrap my-6 w-auto">
              <div className="w-1/2">
                <div className="relative w-auto mb-1 mr-2">
                  <label
                    className="block text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempat_lahir"
                    name="tempat_lahir"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Tempat Lahir"
                    onChange={changeHandle}
                    value={inputRegist.tempat_lahir || ""}
                    required
                  />
                </div>
              </div>
              <div className="w-1/2 text-left">
                <div className="relative w-auto mb-1">
                  <label
                    className="block text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Tanggal Lahir"
                    onChange={changeHandle}
                    value={inputRegist.tanggal_lahir || ""}
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
                    onChange={changeHandle}
                    name="gender"
                    className="bg-white rounded text-sm shadow"
                  >
                    <option onChange={changeHandle}>Pilih Jenis Kelamin</option>
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
                    onChange={changeHandle}
                    name="status_nikah"
                    className="bg-white rounded text-sm shadow w-full"
                  >
                    <option>Pilih Status</option>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Menikah">Menikah</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="relative flex flex-wrap my-6 w-auto">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Alamat Rumah
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Alamat Rumah"
                onChange={changeHandle}
                value={inputRegist.alamat || ""}
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
                    onChange={changeHandlerProv1}
                    name="id_prov"
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
              </div>
              <div className="w-1/2 text-left">
                <div className="relative w-auto mb-1">
                  <label className="block text-blueGray-600 text-xs font-bold mb-2">
                    Kota
                  </label>
                  <select
                    onChange={changehandlerKota1}
                    name="id_kota"
                    className="bg-white rounded text-sm shadow w-full"
                  >
                    <option value="">Pilih Kota</option>
                    {filter.id_prov ? (
                      <>
                        {dataCityFilter1.map((item) => {
                          return (
                            <option value={item.id_kota} key={item.id_kota}>
                              {item.nama_kota}
                            </option>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {dataKota.map((item) => {
                          return (
                            <option value={item.id_kota} key={item.id_kota}>
                              {item.nama_kota}
                            </option>
                          );
                        })}
                      </>
                    )}
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
                    onChange={changeHandlerKec1}
                    name="id_camat"
                    className="bg-white rounded text-sm shadow w-full"
                  >
                    <option value="">Pilih Kecamatan</option>
                    {filter.id_kota ? (
                      <>
                        {dataDistrictFilter1.map((item) => {
                          return (
                            <option
                              value={item.id_kecamatan}
                              key={item.id_kecamatan}
                            >
                              {item.nama_kecamatan}
                            </option>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {dataKec.map((item) => {
                          return (
                            <option
                              value={item.id_kecamatan}
                              key={item.id_kecamatan}
                            >
                              {item.nama_kecamatan}
                            </option>
                          );
                        })}
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="w-1/2 text-left">
                <div className="relative w-auto mb-1 mr-2">
                  <label
                    className="block text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    id="kodepos"
                    name="kodepos"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Kode Pos"
                    onChange={changeHandle}
                    value={inputRegist.kodepos || ""}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="relative flex flex-wrap my-6 w-auto">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                NIK
              </label>
              <input
                // type="number"
                id="no_nik"
                name="no_nik"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Nomor Induk Kependudukan"
                onChange={changeHandle}
                value={inputRegist.no_nik || ""}
                required
              />
            </div>
            <div className="relative w-full mb-1">
              <label
                className="block text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                NPWP
              </label>
              <input
                // type="number"
                id="no_npwp"
                name="no_npwp"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Nomor Pokok Wajib Pajak"
                onChange={changeHandle}
                value={inputRegist.no_npwp || ""}
                required
              />
            </div>
          </div>
          <hr className="mt-6 border-b-0 border-blueGray-300" />
        </div>
      </FormGroup>
    </>
  );
};

export default Step3r;
