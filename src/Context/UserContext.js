import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
// import cookies from "js-cookie";
import swal from "sweetalert";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [addBorrowModal, setAddBorrowModal] = useState(false);
  const [addCollectionModal, setAddCollectionModal] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [listCollection, setListCollection] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [totalCollectionList, setTotalCollectionList] = useState([]);
  const [gunung, setgunung] = useState(0);
  const [tebing, setTebing] = useState([]);
  const [selam, setSelam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalTeams, SetTotalTeams] = useState([]);
  const [totalBorrower, SetTotalBorrower] = useState([]);
  const [Borrowlist, setBorrowList] = useState([]);
  const [SendStatus, SetSendStatus] = useState([]);

  let history = useHistory();

  // var val = localStorage.getItem("dataPPAT");
  // var object = JSON.parse(val);

  // var login = localStorage.getItem("Authorization");
  var token = localStorage.getItem("token");
  var auth = token;

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: auth.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success === true) {
          auth.access_token = result.data.access_token;
          localStorage.setItem("token", JSON.stringify(auth));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          // localStorage.removeItem("dataPPAT");
          localStorage.removeItem("token");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const createTeams = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "/api/register", {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "API.KEY": "KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoIlh",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        username: addDocumentModal.username,
        password: addDocumentModal.password,
        role_id: parseInt(addDocumentModal.role_id),
        detail: {
          nra: addDocumentModal.nra,
          name: addDocumentModal.name,
          email: addDocumentModal.email,
          phone_number: addDocumentModal.phone_number,
          address: addDocumentModal.address,
          divisi: addDocumentModal.divisi,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        let data = result.data;
        console.log(result);
        setAddDocumentModal(data);
        swal("Data berhasil diinput", "Success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log("error", error);
        swal("Terdapat kesalahan saat mengirim data", error.message, "error");
      });
  };

  const GetTotalTeams = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "/api/total", {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "API.KEY": "KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoIlh",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        let data = result.data;
        // console.log(data);
        SetTotalTeams(data);
      })
      .catch((error) => console.log("error", error));
  };
  // API Peminjaman
  const TotalBorrwerList = () => {
    fetch("http://localhost:8070/api/peminjaman/count", {
      method: "GET",
      redirect: "follow",
      headers: {
        "API.KEY":
          "KkNEUgWfFlkQTPKqwFOnsdaPOsdnopdnwqOoIyjUKKcjCiMnQZRZBfJoIlh",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        let data = result.data;
        console.log(data);
        SetTotalBorrower(data);
      })
      .catch((error) => console.log("error", error));
  };

  const CollectionList = () => {
    fetch("http://localhost:8060/api/pendataan/get-all", {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "API.KEY": "KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoOPOPOPSAD",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        let data = result.data;
        // console.log(data);
        setListCollection(data);
      })
      .catch((error) => console.log("error", error));
  };

  const TotalCollectionList = (divisi_id) => {
    fetch(
      "http://localhost:8060/api/pendataan/get-total?divisi_id=" + divisi_id,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          "API.KEY": "KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoOPOPOPSAD",
          Authorization: "Bearer " + token,
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
        let data = result.data;
        if (divisi_id === 1) {
          setgunung(data);
          TotalCollectionList(2);
        } else if (divisi_id === 2) {
          setTebing(data);
          TotalCollectionList(3);
        } else {
          setSelam(data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const GetAllTeams = () => {
    var myHeaders = {
      "Content-Type": "application/json",
      "API.KEY": "KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoIlh",
      Authorization: "Bearer " + token,
    };

    let requestOptionsGet = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BACKEND_HOST + "/api/get-all",
      requestOptionsGet
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        let data = result.data;
        console.log(JSON.stringify(data));
        // console.log(JSON.parse(data));
        // console.log(data);
        setListTeams(data);
      })
      .catch((error) => console.log("error", error));
  };

  const GetAllBorrow = () => {
    fetch("http://localhost:8070/api/peminjaman/get-borrow", {
      method: "GET",
      redirect: "follow",
      headers: {
        "API.KEY":
          "KkNEUgWfFlkQTPKqwFOnsdaPOsdnopdnwqOoIyjUKKcjCiMnQZRZBfJoIlh",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        let data = result.data;
        // console.log(JSON.stringify(data));
        // console.log(JSON.parse(data));
        console.log(data);
        setBorrowList(data);
      })
      .catch((error) => console.log("error", error));
  };

  const GetFiles = (id) => {
    fetch(
      `http://localhost:8070/api/peminjaman/get-file?peminjaman_detail_id=${id}`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          "API.KEY":
            "KkNEUgWfFlkQTPKqwFOnsdaPOsdnopdnwqOoIyjUKKcjCiMnQZRZBfJoIlh",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        const filenameHeader = response.headers.get("content-disposition");
        const filenameMatch =
          filenameHeader && filenameHeader.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : "file.pdf"; // Set a default filename if not provided

        return response.blob().then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      })
      .catch((error) => {
        console.error("Error downloading the document:", error);
      });
  };

  const SendStatuMail = (id, status) => {
    return fetch(
      `http://localhost:8070/api/peminjaman/email?id=${id}&status=${status}`,
      {
        method: "POST",
        redirect: "follow",
        headers: {
          "API.KEY":
            "KkNEUgWfFlkQTPKqwFOnsdaPOsdnopdnwqOoIyjUKKcjCiMnQZRZBfJoIlh",
          Authorization: "Bearer " + token,
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
        let data = result.data;
        console.log(JSON.stringify(data));
        SetSendStatus(data);
        swal("Email Berhasil Dikirim", "Success", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        swal("Terdapat kesalahan saat mengirim data", error.message, "error");
      });
  };

  const createCollection = () => {
    fetch("http://localhost:8060/api/pendataan/create", {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "API.KEY": "KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoOPOPOPSAD",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        nama: addCollectionModal.name,
        jumlah: parseInt(addCollectionModal.jumlah),
        keterangan: addCollectionModal.keterangan,
        divisiId: parseInt(addCollectionModal.divisiId),
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        let data = result.data;
        console.log(JSON.stringify(data));
        setAddCollectionModal(data);
        swal("Barang berhasil di Input", "Success", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log("error", error);
        swal("Terdapat kesalahan saat mengirim data", "error");
      });
  };
  

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        addDocumentModal,
        setAddDocumentModal,
        loading,
        setLoading,
        listCollection,
        setListCollection,
        totalCollectionList,
        setTotalCollectionList,
        TotalCollectionList,
        dataUser,
        setDataUser,
        addBorrowModal,
        setAddBorrowModal,
        GetAllBorrow,
        addCollectionModal,
        setAddCollectionModal,
        CollectionList,
        listTeams,
        setListTeams,
        GetAllTeams,
        gunung,
        tebing,
        selam,
        setgunung,
        setTebing,
        setSelam,
        totalTeams,
        SetTotalTeams,
        GetTotalTeams,
        createCollection,
        totalBorrower,
        SetTotalBorrower,
        TotalBorrwerList,
        createTeams,
        setBorrowList,
        Borrowlist,
        GetFiles,
        SendStatuMail,
        SendStatus,
        SetSendStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
