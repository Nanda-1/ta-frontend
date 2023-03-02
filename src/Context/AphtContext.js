import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import Cookies from "js-cookie";

export const MyAphtcontext = createContext();

export const AphtProvider = (props) => {
  const [apht, setApht] = useState([""]);
  const [inputApht, setInputApht] = useState([""]);
  const [ttdDigital, setTtdDigital] = useState(false);
  const [meterai, setMeterai] = useState(false);
  const [ttdImage, setTtdImage] = useState("");
  const [status, setStatus] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [btnConfirm, setBtnConfirm] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [warning, setWarning] = useState();
  const [dataNik, setDataNik] = useState();
  const [dokTemplate, setDokTemplate] = useState();
  const [debitor, setDebitor] = useState(false);
  const [kreditor, setKreditor] = useState(false);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: object.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          object.token = result.data.token;
           localStorage.setItem('dataPPAT', JSON.stringify(object))
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          localStorage.removeItem("dataPPAT");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addDebitor = () => {
    let id = Number(inputApht.id_transaksi);

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/pihakpertama", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        actors: [
          {
            nik: inputApht.nik_debitor,
            email: inputApht.email_debitor,
            phone: inputApht.tlp_debitor,
            status: inputApht.status_debitor,
            actor_type: "penjual",
            actor_role: inputApht.tipe_debitor,
          },
          {
            nik: inputApht.nik_saksi_debitor,
            email: inputApht.email_saksi_debitor,
            phone: inputApht.tlp_saksi_debitor,
            actor_type: "saksi _debitur",
            actor_role: "umum",
          },
        ],
        docs: [
          {
            tipe: "surat_nikah_debitor",
            base64: inputApht.surat_nikah_debitor,
          },
          {
            tipe: "kartu_keluarga_debitor",
            base64: inputApht.kartu_keluarga_debitor,
          },
          { tipe: "sertifikat_tanah", base64: inputApht.sertifikat_tanah },
          { tipe: "pbb_tahun_terakhir", base64: inputApht.pbb_tahun_terakhir },
          { tipe: "stts", base64: inputApht.stts },
          { tipe: "npwp_debitor", base64: inputApht.npwp_debitor },
          {
            tipe: "akta_pendirian_debitor",
            base64: inputApht.akta_pendirian_debitor,
          },
          {
            tipe: "sk_pengangkatan_debitor",
            base64: inputApht.sk_pengangkatan_debitor,
          },
        ],
      }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (!result.success) {
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addKreditor = () => {
    let id = Number(inputApht.id_transaksi);

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/pihakkedua", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        actors: [
          {
            nik: inputApht.nik_kreditor,
            email: inputApht.email_kreditor,
            phone: inputApht.tlp_kreditor,
            status: inputApht.status_kreditor,
            actor_type: "Kreditor",
            actor_role: inputApht.tipe_kreditor,
          },
          {
            nik: inputApht.nik_saksi_kreditor,
            email: inputApht.email_saksi_kreditor,
            phone: inputApht.tlp_saksi_kreditor,
            actor_type: "Saksi Kreditor",
            actor_role: "umum",
          },
        ],
        docs: [
          {
            tipe: "surat_nikah_kreditor",
            base64: inputApht.surat_nikah_kreditor,
          },
          {
            tipe: "kartu_keluarga_kreditor",
            base64: inputApht.kartu_keluarga_kreditor,
          },
          { tipe: "npwp_photo_kreditor", base64: inputApht.npwp_kreditor },
          {
            tipe: "akta_pendirian_kreditor",
            base64: inputApht.akta_pendirian_kreditor,
          },
          {
            tipe: "sk_pengangkatan_kreditor",
            base64: inputApht.sk_pengangkatan_kreditor,
          },
        ],
      }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result.data.total_pending_invitation > 0) {
          history.push("/admin/dashboard");
          swal("Berhasil Membuat Draf", "Menunggu Registrasi", "success");
        }
        if (!result.success) {
          swal("Gagal", result.error, "error");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const template = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/webform/template/apht", {
      method: "GET",
      // body: formdata,
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setDokTemplate(result);
      })
      .catch(() => getDocumentApht("akta_pemberian_hak_tanggungan"));
  };

  const addDokumenApht = async () => {
    let id = inputApht.id_transaksi
      ? Number(inputApht.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    let dataTransaksi = Number(inputApht.nilai_transaksi);

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
          Authorization: "Bearer " + object.token,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          transaction_id: id,
          doc_name: inputApht.nama_dokumen,
          doc_num: inputApht.nomor_dokumen,
          price_value: dataTransaksi,
          data: [
            { var_ppat_name: inputApht.ppat_name },
            { var_kota: inputApht.kota.toUpperCase() },
            // {"var_gelar_notaris": inputApht.ppat_gelar},
            { var_hari: day },
            { var_tanggal: date },
            { var_bulan: month },
            { var_tahun: year },
            { var_alamat: inputApht.alamat },
            { var_nomor: "7/2022" },
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
        setTimeout(() => {
          setLoadingFile(false);
          dokumenApht("akta_pemberian_hak_tanggungan");
        }, 5000);
      })
      .catch((error) => console.log("error", error));
  };

  const dokumenApht = (doc) => {
    let id = inputApht.id_transaksi
      ? Number(inputApht.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "/api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        doc,
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + object.token,
        },
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
          setLoadingFile(false);
          // swal("Gagal", result.error, "error");
          template();
        } else {
          getDocumentApht("akta_pemberian_hak_tanggungan");
        }
      })
      .catch(() => getDocumentApht("akta_pemberian_hak_tanggungan"));
  };

  const getDocumentApht = (doc) => {
    let id = inputApht.id_transaksi
      ? Number(inputApht.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "/api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        doc,
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + object.token,
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
        let name = "doc";
        setInputApht({ ...inputApht, [name]: result });
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const getTtdImage = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/lengkapidiri/download/" +
       object.uid +
        "/specimen_tdtgn_file",
      {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: "Bearer " + object.token,
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

  const addMeterai = () => {
    let id = inputApht.id_transaksi
      ? Number(inputApht.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/stampmaterai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        llx: inputApht.llx,
        lly: inputApht.lly,
        urx: inputApht.urx,
        ury: inputApht.ury,
        page_num: inputApht.meteraiPage,
        // "is_fixed_position": true,
        doc_type: "akta_pemberian_hak_tanggungan",
      }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result.success === false) {
          setLoadingFile(false);
          swal("Gagal", result.error, "error");
          setMeterai(false);
        } else {
          setTimeout(() => {
            getDokumenAphtStamp("akta_pemberian_hak_tanggungan");
          }, 3000);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          getDokumenAphtStamp("akta_pemberian_hak_tanggungan");
        }, 3000);
      });
  };

  const addTandaTangan = () => {
    let id = inputApht.id_transaksi
      ? Number(inputApht.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/stampmaterai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        llx: inputApht.llx,
        lly: inputApht.lly,
        urx: inputApht.urx,
        ury: inputApht.ury,
        page_num: inputApht.meteraiPage,
        // "is_fixed_position": true,
      }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result.success === false) {
          setLoadingFile(false);
          swal("Gagal", result.error, "error");
          setMeterai(false);
        } else {
          setTimeout(() => {
            getDokumenAphtStamp("akta_pemberian_hak_tanggungan");
          }, 3000);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          getDokumenAphtStamp("akta_pemberian_hak_tanggungan");
        }, 3000);
      });
  };

  const getDokumenAphtStamp = (doc) => {
    let id = inputApht.id_transaksi
      ? Number(inputApht.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "/api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        doc,
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + object.token,
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
        let name = "doc2";
        setInputApht({ ...inputApht, [name]: result });
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const submitApht = (event) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "multipart/form-data");

    // var formdata = new FormData();
    // formdata.append("transaction_id", Cookies.get("id_transaksi"));
    // formdata.append("user_id", event);

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: "follow",
    // };

    // console.log(event);

    // fetch(
    //   process.env.REACT_APP_BACKEND_HOST + "api/transaction/ca/sign",
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    // console.log(result);
    history.push(`/admin/dashboard`);
    // })
    // .catch((error) => console.log("error", error));
  };

  const cekKtp = (nik, type) => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/nik/" + nik, {
      method: "GET",
      redirect: "follow",
      headers: { Authorization: "Bearer " + object.token },
    })
      .then((response) => response.json())
      .then((result) => {
        setDataNik(result.data);
        setLoadingFile(false);
        if (result.success !== true) {
          if (type === "penjual") {
            setWarning(2);
          } else {
            setWarning(1);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  const functions = {
    submitApht,
    addDebitor,
    addKreditor,
    addDokumenApht,
    addMeterai,
    addTandaTangan,
    dokumenApht,
    getDocumentApht,
    getDokumenAphtStamp,
    getTtdImage,
    template,
  };

  return (
    <MyAphtcontext.Provider
      value={{
        apht,
        setApht,
        inputApht,
        setInputApht,
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
        warning,
        setWarning,
        dataNik,
        setDataNik,
        dokTemplate,
        setDokTemplate,
        debitor,
        setDebitor,
        kreditor,
        setKreditor,
        ttdImage,
        setTtdImage,
      }}
    >
      {props.children}
    </MyAphtcontext.Provider>
  );
};
