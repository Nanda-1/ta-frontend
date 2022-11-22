import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SyaratKetentuan() {
  const [checked, setChecked] = useState(false);

  const histori = useHistory();

  const handleNext = () => {
    histori.push("/pernyataan");
  };
  return (
    <>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-960-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 mb-0 px-6 py-6">
                <div className="text-left mt-3 mb-6">
                  <a
                    href="/login"
                    className="text-blue px-4 py-2 outline-none text-xs"
                  >
                    <i className="fas fa-angle-left text-blue text-md"></i>{" "}
                    Kembali
                  </a>
                </div>
                <div className="text-center mb-2">
                  <h1 className="text-blue text-xl font-bold">
                    Syarat & Ketentuan
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center mb-1 font-bold">
                  <small>
                    Mohon baca dan pahami syarat dan ketentuan di bawah
                  </small>
                </div>
                <hr className="mt-3 border-b-0" />
              </div>
              <div className="overflow-y-auto-d box-border h-72 p-8 pt-0">
                <div className="text-sm">
                  Selamat datang di Layanan Infinite! <br />
                  Terima kasih atas ketertarikan Anda menggunakan Infinite.
                  Dengan membuat Akun Infinite atau menggunakan Layanan
                  Infinite, Anda menyatakan telah membaca, memahami, dan
                  menyetujui Ketentuan Penggunaan ini. Infinite menyediakan
                  berbagai jenis Layanan, oleh karenanya beberapa syarat dan
                  ketentuan tambahan dapat berlaku pada saat Anda menggunakan
                  Layanan Infinite tersebut. <br />
                  Ketentuan Penggunaan ini mungkin diubah atau diperbaharui baik
                  sebagian maupun seluruhnya dari waktu ke waktu tanpa
                  pemberitahuan sebelumnya kepada Pengguna, dan akan berlaku
                  sejak diunggah pada Situs. Infinite menyarankan agar Pengguna
                  memeriksa Situs untuk mengetahui perubahan apapun atas
                  Ketentuan Penggunaan ini dari waktu ke waktu. Dengan tetap
                  mengakses Akun Infinite atau menggunakan Layanan Infinite,
                  maka Pengguna dianggap menyetujui perubahan atas Ketentuan
                  Penggunaan ini. Apabila Pengguna tidak menyetujui perubahan
                  Ketentuan Penggunaan, Pengguna dapat menghubungi Kami untuk
                  melakukan pengakhiran Akun Infinite.
                  <br />
                  Ketentuan Penggunaan ini mengandung kesepakatan antara
                  Infinite dan Pengguna. Silahkan membaca Ketentuan Penggunaan
                  ini dengan saksama!
                  <br /> 1. Definisi <br />
                  Setiap kata yang diawali huruf kapital mengandung arti berikut
                  ini:
                  <br /> “ Akun Infinite ” berarti suatu kode alfanumerik yang
                  diterbitkan oleh Infinite, yang dapat dikaitkan dengan suatu
                  nama unik ( username ), guna mengidentifikasi Pengguna dalam
                  menggunakan Layanan Infinite <br /> “ Dokumen Elektronik ”
                  adalah setiap Informasi Elektronik, termasuk namun tidak
                  terbatas pada Kontrak Elektronik, yang dibuat, diteruskan,
                  dikirimkan, diterima, atau disimpan dalam bentuk analog,
                  digital, elektromagnetik, optikal, atau sejenisnya, yang dapat
                  dilihat, ditampilkan, dan/atau didengar melalui komputer atau
                  sistem elektronik, termasuk tetapi tidak terbatas pada
                  tulisan, suara, gambar, peta, rancangan, foto atau sejenisnya,
                  huruf, tanda, angka, kode akses, simbol atau perforasi yang
                  memiliki makna atau arti atau dapat dipahami oleh orang yang
                  mampu memahaminya.
                </div>
              </div>
              <hr className="mt-6 border-b-0 border-blueGray-300" />
            </div>
            <div className="relative flex flex-wrap my-6 w-960-d mx-auto">
              <div className="w-1/2">
                <div className="flex justify-left">
                  <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      name="toggle"
                      id="toggle"
                      className="items-center bg-white mr-1 focus:ring-transparent toggle-checkbox absolute block w-6 h-6 rounded-full border-2 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label-d block h-8 -ml-1 -mt-1 rounded-full bg-sky-500 border-blue-500 border-2 cursor-pointer"
                    ></label>
                  </div>
                  <div className="text-xxs ml-2">
                    Dengan ini saya menyatakan telah membaca dan tunduk pada
                    syarat & ketentuan di atas.
                  </div>
                </div>
              </div>
              <div className="w-1/2 text-right">
                <button
                  disabled={!checked ? true : false}
                  className={`${
                    !checked ? "opacity-50" : null
                  } get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150`}
                  onClick={handleNext}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
