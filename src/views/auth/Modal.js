import React from "react";
import { Link } from "react-router-dom";

export default function Modal() {
  // const getActivated = async (event) => {
  //   event.preventDefault();
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Cookie", "REVEL_FLASH=");

  //   let raw = JSON.stringify({
  //     email: cookies.get("email"),
  //   });

  //   let requestOptionsGet = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.REACT_APP_BACKEND_HOST + "api/verifikasi/email/send",
  //     requestOptionsGet
  //   )
  //     .then((res) => res.json())
  //     .then(() => {
  //       cookies.set("tipe_otp", "registrasi", { expires: 1 });
  //       history.push("/modal2");
  //     })
  //     .catch((error) => console.log("error", error));

  //   // let email = cookies.get("email");
  //   // let code = cookies.get("code");
  //   // setLoad(true);
  //   // fetch(
  //   //   "http://192.168.1.235:3001/api/auth/activate?email=" +
  //   //     email +
  //   //     "&code=" +
  //   //     code +
  //   //     ""
  //   // )
  //   //   .then((response) => response.json())
  //   //   .then((response) => {
  //   //     cookies.set("actived", actived, { expires: 1 });
  //   //     console.log("active: ", actived);
  //   //     let actived = response.data.active_email;
  //   //     setGet(actived);
  //   //     setStatus(true);
  //   //   });
  // };

  return (
    <>
      {/* {load ? (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-25-d flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 h-36 w-36 mb-4"></div>
          </div>
        </>
      ) : null} */}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-800-d my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center pt-6 rounded-t">
              <h3 className="text-2xl font-semibold text-blue-500 pt-7">
                Registrasi Berhasil
              </h3>
            </div>
            <img
              className="mx-auto align-middle h-24 w-24 bg-fix my-4"
              src={require("assets/img/sukses.png").default}
              alt="no data"
            />
            <p className="my-1 mx-6 mb-12 text-blueGray-500 text-md text-center">
              Silahkan klik "Lanjutkan"{" "}
            </p>
          </div>
          <div className="relative flex flex-wrap my-6 w-auto mx-auto">
            <div className="w-1/2"></div>
            <div className="w-1/2 text-right">
              <Link to="/modal2">
                <button
                  className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  type="button"
                  // onClick={getActivated}
                >
                  Lanjutkan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
