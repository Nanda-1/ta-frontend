import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const MyAjbContext = createContext();

export const AjbProvider = (props) => {
  const [ajb, setAjb] = useState([""]);
  const [ajbDoc, setAjbDoc] = useState([""]);
  const [dataDetailAjb, setDataDetailAjb] = useState([]);
  const [inputAjb, setInputAjb] = useState([]);
  const [dataProv, setDataProv] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const [dataKel, setDataKel] = useState([]);
  const [dataNik, setDataNik] = useState();
  const [faceVerifikasi, setFaceVerifikasi] = useState(true);
  const [ttdDigital, setTtdDigital] = useState(false);
  const [meterai, setMeterai] = useState(false);
  const [ttdImage, setTtdImage] = useState("");
  const [status, setStatus] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [btnConfirm, setBtnConfirm] = useState(false);
  const [btnConfirmTtd, setBtnConfirmTtd] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [warning, setWarning] = useState();
  const [penjual, setPenjual] = useState(false);
  const [pembeli, setPembeli] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [stepper, setStepper] = useState("");

  let history = useHistory();
  // var val = localStorage.getItem("dataPPAT");
  // var object = JSON.parse(val);

  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  const refreshToken = (lastFunc) => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          token.access_token = result.data.access_token;
          localStorage.setItem("authentication", JSON.stringify(token));
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

  const addPenjual = (transaction_id) => {
    setLoadingFile(true);

    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/add-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: transaction_id,
          actors: [
            {
              no_nik: inputAjb.nik_penjual,
              email: inputAjb.email_penjual,
              phone_number: inputAjb.tlp_penjual,
              status: inputAjb.status_penjual,
              actor_type: "penjual",
              // actor_role: inputAjb.tipe_penjual,
            },
            {
              no_nik: inputAjb.nik_saksi_penjual,
              email: inputAjb.email_saksi_penjual,
              phone_number: inputAjb.tlp_saksi_penjual,
              actor_type: "saksi penjual",
              // actor_role: "umum",
            },
          ],
          docs: [
            {
              tipe: "surat_nikah_penjual",
              base64: inputAjb.surat_nikah_penjual,
            },
            {
              tipe: "kartu_keluarga_penjual",
              base64: inputAjb.kartu_keluarga_penjual,
            },
            { tipe: "sertifikat_tanah", base64: inputAjb.sertifikat_tanah },
            { tipe: "pbb_tahun_terakhir", base64: inputAjb.pbb_tahun_terakhir },
            { tipe: "stts", base64: inputAjb.stts },
            { tipe: "npwp_penjual", base64: inputAjb.npwp_penjual },
            {
              tipe: "akta_pendirian_penjual",
              base64: inputAjb.akta_pendirian_penjual,
            },
            {
              tipe: "sk_pengangkatan_penjual",
              base64: inputAjb.sk_pengangkatan_penjual,
            },
          ],
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === "500 INTERNAL SERVER ERROR") {
          swal("Error", "Internal Server Error", "error");
          setLoadingFile(false);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoadingFile(false);
        setNextStep(true);
        if (!result.success) {
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const addPembeli = (transaction_id) => {
    setLoadingFile(true);

    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/add-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
          // 'Access-Control-Allow-Origin' : '*'
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: transaction_id,
          actors: [
            {
              no_nik: inputAjb.nik_pembeli,
              email: inputAjb.email_pembeli,
              phone_number: inputAjb.tlp_pembeli,
              status: inputAjb.status_pembeli,
              actor_type: "pembeli",
              // actor_role: inputAjb.tipe_pembeli,
            },
            {
              no_nik: inputAjb.nik_saksi_pembeli,
              email: inputAjb.email_saksi_pembeli,
              phone_number: inputAjb.tlp_saksi_pembeli,
              actor_type: "saksi pembeli",
            },
          ],
          docs: [
            {
              tipe: "surat_nikah_pembeli",
              base64: inputAjb.surat_nikah_pembeli,
            },
            {
              tipe: "kartu_keluarga_pembeli",
              base64: inputAjb.kartu_keluarga_pembeli,
            },
            { tipe: "npwp_photo_pembeli", base64: inputAjb.npwp_pembeli },
            {
              tipe: "akta_pendirian_pembeli",
              base64: inputAjb.akta_pendirian_pembeli,
            },
            {
              tipe: "sk_pengangkatan_pembeli",
              base64: inputAjb.sk_pengangkatan_pembeli,
            },
          ],
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })

      .then((result) => {
        setNextStep(true);
        if (result.data) {
          if (result.data.total_pending_invitation > 0) {
            setLoadingFile(false);
            history.push("/admin/dashboard");
            swal("Berhasil Membuat Draf", "Menunggu Registrasi", "success");
          } else {
            addDokumenAjb(transaction_id);
          }
        } else if (result.success !== true) {
          setLoadingFile(false);
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addDokumenAjb = async (id) => {
    await fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/generate-document",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: id,
          doc_name: inputAjb.nama_dokumen,
          doc_num: inputAjb.nomor_dokumen,
          price_value: Number(inputAjb.price_value || inputAjb.harga_jual),
          data: {
            no_ajb: inputAjb.no_ajb,
            gelar: inputAjb.gelar,
            pekerjaan_pihak_pertama: inputAjb.pekerjaan,
            kel_ktp_pihak_pertama: inputAjb.kel_ktp_pihak_pertama,
            tgl_keluar_ktp_pihak_pertama: inputAjb.tgl_keluar_ktp_pihak_pertama,
            berlaku_ktp_pihak_pertama:
              inputAjb.berlaku_ktp_pihak_pertama || "Seumur Hidup",
            pekerjaan_pihak_kedua: inputAjb.pekerjaan_pihak_kedua,
            kel_ktp_pihak_kedua: inputAjb.kel_ktp_pihak_kedua,
            tgl_keluar_ktp_pihak_kedua: inputAjb.tgl_keluar_ktp_pihak_kedua,
            berlaku_ktp_pihak_kedua:
              inputAjb.berlaku_ktp_pihak_kedua || "Seumur Hidup",
            no_hak_milik: inputAjb.no_hak_milik,
            tgl_surat_ukur: inputAjb.tgl_surat_ukur,
            no_surat_ukur: inputAjb.no_surat_ukur,
            hasil_luas_ukur: Number(inputAjb.hasil_luas_ukur),
            nib: inputAjb.nib,
            nop: inputAjb.nop,
            provinsi_hak_milik: inputAjb.provinsi_hak_milik,
            kota_administrasi_hak_milik: inputAjb.kota_administrasi_hak_milik,
            kec_hak_milik: inputAjb.kec_hak_milik,
            kel_hak_milik: inputAjb.kel_hak_milik,
            jalan_hak_milik: inputAjb.jalan_hak_milik,
            alamat_lengkap: inputAjb.alamat_lengkap,
          },
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (!result.success) {
          swal("Gagal", result.error, "error");
          setLoadingFile(false);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumenAjb = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        id +
        "/document?doc_type=akta_jual_beli",
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          // "Content-Type": "application/pdf",
          Authorization: "Bearer " + token.access_token,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setAjbDoc(result);
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const detailAjb = (id) => {
    setLoadingFile(true);
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        id,
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
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Cookies.set(result.data.actors[0].user_email);
        setDataDetailAjb(result.data);
        let nomor_dokumen = result.data.doc_num;
        let nama_dokumen = result.data.doc_name;
        let id = result.data.transaction_id;
        let data = result.data.eform_json_data;
        let hasil = data.replace(/'/g, '"');
        let hasil2 = hasil.replace(/None/g, "null");

        let obj = JSON.parse(hasil2);
        setInputAjb({ ...inputAjb, ...obj, nomor_dokumen, nama_dokumen, id });
        getDokumenAjb(id);
      })
      .catch((error) => console.log("error", error));
  };

  const addMeterai = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/stamp-emeterai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
          // 'Access-Control-Allow-Origin' : '*'
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: id,
          llx: inputAjb.llx,
          lly: inputAjb.lly,
          urx: inputAjb.urx,
          ury: inputAjb.ury,
          page: inputAjb.page,
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoadingFile(true);
        if (result.success === false) {
          if (result.error === "Maaf, quota habis.") {
            setMeterai(false);
            setLoadingFile(false);
            swal(
              "Gagal",
              "Maaf kuota materai anda habis.\n Segera isi ulang kuota anda.",
              "error"
            );
          } else {
            setLoadingFile(false);
            swal("Gagal", result.error, "error");
            setMeterai(false);
          }
        } else {
          getDokumenAjb(id);
        }
      })
      .catch((error) => {
        getDokumenAjb(id);
        console.log("error", error);
      });
  };

  const getTtdImage = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/users/get-file?file_type=ttd",
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
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setTtdImage(URL.createObjectURL(result));
      })
      .catch((error) => console.log("error", error));
  };

  const addTandaTangan = (pageNumber, id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/sign-doc/step-1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: id,
          llx: inputAjb.llx,
          lly: inputAjb.lly,
          urx: inputAjb.urx,
          ury: inputAjb.ury,
          page: pageNumber,
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoadingFile(false);
        Cookies.set("sign_doc_id", result.data.sign_doc_id);
        setOtpModal(true);
      })
      .catch((error) => swal("Error", error, "error"));
  };

  const otpTandaTangan = (otp, id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/sign-doc/step-2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access_token,
          // 'Access-Control-Allow-Origin' : '*'
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: id,
          sign_doc_id: Cookies.get("sign_doc_id"),
          otp_code: otp,
        }),
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else if (response.status === 400) {
          return response.json();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setLoadingFile(false);
        if (result.error) {
          swal("Error", result.error, "error");
        } else {
          getDokumenAjb(id);
          setOtpModal(false);
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const cekKtp = (nik, type) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/users/get-profile?no_nik=" +
        nik,
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + token.access_token },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // setDataNik(result.data);
        setLoadingFile(false);
        let email = "";
        let tlp = "";

        if (type === "penjual") {
          email = "email_penjual";
          tlp = "tlp_penjual";
        } else if (type === "saksi_penjual") {
          email = "email_saksi_penjual";
          tlp = "tlp_saksi_penjual";
        } else if (type === "pembeli") {
          email = "email_pembeli";
          tlp = "tlp_pembeli";
        } else {
          email = "email_saksi_pembeli";
          tlp = "tlp_saksi_pembeli";
        }

        if (!result.success) {
          setWarning(true);
        } else {
          setInputAjb({
            ...inputAjb,
            [email]: result.data.email,
            [tlp]: result.data.phone_number,
          });
        }
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
      .then((response) => {
        setDataProv(response.data);
      })
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

  const getDataKel = (id_kota) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/loc/kelurahan?district_id=" +
        id_kota,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((response) => setDataKel(response.data))
      .catch((error) => console.log("error", error));
  };

  const rtcPage = (id) => {
    history.push("/ruang_virtual=testing&&id=" + id);
  };

  const inviteTtd = (id, email) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/sign-doc/notify-ttd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.access_token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: id,
          email: email,
        }),
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else if (response.status === 500) {
          swal("Error", "Internal Server Error", "error");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log("error", error));
  };

  const functions = {
    addPenjual,
    addPembeli,
    addDokumenAjb,
    addMeterai,
    addTandaTangan,
    getDokumenAjb,
    getTtdImage,
    otpTandaTangan,
    detailAjb,
    getDataKec,
    getDataKota,
    getDataProv,
    getDataKel,
    inviteTtd
  };

  return (
    <MyAjbContext.Provider
      value={{
        ajb,
        setAjb,
        inputAjb,
        setInputAjb,
        ttdDigital,
        setTtdDigital,
        meterai,
        setMeterai,
        status,
        setStatus,
        otpModal,
        setOtpModal,
        btnConfirm,
        setBtnConfirm,
        confirmModal,
        setConfirmModal,
        functions,
        loadingFile,
        setLoadingFile,
        cekKtp,
        dataNik,
        setDataNik,
        warning,
        setWarning,
        penjual,
        setPenjual,
        pembeli,
        setPembeli,
        ttdImage,
        setTtdImage,
        btnConfirmTtd,
        setBtnConfirmTtd,
        stepper,
        setStepper,
        nextStep,
        setNextStep,
        dataKec,
        setDataKec,
        dataKota,
        setDataKota,
        dataProv,
        setDataProv,
        dataKel,
        setDataKel,
        ajbDoc,
        setAjbDoc,
        rtcPage,
        faceVerifikasi,
        setFaceVerifikasi,
        dataDetailAjb,
        setDataDetailAjb,
      }}
    >
      {props.children}
    </MyAjbContext.Provider>
  );
};
