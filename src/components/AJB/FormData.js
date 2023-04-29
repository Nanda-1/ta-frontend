import React, { useEffect, useState } from "react";

const FormData = ({
  inputAjb,
  handleChange,
  dataKec,
  dataKel,
  dataKota,
  dataProv,
  wilayah_obj,
}) => {
  const [hasil, sethasil] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let formHeigth = document.querySelector(".change-scroll")?.offsetTop;
      let formHeigth3 = document.querySelector(".change-scroll")?.clientHeight;
      let top = window.pageYOffset || document.documentElement.scrollTop;

      let result = formHeigth3 - top + 70;

      if (top >= formHeigth) {
        sethasil(result);
      } else {
        sethasil(document.querySelector(".change-scroll")?.clientHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sethasil(document.querySelector(".change-scroll")?.clientHeight)
    };
  }, []);

  return (
    <div className="overflow-y-auto px-3 form-scroll" style={{ height: hasil !== 0 ? hasil : 'auto' }}>
        <form>
      <div className="relative w-full">
        <label className="block text-xs font-bold mb-1" htmlFor="grid-password">
          Nama Dokumen
        </label>
        <input
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="nama_dokumen"
          value={inputAjb.nama_dokumen}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Nomor Dokumen
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="nomor_dokumen"
          value={inputAjb.nomor_dokumen}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Harga Jual
        </label>
        <input
          type="number"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="price_value"
          value={inputAjb.price_value|| inputAjb.harga_jual}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Gelar
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded disabled-2 text-sm shadow-md focus:outline-none w-full"
          name="gelar"
          value={inputAjb.gelar}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Pekerjaan Pihak Pertama
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="pekerjaan"
          value={inputAjb.pekerjaan || inputAjb.pekerjaan_pihak_pertama}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Kelurahan KTP Pihak Pertama
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="kel_ktp_pihak_pertama"
          value={inputAjb.kel_ktp_pihak_pertama}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Tanggal Keluar KTP Pihak Pertama
        </label>
        <input
          type="date"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="tgl_keluar_ktp_pihak_pertama"
          value={inputAjb.tgl_keluar_ktp_pihak_pertama}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Tanggal Berlaku KTP Pihak Pertama
        </label>
        <input
          type="date"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="berlaku_ktp_pihak_pertama"
          value={inputAjb.berlaku_ktp_pihak_pertama}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Pekerjaan Pihak Kedua
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="pekerjaan_pihak_kedua"
          value={inputAjb.pekerjaan_pihak_kedua}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Kelurahan KTP Pihak Kedua
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="kel_ktp_pihak_kedua"
          value={inputAjb.kel_ktp_pihak_kedua}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Tanggal Keluar KTP Pihak Kedua
        </label>
        <input
          type="date"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="tgl_keluar_ktp_pihak_kedua"
          value={inputAjb.tgl_keluar_ktp_pihak_kedua}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Tanggal Berlaku KTP Pihak Kedua
        </label>
        <input
          type="date"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="berlaku_ktp_pihak_kedua"
          value={inputAjb.berlaku_ktp_pihak_kedua}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Nomor Hak Milik
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="no_hak_milik"
          value={inputAjb.no_hak_milik}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Tanggal Surat Ukur
        </label>
        <input
          type="date"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="tgl_surat_ukur"
          value={inputAjb.tgl_surat_ukur}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Nomor Surat Ukur
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="no_surat_ukur"
          value={inputAjb.no_surat_ukur}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Hasil Luas Ukur
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="hasil_luas_ukur"
          placeholder="dalam m2 persegi"
          value={inputAjb.hasil_luas_ukur}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          NIB
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="nib"
          value={inputAjb.nib}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          NOP
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="nop"
          value={inputAjb.nop}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Provinsi Hak Milik
        </label>
        <select
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="provinsi_hak_milik"
          value={inputAjb.provinsi_hak_milik}
          onChange={handleChange}
          required
        >
          <option disabled selected>
            Pilih Provinsi
          </option>
          {dataProv.map((item) => {
            return (
              <option value={item.name} key={item.province_id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Kota Administrasi Hak Milik
        </label>
        <select
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="kota_administrasi_hak_milik"
          value={inputAjb.kota_administrasi_hak_milik}
          onChange={handleChange}
          required
        >
          <option disabled selected>
            Pilih Kota Administrasi
          </option>
          {dataKota
            .filter((el) => el.province_id === wilayah_obj?.provinsi_hak_milik)
            .map((item) => {
              return (
                <option value={item.name} key={item.city_id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Kecamatan Hak Milik
        </label>
        <select
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="kec_hak_milik"
          value={inputAjb.kec_hak_milik}
          onChange={handleChange}
          required
        >
          <option disabled selected>
            Pilih Kecamatan
          </option>
          {dataKec
            .filter(
              (el) => el.city_id === wilayah_obj?.kota_administrasi_hak_milik
            )
            .map((item) => {
              return (
                <option value={item.name} key={item.district_id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Keluarahan Hak Milik
        </label>
        <select
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="kel_hak_milik"
          value={inputAjb.kel_hak_milik || wilayah_obj?.kel_hak_milik}
          onChange={handleChange}
          required
        >
          <option disabled selected>
            Pilih Keluarahan
          </option>
          {dataKel?.map((item) => {
            return (
              <option value={item.nama} key={item.id}>
                {item.nama}
              </option>
            );
          })}
        </select>
      </div>
      <div className="relative w-full">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Jalan Hak Milik
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="jalan_hak_milik"
          value={inputAjb.jalan_hak_milik}
          onChange={handleChange}
          required
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Alamat Lengkap
        </label>
        <input
          type="text"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="alamat_lengkap"
          value={inputAjb.alamat_lengkap}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="relative w-full mb-3">
        <label
          className="block text-xs pt-6 font-bold mb-1"
          htmlFor="grid-password"
        >
          Harga Jual
        </label>
        <input
          type="number"
          className="border-1 px-3 py-2 border-gray-400 rounded text-sm shadow-md focus:outline-none w-full"
          name="harga_jual"
          value={inputAjb.harga_jual}
          onChange={handleChange}
          required
        />
      </div> */}
      </form>
    </div>
  );
};

export default FormData;
