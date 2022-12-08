import React, { useContext, useEffect, useState } from "react";
import { RegistContext } from "views/auth/RegistContext";
import { FormGroup } from "reactstrap";
import FormDataDiri from "components/RegistPPAT/FormDataDiri";

const Step3r = (provs) => {
  const { inputRegist, setInputRegist, dataProv, dataKota, dataKec, all } =
    useContext(RegistContext);

  const { getDataProv, getDataKota, getDataKec } = all;

  const [filter, setFilter] = useState({});

  var val = localStorage.getItem("dataDiri");
  var object = JSON.parse(val);

  //Save to Context
  const changeHandle = (e) => {
    let isian = e.target.value;
    let formIsian = e.target.name;
    if (
      formIsian === "ppat_kecamatan" ||
      formIsian === "ppat_kotkab" ||
      formIsian === "ppat_prov" ||
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
          <FormDataDiri
            changeHandle={changeHandle}
            inputRegist={inputRegist}
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
