import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import swal from "sweetalert";

export default function ModalVerif() {

  let email = cookies.get("email");

  const [disable, setDisable] = useState(true);
  const [load, setLoad] = useState(false);

  const getAnswer = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer " + cookies.get("token"));

    let requestOptionsGet = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let uid = cookies.get("uid");

    await fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/users/" + uid,
      requestOptionsGet
    )
      .then((res) => res.json())
      .then((res) => {
        cookies.set("tipe_otp", "registrasi", { expires: 1 });
        setLoad(true);
        if (res.success === true) {
          if (res.data.active_email === true) {
            setDisable(false);
            setLoad(true);
            swal({
              title: "Berhasil",
              text: "Email Anda sudah aktif",
              icon: "success",
            });
          } else {
            setDisable(true);
            setLoad(false);
            swal({
              title: "Perhatian",
              text: "Harap verifikasi email Anda terlebih dahulu",
              icon: "warning",
            });
          }
        } else {
          swal({
            title: "Gagal",
            text: "Verifikasi email gagal. Silahkan coba lagi",
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const timer = setInterval(getAnswer, 30000);
    return () => clearInterval(timer);
  }, []);

  const resendEmailRegist = async (event) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "REVEL_FLASH=");

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
      process.env.REACT_APP_BACKEND_HOST + "api/verifikasi/email/send",
      requestOptionsGet
    )
      .then((res) => res.json())
      .then(() => {
        cookies.set("tipe_otp", "registrasi", { expires: 1 });
        swal({
          title: "Mengirim Ulang E-mail Aktivasi!",
          text: "Silahkan periksa e-mail Anda",
          icon: "info",
        });
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
            <div className="flex items-start justify-center rounded-t pt-4">
              <h3 className="text-2xl font-semibold text-blue-500 pt-4">
                Verifikasi E-Mail
              </h3>
            </div>

            <img
              className="mx-auto align-middle h-24 w-24 bg-fix my-4 mt-4"
              src={require("assets/img/ic_konfirmasiemail.png").default}
              alt="no data"
            />

            <div className="my-1 mx-6 mb-12 text-blueGray-500 text-md text-center">
              Terimakasih telah melakukan registrasi. <br />
              Mohon periksa e-mail dibawah untuk verifikasi e-mail Anda.
              <br />
              <p className="text-blue-500 mt-3">{email}</p>
              <br />
              <p className="mt-0 text-sm">Belum terima e-mail?</p>
              <a
                className="text-blue-500 mt-0 font-semibold text-xs"
                href="/login"
                onClick={resendEmailRegist}
              >
                Klik disini untuk kirim ulang
              </a>
            </div>
          </div>
          <div className="relative flex flex-wrap mt-4 w-auto mx-auto">
            <div className="w-1/2">
              {/* <Link to="/syarat2">
                <button className="get-started text-black px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                  Kembali
                </button>
              </Link> */}
            </div>
            <div className="w-1/2 text-right">
              {disable !== true ? (
                <Link to="/login">
                  <button className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Lanjutkan
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="opacity--d get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-gray-d active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Lanjutkan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
