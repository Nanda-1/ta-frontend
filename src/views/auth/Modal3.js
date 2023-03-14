import React, { useState, useContext } from "react";
import cookies from "js-cookie";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { RegistContext } from "views/auth/RegistContext";

export default function Modal3() {
  const history = useHistory();
  let email = cookies.get("email");
  const [load, setLoad] = useState(false);
  const { refreshToken } = useContext(RegistContext);
  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  const getAnswer = async () => {
    let myHeaders = new Headers();
    // myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);
    // myHeaders.append("Content-Type", "application/json");

    // let raw = JSON.stringify({
    //   email: cookies.get("email"),
    // });

    // let requestOptionsGet = {
    //   method: "POST",
    //   headers: myHeaders,
    //   // body: raw,
    //   // redirect: "follow",
    // };

    await fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/ca/check", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
        // body: JSON.stringify({
        //   refresh_token: token.refresh_token,
        // }),
      })
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setLoad(true);
        setTimeout(5000);

        if (res.success === false) {
          if (res.error === "user not found") {
            swal({
              title: "Gagal",
              text: "User tidak ditemukan",
              icon: "error",
            });
          }
          history.push("/modal3");
          // if (res.success === true)
        } else if (res.success === true) {
          /** Get Cert with PDS **/
          if (res.data.ca_status === "unregistered") {
            swal({
              title: "Perhatian",
              text: res.data.ca_status_description,
              icon: "warning",
            });
          } else if (res.data.ca_status === "active") {
            swal({
              title: "Perhatian",
              text: res.data.ca_status_description,
              icon: "warning",
            });
          } else if (res.data.ca_status === "expired") {
            swal({
              title: "Perhatian",
              text: res.data.ca_status_description,
              icon: "warning",
            });
          }
          /** Get Cert with Raintek **/
          // if (res.data.cert_code === "undefined") {
          //   setLoad(false);
          //   // setDisable(true);
          //   swal({
          //     title: "Gagal",
          //     text: "Harap periksa Email Anda untuk konfirmasi CA",
          //     icon: "error",
          //   });
          //   cookies.set("cert_code", res.data.cert_code, { expires: 1 });
          //   setTimeout(5000);
          //   history.push("/admin/dashboard");
          // } else {
          //   // setDisable(false);
          //   setLoad(true);
          //   swal({
          //     title: "Berhasil",
          //     text: "Certificate Authority (CA) Anda telah terkonfirmasi",
          //     icon: "success",
          //   });
          //   history.push("/admin/dashboard");
          //   cookies.set("cert_code", res.data.cert_code, { expires: 1 });
          //   // setAnswer(true);
          //   // console.log(answer);
          // }
          // setDisable(true);
          // setAnswer(false);
          // console.log(answer);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {load === true ? (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-25-d flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 h-36 w-36 mb-4"></div>
          </div>
        </>
      ) : null}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-800-d my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="text-right mt-3">
              <a
                href="/admin/dashboard"
                className="text-black text-sm px-4 py-2 outline-none"
              >
                <i className="fas fa-times text-black"></i>
              </a>
            </div>
            <div className="flex items-start justify-center rounded-t">
              <h3 className="text-2xl font-semibold text-blue-500 pt-10 text-center">
                Certificate of Authority (CA)
              </h3>
            </div>

            <img
              className="mx-auto align-middle h-24 w-24 bg-fix my-4 mt-4"
              src={require("assets/img/ic_konfirmasiemail.png").default}
              alt="no data"
            />

            <div className="my-1 mx-6 text-blueGray-500 text-md text-center">
              Terimakasih telah melengkapi data diri Anda. <br />
              Mohon periksa e-mail dibawah untuk verifikasi CA Anda.
              <br />
              <p className="text-blue-500 mt-3">{email}</p>
              <br />
            </div>

            <div className="text-center w-auto ml-12 mr-12 mx-auto">
              {/* <Link to="/admin/dashboard"> */}
                <button
                  onClick={getAnswer}
                  className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Verifikasi
                </button>
              {/* </Link> */}
            </div>
            <hr className="mt-8 border-0 pt-2" />
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
