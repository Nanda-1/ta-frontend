import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const MyAjbContext = createContext();

export const AjbProvider = (props) => {
  const [ajb, setAjb] = useState([""]);
  const [inputAjb, setInputAjb] = useState([]);
  const [dataProv, setDataProv] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const [dataKel, setDataKel] = useState([]);
  const [dataNik, setDataNik] = useState();
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

  const addPenjual = () => {
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
          transaction_id: Cookies.get("transaction_id"),
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

  const addPembeli = () => {
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
          transaction_id: Cookies.get("transaction_id"),
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
          }else{
            addDokumenAjb()
          }
        } else if (result.success !== true) {
          setLoadingFile(false);
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addDokumenAjb = async () => {
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
          transaction_id: Cookies.get("transaction_id"),
          doc_name: inputAjb.nama_dokumen,
          doc_num: inputAjb.nomor_dokumen,
          price_value: inputAjb.price_value,
          data: {
            no_ajb: inputAjb.no_ajb,
            gelar: inputAjb.gelar,
            pekerjaan: inputAjb.pekerjaan,
            kel_ktp_pihak_pertama: inputAjb.kel_ktp_pihak_pertama,
            tgl_keluar_ktp_pihak_pertama: inputAjb.tgl_keluar_ktp_pihak_pertama,
            berlaku_ktp_pihak_pertama: inputAjb.berlaku_ktp_pihak_pertama,
            pekerjaan_pihak_kedua: inputAjb.pekerjaan_pihak_kedua,
            kel_ktp_pihak_kedua: inputAjb.kel_ktp_pihak_kedua,
            tgl_keluar_ktp_pihak_kedua: inputAjb.tgl_keluar_ktp_pihak_kedua,
            berlaku_ktp_pihak_kedua: inputAjb.berlaku_ktp_pihak_kedua,
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
          getDokumenAjb();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const dokumenAjb = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        Cookies.get("transaction_id") +
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
          return response.json();
        }
      })
      .then((result) => {
        if (result.success === false) {
          setLoadingFile(false);
          getDokumenAjb();
        }
      })
      .catch((err) => console.log(err));
  };

  const getDokumenAjb = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        Cookies.get("transaction_id") +
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
        let name = "doc";
        setInputAjb({ ...inputAjb, [name]: result });
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const detailAjb = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        Cookies.get("transaction_id"),
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
        let nomor_dokumen = result.data.doc_num;
        let nama_dokumen = result.data.doc_name;
        let id = result.data.transaction_id;
        let data = result.data.eform_json_data;
        let hasil = data.replace(/'/g, '"');
        let hasil2 = hasil.replace(/None/g, "null");

        let obj = JSON.parse(hasil2);
        setInputAjb({ ...inputAjb, ...obj, nomor_dokumen, nama_dokumen, id });
        getDokumenAjb()
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumenAjbStamp = (doc) => {
    let id = inputAjb.id_transaksi
      ? Number(inputAjb.id_transaksi)
      : Number(Cookies.get("transaction_id"));

    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        doc,
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "application/pdf",
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
        let name = "doc2";
        setInputAjb({ ...inputAjb, [name]: result });
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const addMeterai = () => {
    let id = inputAjb.id_transaksi
      ? Number(inputAjb.id_transaksi)
      : Number(Cookies.get("transaction_id"));

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
          transaction_id: Cookies.get("transaction_id"),
          llx: inputAjb.llx,
          lly: inputAjb.lly,
          urx: inputAjb.urx,
          ury: inputAjb.ury,
          page: inputAjb.meteraiPage,
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
          getDokumenAjb();
        }
      })
      .catch((error) => {
        getDokumenAjb();
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

  const addTandaTangan = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/ttd/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: Cookies.get("transaction_id"),
        llx: inputAjb.llx,
        lly: inputAjb.lly,
        urx: inputAjb.urx,
        ury: inputAjb.ury,
        page: inputAjb.page,
      }),
      redirect: "follow",
    })
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
        console.log(result);
        Cookies.set("sign_doc_id", result.data.sign_doc_id);
        setOtpModal(true);
      })
      .catch((error) => swal("Error", error, "error"));
  };

  const otpTandaTangan = (otp) => {
    alert(otp);
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/ttd/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: Number(Cookies.get("transaction_id")),
        sign_doc_id: Cookies.get("sign_doc_id"),
        otp_code: otp,
      }),
      redirect: "follow",
    })
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
        alert("berhasil D" + result);
        setLoadingFile(false);
        setInputAjb({ ...inputAjb, doc2: result });
        setOtpModal(false);
        swal("Berhasil", "Pembubuhan tanda tangan berhasil", "success");
      })
      .catch((error) => {
        console.log(error);
        alert("error " + error);
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
        console.log(inputAjb.provinsi_hak_milik);
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

  const functions = {
    addPenjual,
    addPembeli,
    addDokumenAjb,
    addMeterai,
    addTandaTangan,
    getDokumenAjb,
    dokumenAjb,
    getDokumenAjbStamp,
    getTtdImage,
    otpTandaTangan,
    detailAjb,
    getDataKec,
    getDataKota,
    getDataProv,
    getDataKel,
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
      }}
    >
      {props.children}
    </MyAjbContext.Provider>
  );
};