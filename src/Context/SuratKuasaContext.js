import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";

export const MySuratKuasaContext = createContext();

export const SuratKuasaProvider = (props) => {
  const [dataPtsl, setDataPtsl] = useState([]);
  const [dataProv, setDataProv] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataNik, setDataNik] = useState([]);
  const [filePtsl, setFilePtsl] = useState();
  const [loading, setLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [addKeterangan, setAddKeterangan] = useState(false);
  const [ttdImage, setTtdImage] = useState("");

  let history = useHistory();

  var login = localStorage.getItem("authentication");
  var auth = JSON.parse(login);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: auth.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          auth.access_token = result.data.access_token;
          localStorage.setItem("authentication", JSON.stringify(auth));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          localStorage.removeItem("authentication");
          localStorage.removeItem("dataPPAT");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const createSuratKuasa = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION + "api/top-up/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        body: JSON.stringify({
          doc_type: "pendaftaran_tanah_sistematis_lengkap",
        }),
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        if (result.success === false) {
          swal("Error", result.error, "error");
        } else {
          history.push(
            "/admin/pendaftaran_tanah_sistematis_lengkap/uploadSertipikat"
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumen = (type) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/" +
        Cookies.get("transaction_id") +
        "/document?doc_type=" +
        type,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.access_token,
        },
      }
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else if (res.status === 404) {
          setAddKeterangan(true);
        } else {
          return res.blob();
        }
      })
      .then((response) => {
        setFilePtsl(response);
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumenDetail = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/" +
        Cookies.get("transaction_id"),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.access_token,
        },
      }
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => {
        let data = response.data.eform_json_data;
        let obj = eval("(" + data + ")");
        setDataPtsl({
          ...dataPtsl,
          no_hak_milik: obj.no_hak_milik || "",
          bidang_tanah_terletak: obj.bidang_tanah_terletak || "",
          bidang_tanah_kelurahan: obj.bidang_tanah_kelurahan || "",
          bidang_tanah_kecamatan: obj.bidang_tanah_kecamatan || "",
          bidang_tanah_kota: obj.bidang_tanah_kota || "",
          alamat: obj.alamat || "",
          letak_jalan: obj.letak_jalan || "",
          letak_kelurahan: obj.letak_kelurahan || "",
          letak_kecamatan: obj.letak_kecamatan || "",
          letak_kota: obj.letak_kota || "",
          no_identitas: obj.no_identitas || "",
          tempat_lahir: obj.tempat_lahir || "",
          tanggal_lahir: obj.tanggal_lahir || "",
          nama: obj.nama || "",
        });
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

  const addActors = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/add-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          actors: [],
          docs: [
            { doc_type: "pph", base64_doc: dataPtsl.doc_pph },
            { doc_type: "bphtb", base64_doc: dataPtsl.doc_bphtb },
            { doc_type: "pbb", base64_doc: dataPtsl.doc_pbb },
            { doc_type: "ajb", base64_doc: dataPtsl.doc_ajb },
          ],
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        if (!result.success) {
          swal("Gagal", result.data.error, "error");
        } else {
          history.push(
            `/admin/pendaftaran_tanah_sistematis_lengkap/inputDataForm`
          );
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addActors2 = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/add-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          actors: [],
          docs: [
            { doc_type: "sertipikat", base64_doc: dataPtsl.doc_sertipikat },
          ],
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        if (!result.success) {
          swal("Gagal", result.data.error, "error");
        } else {
          history.push(`/admin/surat_kuasa/inputDataForm`);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const uploadPtsl = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/generate-document",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          doc_name: Cookies.get("doc_name"),
          doc_num: Cookies.get("doc_num"),
          price_value: Cookies.get("price_value"),
          data: {
            no_hak_milik: dataPtsl.no_hak_milik,
            bidang_tanah_terletak: dataPtsl.bidang_tanah_terletak,
            bidang_tanah_kelurahan: dataPtsl.bidang_tanah_kelurahan,
            bidang_tanah_kecamatan: dataPtsl.bidang_tanah_kecamatan,
            bidang_tanah_kota: dataPtsl.bidang_tanah_kota,
          },
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        if (!result.success) {
          swal("Gagal", result.data.error, "error");
        } else {
          window.location.reload();
          swal("Berhasil", result.data.message, "success");
          setAddKeterangan(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const uploadPtsl2 = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/generate-document",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          doc_name: Cookies.get("doc_name"),
          doc_num: Cookies.get("doc_num"),
          // price_value: Cookies.get("price_value"),
          data: {
            letak_jalan: dataPtsl.letak_jalan,
            letak_kelurahan: dataPtsl.letak_kelurahan,
            letak_kecamatan: dataPtsl.letak_kecamatan,
            letak_kota: dataPtsl.letak_kota,
            alamat: dataPtsl.alamat,
            no_identitas: dataPtsl.no_identitas,
            tanggal_lahir: dataPtsl.tanggal_lahir,
            tempat_lahir: dataPtsl.tempat_lahir,
            nama: dataPtsl.nama,
          },
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        if (!result.success) {
          swal("Gagal", result.data.error, "error");
        } else {
          window.location.reload();
          swal("Berhasil", result.data.message, "success");
          setAddKeterangan(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getTtdImage = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/users/get-file?file_type=ttd",
      {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: "Bearer " + auth.access_token,
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
        setTtdImage(URL.createObjectURL(result));
      })
      .catch((error) => console.log("error", error));
  };

  const addTandaTangan = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/sign-doc/step-1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          llx: dataPtsl.llx.toString(),
          lly: dataPtsl.lly.toString(),
          urx: dataPtsl.urx.toString(),
          ury: dataPtsl.ury.toString(),
          page: dataPtsl.page,
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        Cookies.set("sign_doc_id", result.data.sign_doc_id);
        setOtpModal(true);
      })
      .catch((error) => swal("Error", error, "error"));
  };

  const addMeterai = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/stamp-emeterai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          llx: dataPtsl.llx,
          lly: dataPtsl.lly,
          urx: dataPtsl.urx,
          ury: dataPtsl.ury,
          page: Number(dataPtsl.page),
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          setLoading(false);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoading(false);
        swal({
          title: "Berhasil",
          text: result.data.message,
          icon: "success",
          showConfirmButton: false,
          closeOnClickOutside: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => swal("Error", error, "error"));
  };

  const otpTandaTangan = (otp) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "api/transactions/sign-doc/step-2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: Cookies.get("transaction_id"),
          sign_doc_id: Cookies.get("sign_doc_id"),
          otp_code: otp,
        }),
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
        setLoading(false);
        setOtpModal(false);
        swal("Berhasil", "Pembubuhan tanda tangan berhasil", "success");
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("error " + error);
      });
  };

  const cekKtp = (no_nik) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/users/get-profile?no_nik=" +
        no_nik,
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + auth.access_token },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result.success === false) {
          swal("Gagal", result.error, "error");
        } else {
         setDataPtsl({...dataPtsl, nama: result.data.name})
        }
        console.log(result)
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <MySuratKuasaContext.Provider
      value={{
        createSuratKuasa,
        dataPtsl,
        setDataPtsl,
        loading,
        setLoading,
        getDataKec,
        getDataKota,
        getDataProv,
        dataKec,
        setDataKec,
        dataKota,
        setDataKota,
        dataProv,
        setDataProv,
        addActors,
        addActors2,
        uploadPtsl,
        addKeterangan,
        setAddKeterangan,
        getDokumen,
        filePtsl,
        setFilePtsl,
        ttdImage,
        setTtdImage,
        otpModal,
        setOtpModal,
        getTtdImage,
        addTandaTangan,
        getDokumenDetail,
        uploadPtsl2,
        otpTandaTangan,
        addMeterai,
        cekKtp,
        dataNik,
        setDataNik,
      }}
    >
      {props.children}
    </MySuratKuasaContext.Provider>
  );
};
