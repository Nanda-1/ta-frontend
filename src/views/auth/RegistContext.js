import React, { createContext, useState } from "react";
import cookies from "js-cookie";
import { useHistory } from "react-router";
import swal from "sweetalert";
export const RegistContext = createContext();

export const RegistProvider = (props) => {
  const history = useHistory();
  // simpan field to context
  const [regist, setRegist] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const [inputRegist, setInputRegist] = useState([]);
  const [dataRegist, setDataRegist] = useState([""]);
  const [tipe, setTipe] = useState([""]);
  const [skppat, setSkppat] = useState([""]);
  //url on env
  const apiRegist =
    process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/register";
  //get dropdown kota & provinsi
  const [dataProv, setDataProv] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const [dataCityFilter1, setdataCityFilter1] = useState([]);
  const [dataDistrictFilter1, setdataDistrictFilter1] = useState([]);
  const [dataCityFilter, setdataCityFilter] = useState([]);
  const [dataDistrictFilter, setdataDistrictFilter] = useState([]);
  const [ttdImage, setTtdImage] = useState("");
  const [loading, setLoading] = useState(false);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  var dataDiri = JSON.parse(localStorage.getItem("dataDiri"));
  // var token = JSON.parse(auth);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success === true) {
          token.access_token = result.data.access_token;
          localStorage.setItem("authentication", JSON.stringify(token));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          localStorage.removeItem("dataPPAT");
          localStorage.removeItem("authentication");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const ppatFile = (type, dataFile) => {
    setLoading(true);
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token.access_token);

    let formdata = new FormData();
    formdata.append("file_type", type);
    formdata.append("file", dataFile);

    let requestOptionsGet = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/update-profile/file",
      requestOptionsGet
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => {
        if (response.success) {
          swal("Berhasil", response.data.message, "success");
          setLoading(false);
        } else {
          setLoading(false);
          swal("Gagal", response.error, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getUserFile = (type) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/users/get-file?file_type=" +
        type,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        if (type === "selfie_photo") {
          // localStorage.setItem(type, )
          setInputRegist({ ...inputRegist, type: result });
          getUserFile("self_video");
        } else {
          setInputRegist({ ...inputRegist, type: result });
          setTimeout(() => {
            sendLengkapiDiriUmum();
          }, 2000);
        }
        // setTtdImage(URL.createObjectURL(result));
      })
      .catch((error) => console.log("error", error));
  };

  const getDataProv = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/loc/provinces", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => setDataProv(response.data))
      .catch((error) => console.log("error", error));
  };

  const getDataKota = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/loc/cities", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => setDataKota(response.data))
      .catch((error) => console.log("error", error));
  };

  const getDataKec = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/loc/districts", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => setDataKec(response.data))
      .catch((error) => console.log("error", error));
  };

  const getCityFilter1 = (id_prov) => {
    let id = Number(id_prov);
    const filterData = dataKota.filter((e) => {
      return e.id_provinsi === id;
    });
    setdataCityFilter1(filterData);
  };
  // console.log(dataCityFilter);

  const getDistrictFilter1 = (id_kota) => {
    let id = Number(id_kota);
    const filterData = dataKec.filter((e) => {
      return e.id_kota === id;
    });
    setdataDistrictFilter1(filterData);
  };
  // console.log(dataDistrictFilter);

  const getCityFilter = (id_prov) => {
    let id = Number(id_prov);
    const filterData = dataKota.filter((e) => {
      return e.id_provinsi === id;
    });
    setdataCityFilter(filterData);
  };
  // console.log(dataCityFilter);

  const getDistrictFilter = (id_kota) => {
    let id = Number(id_kota);
    const filterData = dataKec.filter((e) => {
      return e.id_kota === id;
    });
    setdataDistrictFilter(filterData);
  };
  // console.log(dataDistrictFilter);

  const all = {
    getDataProv,
    getDataKota,
    getDataKec,
    getCityFilter1,
    getDistrictFilter1,
    getCityFilter,
    getDistrictFilter,
  };

  const resendEmailRegist = async (event) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);

    let raw = JSON.stringify({
      email: cookies.get("email"),
    });

    let requestOptionsGet = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/verifikasi/email/send",
      requestOptionsGet
    )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then(() => {
        cookies.set("tipe_otp", "registrasi", { expires: 1 });
        history.push("/modal2");
      })
      .catch((error) => console.log("error", error));
  };

  // Post API LengkapiDiri
  const sendLengkapiDiriUmum = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      body: JSON.stringify({
        name: dataDiri.nama,
        place_of_birth: dataDiri.tempat_lahir,
        date_of_birth: dataDiri.tanggal_lahir,
        gender: dataDiri.gender,
        no_nik: dataDiri.no_nik,
        no_npwp: dataDiri.no_npwp,
        address: dataDiri.alamat,
        prov: dataDiri.id_prov,
        kotkab: dataDiri.id_kota,
        district_id: dataDiri.id_camat,
        post_code: dataDiri.kodepos,
        marriage_status: dataDiri.status_nikah,
        roles: "umum",
        selfie_photo: inputRegist.selfie_photo,
        self_video: inputRegist.self_video,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setLoading(false);
        let sukses = res.success;

        if (!sukses) {
          swal({
            title: "Gagal!",
            text: res.data.error,
            icon: "warning",
          });
        } else {
          swal({
            title: "Berhasil",
            text: res.data.message,
            icon: "success",
          });
        }
      });
  };

  const sendMailLengkapiDiri = async () => {
    history.push("/modal3");
  };

  const resendOTPRegist = async () => {
    cookies.remove("token");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);

    let raw = JSON.stringify({
      user_id: object.uid,
    });

    let requestOptionsGet = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/register/resend-otp",
      requestOptionsGet
    )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then(() => {
        console.log(true);
      })
      .catch((error) => console.log("error", error));
  };

  const verifiedOTP = async (otp) => {
    cookies.remove("token");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);

    let raw = JSON.stringify({
      // email: cookies.get("email"),
      user_id: object.uid,
      otp_code: otp,
    });

    let requestOptionsGet = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/auth/register/verify-phone-number",
      requestOptionsGet
    )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        let data = res.data;
        if (data === null) {
          if (res.error === "OTP not valid") {
            swal({
              title: "Gagal!",
              text: "OTP Tidak Valid",
              icon: "warning",
            });
          }
        } else {
          let isLengkap = res.data.lengkapidiri;
          // console.log(res.data);
          if (isLengkap === true) {
            history.push("/admin/dashboard");
          } else {
            history.push("/modalverif");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  const cekKTPPPAT = async () => {
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);
    // myHeaders.append("Content-Type", "multipart/form-data");
    let uid = object.uid;
    let formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("nama", cookies.get("nama"));
    formdata.append("tempat_lahir", cookies.get("tempat_lahir"));
    formdata.append("tanggal_lahir", cookies.get("tanggal_lahir"));
    formdata.append("gender", cookies.get("gender"));
    formdata.append("status_nikah", cookies.get("status_nikah"));
    formdata.append("alamat", cookies.get("alamat"));
    formdata.append("prov", cookies.get("id_prov"));
    formdata.append("kotkab", cookies.get("id_kota"));
    formdata.append("kecamatan", cookies.get("id_camat"));
    formdata.append("kodepos", cookies.get("kodepos"));

    formdata.append("no_nik", cookies.get("no_nik"));
    formdata.append("no_npwp", cookies.get("no_npwp"));
    formdata.append("no_sk_pengangkatan", cookies.get("no_sk_pengangkatan"));
    formdata.append("tgl_sk", cookies.get("tgl_sk"));
    formdata.append("ppat_name", cookies.get("ppat_name"));
    formdata.append("ppat_alamat", cookies.get("ppat_alamat"));
    formdata.append("ppat_prov", cookies.get("ppat_prov"));
    formdata.append("ppat_kotkab", cookies.get("ppat_kotkab"));
    formdata.append("ppat_kecamatan", cookies.get("ppat_kecamatan"));
    formdata.append("bypass_ekyc", "true");
    formdata.append("roles", "ppat");

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // try {
    // setLoad(true);

    await fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/lengkapidiri/update",
      requestOptions
    )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        let data = res.data;
        let sukses = res.success;

        if (data === null && sukses === false) {
          swal({
            title: "Gagal!",
            text: res.error,
            icon: "error",
          });
          console.log(uid);
        } else if (sukses === true) {
          console.log(res);
          console.log(uid);
        }
      })
      .catch((error) => {});
  };

  const cekKTP = async () => {
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);
    // myHeaders.append("Content-Type", "multipart/form-data");
    let uid = object.uid;
    let formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("nama", cookies.get("nama"));
    formdata.append("tempat_lahir", cookies.get("tempat_lahir"));
    formdata.append("tanggal_lahir", cookies.get("tanggal_lahir"));
    formdata.append("gender", cookies.get("gender"));
    formdata.append("status_nikah", cookies.get("status_nikah"));
    formdata.append("alamat", cookies.get("alamat"));
    formdata.append("prov", cookies.get("id_prov"));
    formdata.append("kotkab", cookies.get("id_kota"));
    formdata.append("kecamatan", cookies.get("id_camat"));
    formdata.append("kodepos", cookies.get("kodepos"));
    formdata.append("no_nik", cookies.get("no_nik"));
    formdata.append("no_npwp", cookies.get("no_npwp"));
    formdata.append("bypass_ekyc", "true");
    formdata.append("roles", "ppat");

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/lengkapidiri/update",
      requestOptions
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        let data = res.data;
        let sukses = res.success;

        if (data === null && sukses === false) {
          swal({
            title: "Gagal!",
            text: res.error,
            icon: "error",
          });
          console.log(uid);
        } else if (sukses === true) {
          console.log(res);
          console.log(uid);
        }
      })
      .catch((error) => {});
  };

  const toSign = async () => {
    history.push("/sign");
  };

  const toCA = async () => {
    history.push("/ca");
  };

  const stepper = async () => {
    history.push("/stepper");
  };

  const getTTD = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/lengkapidiri/download/" +
        object.uid +
        "/specimen_tdtgn_file",
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setTtdImage(URL.createObjectURL(result));
      })
      .catch((err) => console.log(err));
  };

  const functions = { getTTD };

  return (
    <RegistContext.Provider
      value={{
        apiRegist,
        functions,
        regist,
        setRegist,

        tipe,
        setTipe,

        skppat,
        setSkppat,

        inputRegist,
        setInputRegist,

        dataRegist,
        setDataRegist,

        dataProv,
        setDataProv,

        dataKota,
        setDataKota,

        dataKec,
        setDataKec,

        getDataProv,
        getDataKota,
        getDataKec,
        getUserFile,
        getCityFilter1,
        getDistrictFilter1,
        getCityFilter,
        getDistrictFilter,
        dataCityFilter1,
        setdataCityFilter1,
        dataCityFilter,
        setdataCityFilter,
        dataDistrictFilter1,
        setdataDistrictFilter1,
        dataDistrictFilter,
        setdataDistrictFilter,

        all,

        resendEmailRegist,
        sendMailLengkapiDiri,
        sendLengkapiDiriUmum,
        verifiedOTP,
        resendOTPRegist,
        // testFaceAPI,
        cekKTP,
        cekKTPPPAT,
        toSign,
        toCA,
        stepper,

        refreshToken,
        ttdImage,
        setTtdImage,
        ppatFile,
        loading,
        setLoading,
        b64toBlob,
      }}
    >
      {props.children}
    </RegistContext.Provider>
  );
};
