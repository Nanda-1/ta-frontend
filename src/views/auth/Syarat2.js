import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RegistContext } from "./RegistContext";
// import "./script";
import cookies from "js-cookie";

// import dropdown provinsi
import DDropdownProv from "components/Dropdowns/DDropdownProv ";
import DDropdownKota from "components/Dropdowns/DDropdownKota";
import DDropdownStatus from "components/Dropdowns/DDropdownStatus";
import DDropdownJK from "components/Dropdowns/DDropdownJK";

export default function Syarat2() {
  const { inputRegist, setInputRegist } = useContext(RegistContext);
  // const [setUser] = useState("");

  const changeHandle = (masukin) => {
    let isian = masukin.target.value;
    let formIsian = masukin.target.name;
    setInputRegist({ ...inputRegist, [formIsian]: isian });
    cookies.set("nama", inputRegist.nama, { expires: 1 });
    cookies.set("tmpt_lhr", inputRegist.tmpt_lhr, { expires: 1 });
    cookies.set("tgl_lhr", inputRegist.tgl_lhr, { expires: 1 });
    cookies.set("jk", inputRegist.jk, { expires: 1 });
    cookies.set("status", inputRegist.status, { expires: 1 });
    cookies.set("almt_rumah", inputRegist.almt_rumah, { expires: 1 });
    cookies.set("kota", inputRegist.kota, { expires: 1 });
    cookies.set("prov", inputRegist.prov, { expires: 1 });
    cookies.set("nohp", inputRegist.nohp, { expires: 1 });
    cookies.set("nik", inputRegist.nik, { expires: 1 });
    cookies.set("npwp", inputRegist.npwp, { expires: 1 });
    cookies.set("nama_ppat", inputRegist.nama_ppat, { expires: 1 });
    cookies.set("prov2", inputRegist.prov2, { expires: 1 });
    cookies.set("kota2", inputRegist.kota2, { expires: 1 });
    cookies.set("kecamatan", inputRegist.kecamatan, { expires: 1 });
    cookies.set("almt_ppat", inputRegist.almt_ppat, { expires: 1 });
    cookies.set("nosk_ppat", inputRegist.nosk_ppat, { expires: 1 });
    cookies.set("tgl_sk", inputRegist.tgl_sk, { expires: 1 });
    cookies.set("email_karyawan", inputRegist.email_karyawan, { expires: 1 });
    cookies.set("jabatan", inputRegist.jabatan, { expires: 1 });
    cookies.set("logo", inputRegist.logo, { expires: 1 });
  };

  // const addUser = (e) => {
  //   e.preventDefault();

  //   setRegist({ ...inputRegist });
  //   setUser(true);
  // };

  console.log(inputRegist);

  const [showModal, setShowModal] = React.useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const uploadPreview = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    // setRegist({ ...inputRegist });
  };

  const handleUpload = async (ektp) => {
    ektp.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("syarat1/YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  // const addElement = () => {
  //   var inputValue = document.getElementById("nama").value;

  //   try {
  //     var storageData = localStorage.getItem("data");
  //     var dataToWriteToStorage = {};
  //     if (storageData) {
  //       var parsedData = JSON.parse(storageData);
  //       if (parsedData.items && parsedData.items.length) {
  //         parsedData.items.push({
  //           id: new Date().getTime().toString(16),
  //           value: inputValue,
  //         });
  //         dataToWriteToStorage = parsedData;
  //       } else {
  //         dataToWriteToStorage = {
  //           items: [{ id: new Date().toString(16), value: inputValue }],
  //         };
  //       }
  //     }
  //     localStorage.setItem("data", JSON.stringify(dataToWriteToStorage));
  //     // Only add item to list once it's saved to localStorage
  //     var li = document.createElement("li");
  //     var t = document.createTextNode(inputValue);
  //     li.appendChild(t);
  //     document.getElementById("list").appendChild(li);
  //     // Reset the input
  //     document.getElementById("nama").value = "";
  //   } catch (e) {
  //     console.err("Error while saving item to local storage: ", e);
  //     alert("There was an error and the item could not be saved");
  //   }
  // };

  return (
    <>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-960 mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
                    Lengkapi Form Data Diri <br /> Pejabat Pembuat Akta Tanah
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center mb-1 font-bold">
                  <small>Lengkapi form data diri dengan baik dan benar.</small>
                </div>
                <hr className="mt-3 border-b-0" />
                <form onSubmit={changeHandle}>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
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
                      // required
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
                          id="tmpt_lhr"
                          name="tmpt_lhr"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Tempat Lahir"
                          onChange={changeHandle}
                          value={inputRegist.tmpt_lhr || ""}
                          // required
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
                          id="tgl_lhr"
                          name="tgl_lhr"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Tanggal Lahir"
                          onChange={changeHandle}
                          value={inputRegist.tgl_lhr || ""}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <div className="w-1/2">
                      <div className="relative w-auto mb-1 mr-2">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Jenis Kelamin
                        </label>
                        {/* <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Jenis Kelamin"
                          // required
                        /> */}
                        <DDropdownJK
                          onChange={changeHandle}
                          name="jk"
                          value={inputRegist.jk || ""}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 text-left">
                      <div className="relative w-auto mb-1">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Status
                        </label>
                        {/* <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Status"
                          // required
                        /> */}
                        <DDropdownStatus
                          name="status"
                          onChange={changeHandle}
                          value={inputRegist.status || ""}
                        />
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
                      name="almt_rumah"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Alamat Rumah"
                      onChange={changeHandle}
                      value={inputRegist.almt_rumah || ""}
                      // required
                    />
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <div className="w-1/2">
                      <div className="relative w-auto mb-1 mr-2">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Kota
                        </label>
                        {/* <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Kota"
                          // required
                        /> */}
                        <DDropdownKota
                          onChange={changeHandle}
                          value={inputRegist.kota || ""}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 text-left">
                      <div className="relative w-auto mb-1">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Provinsi
                        </label>
                        {/* <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Provinsi"
                          // required
                        /> */}
                        <DDropdownProv
                          onChange={changeHandle}
                          value={inputRegist.prov || ""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <div className="w-1/2">
                      <div className="relative w-auto mb-1 mr-2">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          E-Mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="E-Mail"
                          onChange={changeHandle}
                          value={inputRegist.email || ""}
                          // required
                        />
                      </div>
                    </div>
                    <div className="w-1/2 text-left">
                      <div className="relative w-auto mb-1">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nomor Handphone
                        </label>
                        <input
                          // type="number"
                          name="nohp"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Nomor Handphone"
                          onChange={changeHandle}
                          value={inputRegist.nohp || ""}
                          // required
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
                      name="nik"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nomor Induk Kependudukan"
                      onChange={changeHandle}
                      value={inputRegist.nik || ""}
                      // required
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
                      name="npwp"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nomor Pokok Wajib Pajak"
                      onChange={changeHandle}
                      value={inputRegist.npwp || ""}
                      // required
                    />
                  </div>
                  {/* <input
                    type="submit"
                    className="cursor-pointer get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 mt-4 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    value="Tambahkan"
                    // onClick={addElement}
                  /> */}
                  {/* <ul id="list"></ul> */}
                </form>
              </div>
              {/* px-4 md:px-10 py-10 pt-0 */}
              <hr className="mt-6 border-b-0 border-blueGray-300" />
            </div>

            <div className="relative flex-col break-words w-960 mb-6 mx-auto shadow-lg rounded-lg  bg-yellow-d border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-2">
                  <p className="text-black text-xs">
                    Pastikan Anda mengisikan nama lengkap, alamat email dan
                    nomor handphone yang sesuai. Karena data-data tersebut tidak
                    dapat diubah dan akan digunakan sebagai alat autentikasi
                    tanda tangan digital Anda.
                    <br />
                    Agar proses approval oleh administrator dapat dilakukan,
                    harap mengisi informasi yang sesuai dengan kartu identitas
                    Anda.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex-col break-words w-960 mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
                    Lengkapi Form Data Diri <br /> Pejabat Pembuat Akta Tanah
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center mb-1 font-bold">
                  <small>
                    Lengkapi form legalitas PPAT dengan baik dan benar.
                  </small>
                </div>
                <hr className="mt-3 border-b-0" />
                <form>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nama Pejabat Pembuat Akta Tanah
                    </label>
                    <input
                      type="text"
                      name="nama_ppat"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nama Pejabat Pembuat Akta Tanah"
                      onChange={changeHandle}
                      value={inputRegist.nama_ppat || ""}
                      // required
                    />
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Provinsi
                    </label>
                    <input
                      type="text"
                      name="prov2"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Provinsi"
                      onChange={changeHandle}
                      value={inputRegist.prov2 || ""}
                      // required
                    />
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Kabupaten/Kota
                    </label>
                    <input
                      type="text"
                      name="kota2"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Kabupaten/Kota"
                      onChange={changeHandle}
                      value={inputRegist.kota2 || ""}
                      // required
                    />
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Kecamatan
                    </label>
                    <input
                      type="text"
                      name="kecamatan"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Kecamatan"
                      onChange={changeHandle}
                      value={inputRegist.kecamatan || ""}
                      // required
                    />
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Alamat Kantor PPAT
                    </label>
                    <input
                      type="text"
                      name="almt_ppat"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Alamat Kantor PPAT"
                      onChange={changeHandle}
                      value={inputRegist.almt_ppat || ""}
                      // required
                    />
                  </div>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <div className="w-1/2">
                      <div className="relative w-auto mb-1 mr-2">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nomor SK Pengangkatan PPAT
                        </label>
                        <input
                          type="text"
                          name="nosk_ppat"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Nomor SK Pengangkatan PPAT"
                          onChange={changeHandle}
                          value={inputRegist.nosk_ppat || ""}
                          // required
                        />
                      </div>
                    </div>
                    <div className="w-1/2 text-left">
                      <div className="relative w-auto mb-1 mr-2">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Tanggal SK
                        </label>
                        <input
                          type="date"
                          name="tgl_sk"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Tanggal SK"
                          onChange={changeHandle}
                          value={inputRegist.tgl_sk || ""}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <p className="font-bold pt-6">Undangan Karyawan/Staff</p>
                  <div className="relative flex flex-wrap my-6 w-auto">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email Karyawan
                    </label>
                    <input
                      type="email"
                      name="email_karyawan"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email Karyawan"
                      onChange={changeHandle}
                      value={inputRegist.email_karyawan || ""}
                      // required
                    />
                  </div>
                  <div className="relative w-full mb-1">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Jabatan Karyawan
                    </label>
                    <input
                      type="text"
                      name="jabatan"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Jabatan Karyawan"
                      onChange={changeHandle}
                      value={inputRegist.jabatan || ""}
                      // required
                    />
                  </div>
                </form>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
                    Lengkapi Form Data Diri <br /> Pejabat Pembuat Akta Tanah
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center mb-6">
                  <small>Lampirkan Logo PPAT Anda</small>
                </div>
                <span
                  className="flex h-72 w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded"
                  style={{ image: "url(assets/img/ktp.png)" }}
                >
                  {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <div className="mx-auto my-auto h-44 w-80">
                        <label htmlFor="upload-button2">
                          {image.preview ? (
                            <img
                              src={image.preview}
                              alt="dummy2"
                              className="mx-auto my-auto h-44 w-80"
                              name="npwp"
                            />
                          ) : (
                            <>
                              <img
                                className="mx-auto h-36 w-36"
                                src={require("assets/img/logoPPAT.png").default}
                                alt="no data"
                              />
                              <p className="text-small text-gray-500">
                                Klik disini untuk upload Logo PPAT Asli di file.
                              </p>
                            </>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button2"
                          style={{ display: "none" }}
                          onChange={uploadPreview}
                        />
                        <br />
                        <button onClick={handleUpload} hidden>
                          Upload
                        </button>
                      </div>
                    </li>
                  </ul>
                </span>
              </div>
              <hr className="pb-16 border-0" />
            </div>

            <div className="relative flex flex-wrap my-6 w-auto">
              <div className="w-1/2">
                <Link to="/syarat1">
                  <button className="get-started text-black px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Kembali
                  </button>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <button
                  className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Lanjutkan
                </button>
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-800-d my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-center rounded-t">
                            <h3 className="text-2xl font-semibold text-sky-600 pt-7">
                              Registrasi Berhasil
                            </h3>
                          </div>
                          <img
                            className="mx-auto my-4 align-middle h-24 w-24 bg-fix"
                            src={require("assets/img/sukses.png").default}
                            alt="no data"
                          />
                          <p className="mb-8 text-blueGray-500 text-md text-center">
                            Silahkan cek inbox email Anda <br />
                            untuk melanjutkan proses registrasi.
                          </p>
                        </div>
                        <div className="relative flex flex-wrap my-6 w-auto mx-auto">
                          <div className="w-1/2">
                            {/* <Link to="/syarat2">
                <button className="get-started text-black px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                  Kembali
                </button>
              </Link> */}
                          </div>
                          <div className="w-1/2 text-right">
                            <Link to="/modalverif">
                              <button
                                onClick={() => setShowModal(false)}
                                className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                              >
                                Lanjutkan
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
