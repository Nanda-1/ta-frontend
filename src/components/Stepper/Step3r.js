import React, { useContext, useEffect, useState } from "react";
import { RegistContext } from "views/auth/RegistContext";
import { FormGroup } from "reactstrap";
import FormDataDiriU from "./FormDataDiriU";

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
    } else {
      localStorage.setItem("dataDiri", JSON.stringify(data));
    }

    console.log(formIsian)

    if(formIsian === "id_camat"){
      getDataKel(isian)
    }
  };
  
  useEffect(() => {
    getDataProv();
    getDataKota();
    getDataKec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (provs.currentStep !== 5) {
    return null;
  }

  return (
    <>
      <FormGroup>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <FormDataDiriU
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
      </FormGroup>
    </>
  );
};

export default Step3r;
