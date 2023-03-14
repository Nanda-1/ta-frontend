import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const MyAjbContext = createContext();

export const AjbProvider = (props) => {
  const [ajb, setAjb] = useState([""]);
  const [inputAjb, setInputAjb] = useState([""]);
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
  const [dokTemplate, setDokTemplate] = useState();
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
    let id = Number(inputAjb.id_transaksi);

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/pihakpertama", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        actors: [
          {
            nik: inputAjb.nik_penjual,
            email: inputAjb.email_penjual,
            phone: inputAjb.tlp_penjual,
            status: inputAjb.status_penjual,
            actor_type: "penjual",
            actor_role: inputAjb.tipe_penjual,
          },
          {
            nik: inputAjb.nik_saksi_penjual,
            email: inputAjb.email_saksi_penjual,
            phone: inputAjb.tlp_saksi_penjual,
            actor_type: "saksi _penjual",
            actor_role: "umum",
          },
        ],
        docs: [
          { tipe: "surat_nikah_penjual", base64: inputAjb.surat_nikah_penjual },
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
        setNextStep(true);
        if (!result.success) {
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addPembeli = () => {
    setLoadingFile(true);
    let id = Number(inputAjb.id_transaksi);

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/pihakkedua", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        actors: [
          {
            nik: inputAjb.nik_pembeli,
            email: inputAjb.email_pembeli,
            phone: inputAjb.tlp_pembeli,
            status: inputAjb.status_pembeli,
            actor_type: "Pembeli",
            actor_role: inputAjb.tipe_pembeli,
          },
          {
            nik: inputAjb.nik_saksi_pembeli,
            email: inputAjb.email_saksi_pembeli,
            phone: inputAjb.tlp_saksi_pembeli,
            actor_type: "Saksi Pembeli",
            actor_role: "umum",
          },
        ],
        docs: [
          { tipe: "surat_nikah_pembeli", base64: inputAjb.surat_nikah_pembeli },
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
        setNextStep(true);
        if (result.data) {
          if (result.data.total_pending_invitation > 0) {
            history.push("/admin/dashboard");
            swal("Berhasil Membuat Draf", "Menunggu Registrasi", "success");
          }
        } else if (result.success !== true) {
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const uploadDokumen = () => {
    var formdata = new FormData();
    formdata.append("transaction_id", Cookies.get("id_transaksi"));
    formdata.append("doc_name", inputAjb.nama_dokumen);
    formdata.append("doc_num", inputAjb.nomor_dokumen);
    formdata.append("is_new_version", "0");
    formdata.append("price_value", inputAjb.harga);
    formdata.append("doc", inputAjb.dokumen_ajb);

    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/transaction/upload-dokumen",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token.access_token,
        },
        credentials: "same-origin",
        body: formdata,
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
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const template = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/webform/template/ajb", {
      method: "GET",
      // body: formdata,
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
        setDokTemplate(result);
      })
      .catch(() => getDokumenAjb("akta_jual_beli"));
  };

  const addDokumenAjb = async () => {
    let id = inputAjb.id_transaksi
      ? Number(inputAjb.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    let dataTransaksi = Number(inputAjb.nilai_transaksi);

    const tgl = new Date();

    const date = new Date().getDate();
    const month = tgl.toLocaleString("id", { month: "long" });
    const year = new Date().getFullYear();
    const day = tgl.toLocaleString("id", { weekday: "long" });

    await fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/transaction/dokumen",
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
          price_value: dataTransaksi,
          data: [
            { var_ppat_name: inputAjb.ppat_name },
            { var_kota: inputAjb.kota },
            // {"var_gelar_notaris": inputAjb.ppat_gelar},
            { var_hari: day },
            { var_tanggal: date },
            { var_bulan: month },
            { var_tahun: year },
            { var_alamat: inputAjb.alamat },
            { var_nomor: "7/2022" },
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
        console.log(result);
        if (!result.success) {
          swal("Gagal", result.error, "error");
        } else {
          dokumenAjb("akta_jual_beli");
        }
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const dokumenAjb = (doc) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        Cookies.get("id_transaksi") +
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
          // swal("Gagal", result.error, "error");
          template();
        } else {
          getDokumenAjb("akta_jual_beli");
        }
      })
      .catch(() => getDokumenAjb("akta_jual_beli"));
  };

  const getDokumenAjb = (doc) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_TRANSACTION +
        "/api/transactions/" +
        Cookies.get("id_transaksi") +
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

  const getDokumenAjbStamp = (doc) => {
    let id = inputAjb.id_transaksi
      ? Number(inputAjb.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

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
      : Number(Cookies.get("id_transaksi"));

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/stampmaterai", {
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
        page_num: inputAjb.meteraiPage,
        // "is_fixed_position": true,
        doc_type: "akta_jual_beli",
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
          getDokumenAjbStamp("akta_jual_beli");
        }
      })
      .catch((error) => {
        getDokumenAjbStamp("akta_jual_beli");
        console.log("error", error);
      });
  };

  const getTtdImage = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/users/get-file?file_type=specimen_tdtgn_file",
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
        transaction_id: Number(Cookies.get("id_transaksi")),
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
        transaction_id: Number(Cookies.get("id_transaksi")),
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
      process.env.REACT_APP_BACKEND_HOST +
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
            [tlp]: result.data.phone,
          });
        }
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
    dokumenAjb,
    getDokumenAjbStamp,
    getTtdImage,
    uploadDokumen,
    otpTandaTangan,
    template,
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
        dokTemplate,
        setDokTemplate,
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
      }}
    >
      {props.children}
    </MyAjbContext.Provider>
  );
};
