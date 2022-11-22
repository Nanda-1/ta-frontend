import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import swal from "sweetalert";
import ModalDokumen from "components/Modals/ModalDokumen";

export default function ModalVerif() {
  let email = cookies.get("email");

  const [disable, setDisable] = useState(true);
  const [load, setLoad] = useState(false);

  const getAnswer = () => {
    setLoad(true);

    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "/api/auth/register/check-email-status?email=" +
        cookies.get("email")
    )
      .then((res) => res.json())
      .then((res) => {
        setLoad(false);
        if (res.success === true) {
          swal({
            title: "Berhasil",
            text: "Email Anda sudah aktif",
            icon: "success",
          });
          setDisable(false);
        } else {
          setTimeout(() => {
            getAnswer();
          }, 5000);
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
    getAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {load === true ? <ModalDokumen /> : null}
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
            <div className="w-full text-right">
              <Link
                to="/login"
                className={`get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1  text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 ${
                  disable
                    ? "opacity--d bg-gray-d"
                    : "bg-blue-500 active:bg-blue-500"
                }`}
              >
                Lanjutkan
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
