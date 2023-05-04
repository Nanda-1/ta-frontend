import React, { useContext, useEffect, useState } from "react";
import { RegistContext } from "views/auth/RegistContext";
import { FormGroup } from "reactstrap";
import FormDataDiri from "components/RegistPPAT/FormDataDiri";
import FormPPAT from "components/RegistPPAT/FormPPAT";

const Step3r = (provs) => {
  const {
    inputRegist,
    setInputRegist,
    dataProv,
    dataKota,
    dataKec,
    dataKel,
    setDataKel,
    all,
  } = useContext(RegistContext);

  const { getDataProv, getDataKota, getDataKec, getDataKel } = all;

  const [filter, setFilter] = useState({});
  const [stat, setStat] = useState(false);

  var val = localStorage.getItem("dataDiri");
  var object = JSON.parse(val);

  //Save to Context
  const changeHandle = (e) => {
    let isian = e.target.value;
    let formIsian = e.target.name;
    if (formIsian === "id_camat") {
      setDataKel([]);
    }
    if (
      formIsian === "ppat_kelurahan" ||
      formIsian === "ppat_kecamatan" ||
      formIsian === "ppat_kotkab" ||
      formIsian === "ppat_prov" ||
      formIsian === "id_lurah" ||
      formIsian === "id_camat" ||
      formIsian === "id_kota" ||
      formIsian === "id_prov"
    ) {
      setFilter({ ...filter, [formIsian]: isian });
    }
    setInputRegist({ ...inputRegist, [formIsian]: isian });

    let data = { [formIsian]: isian };

    if (val) {
      if (object.formIsian) {
        object.formIsian = isian;
      } else {
        object = { ...object, ...data };
      }
      localStorage.setItem("dataDiri", JSON.stringify(object));
      if (object.id_camat) {
        getDataKel(object.id_camat || inputRegist.id_camat);
      } else {
        return setDataKel([]);
      }
      if (object.tgl_sk) {
        setStat(true);
      } else {
        return null;
      }
      localStorage.setItem("statusDataDiri", JSON.stringify(stat));
    } else {
      localStorage.setItem("dataDiri", JSON.stringify(data));
    }

    // if (object.id_camat) {
    //   getDataKel(object.id_camat||inputRegist.id_camat);
    // }else{
    //   return setDataKel([]);
    // }

    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  };

  useEffect(() => {
    getDataProv();
    getDataKota();
    getDataKec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (provs.currentStep !== 6) {
    return null;
  }

  return (
    <>
      <FormGroup>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <FormDataDiri
            changeHandle={changeHandle}
            inputRegist={inputRegist}
            dataKel={dataKel}
            dataKec={dataKec}
            dataKota={dataKota}
            dataProv={dataProv}
            filter={filter}
            object={object}
          />
          <hr className="mt-6 border-b-0 border-blueGray-300" />
        </div>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-yellow-d border-0">
          <div className="rounded-t px-6 py-6">
            <div className="text-center">
              <p className="text-black text-xs">
                Pastikan Anda mengisikan nama lengkap, alamat email dan nomor
                handphone yang sesuai. Karena data-data tersebut tidak dapat
                diubah dan akan digunakan sebagai alat autentikasi tanda tangan
                digital Anda.
                <br />
                Agar proses approval oleh administrator dapat dilakukan, harap
                mengisi informasi yang sesuai dengan kartu identitas Anda.
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <FormPPAT
            changeHandle={changeHandle}
            inputRegist={inputRegist}
            dataKec={dataKec}
            dataKota={dataKota}
            dataProv={dataProv}
            filter={filter}
            object={object}
          />
        </div>
      </FormGroup>
    </>
  );
};

export default Step3r;
