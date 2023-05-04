import React, { useContext, useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { MyAjbContext } from "Context/AjbContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import FormData from "./FormData";

const InputDataDokumen = () => {
  const {
    inputAjb,
    setInputAjb,
    setLoadingFile,
    loadingFile,
    functions,
    dataKec,
    dataKota,
    dataProv,
    dataKel,
  } = useContext(MyAjbContext);

  const { addDokumenAjb } = functions;

  const { getDataKec, getDataKota, getDataProv, getDataKel } = functions;

  let wilayah_id = localStorage.getItem("wilayah");
  let wilayah_obj = JSON.parse(wilayah_id);

  useEffect(() => {
    getDataKec();
    getDataKota();
    getDataProv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dokReview = (e) => {
    e.preventDefault();
    setLoadingFile(true);
    addDokumenAjb();
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputAjb({ ...inputAjb, [formInput]: inputValue });

    let data1 = dataProv.filter((el) => el.name === inputValue);
    let data2 = dataKota.filter((el) => el.name === inputValue);
    let data3 = dataKec.filter((el) => el.name === inputValue);
    let data4 = dataKel.filter((el) => el.nama === inputValue);

    if (formInput === "provinsi_hak_milik") {
      let data = {
        [formInput]: data1[0].province_id,
        id: inputAjb.transaction_id,
      };

      if (wilayah_id) {
        if (wilayah_obj.prov) {
          wilayah_obj.prov = data1[0].province_id;
        } else {
          wilayah_obj = {
            ...wilayah_obj,
            ...data,
          };
        }
        localStorage.setItem("wilayah", JSON.stringify(wilayah_obj));
      } else {
        localStorage.setItem("wilayah", JSON.stringify(data));
      }
    } else if (formInput === "kota_administrasi_hak_milik") {
      let hasil = { [formInput]: data2[0].city_id };

      if (wilayah_obj.kota) {
        wilayah_obj.kota = data2[0].city_id;
      } else {
        wilayah_obj = { ...wilayah_obj, ...hasil };
      }
      localStorage.setItem("wilayah", JSON.stringify(wilayah_obj));
    } else if (formInput === "kec_hak_milik") {
      // setWilayah({ ...wilayah, kec: data3[0].district_id });
      let hasil = { [formInput]: data3[0].district_id };

      if (wilayah_obj.kota) {
        wilayah_obj.kota = data3[0].district_id;
      } else {
        wilayah_obj = { ...wilayah_obj, ...hasil };
      }
      localStorage.setItem("wilayah", JSON.stringify(wilayah_obj));

      getDataKel(data3[0].district_id);
    } else if (formInput === "kel_hak_milik") {
      // setWilayah({ ...wilayah, kel: data4[0].district_id });
      let hasil = { [formInput]: data4[0].district_id };

      if (wilayah_obj.kota) {
        wilayah_obj.kota = data4[0].district_id;
      } else {
        wilayah_obj = { ...wilayah_obj, ...hasil };
      }
      localStorage.setItem("wilayah", JSON.stringify(wilayah_obj));
    }
  };

  if (dataKel.length === 0 && wilayah_obj?.kec_hak_mili) {
    getDataKel(wilayah_obj.kec_hak_milik);
  }

  return (
    <>
      {loadingFile && <ModalDokumen />}
      <div className="rounded-t mb-0 px-2 text-grey py-6 change-scroll">
        <FormData
          dataKec={dataKec}
          dataKota={dataKota}
          dataProv={dataProv}
          dataKel={dataKel}
          handleChange={handleChange}
          wilayah_obj={wilayah_obj}
          inputAjb={inputAjb}
        />
        <button
          className="bg-green-2 text-white w-full py-2 rounded-md"
          onClick={dokReview}
        >
          Perbaharui Dokumen
        </button>
      </div>
    </>
  );
};

export default InputDataDokumen;
