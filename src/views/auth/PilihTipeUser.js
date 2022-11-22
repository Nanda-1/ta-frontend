import React, { useContext } from "react";
import { useHistory } from "react-router";
import cookies from "js-cookie";
import { RegistContext } from "./RegistContext";
import swal from "sweetalert";

export default function PilihTipeUser() {
  const history = useHistory();
  const { inputRegist, setInputRegist } = useContext(RegistContext);

  //Call API Lengkapi Diri GET(POST)
  const addRegistAPI = async (event) => {
    event.preventDefault();
    let getuid = "uid";
    let uid = cookies.get("uid");
    let getRole = "roles";
    let roles = event.currentTarget.name;
    cookies.set(getRole, roles);
    console.log(getRole, roles);

    setInputRegist({ ...inputRegist, [getuid]: uid, [getRole]: roles });
    console.log(inputRegist);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
    myHeaders.append("Cookie", "REVEL_FLASH=");

    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/users/" + uid
      // requestOptionsGet
    )
      .then((res) => res.json())
      .then((res) => {
        let data = res.data;

        //check if token expired or not
        // if (res.response.status === 401) {
        //   alert("Your session has expired, please login again.");
        //   history.push("/login");
        // } else {
        //   cookies.set("token", res.data.token);
        //   alert("expired");
        // }

        if (data === null) {
          if (res.error === "User Not Found") {
            swal({
              title: "Gagal!",
              text: "User tidak ditemukan, Anda harus login terlebih dahulu",
              icon: "warning",
            });
          }
        } else {
          if (roles === "umum") {
            history.push("/stepper");
            swal({
              title: "Perhatian",
              text: "Pastikan Anda mengisikan data sesuai KTP asli anda. Karena data - data tersebut tidak dapat diubah dan akan digunakan sebagai alat autentikasi tanda tangan digital Anda",
              icon: "warning",
            });
          } else if (roles === "ppat") {
            history.push("/stepperPAT");
            swal({
              title: "Perhatian",
              text: "Pastikan Anda mengisikan data sesuai KTP asli anda. Karena data - data tersebut tidak dapat diubah dan akan digunakan sebagai alat autentikasi tanda tangan digital Anda",
              icon: "warning",
            });
          }
        }
        setInputRegist({ ...inputRegist, data });
        console.log(data);
        cookies.set(data);
        cookies.set("email", res.data.email);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <p className="pt-12"></p>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-960-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 mb-0 px-6 py-6">
                <div className="text-center mb-0">
                  <h1 className="text-blue-500 text-xl font-bold mt-4">
                    Pilih Tipe Pengguna
                  </h1>
                </div>
              </div>
              <div className="space-y-4 container px-tipe mx-auto">
                <div className="flex-wrap flex-1">
                  <ul className="w-full flex mx-auto">
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox1"
                        name="umum"
                        onChange={addRegistAPI}
                        value="umum"
                      />
                      <label
                        htmlFor="myCheckbox1"
                        className="group block mx-auto h-28 w-24 mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/personal.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          Personal
                        </h3>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox2"
                        name="ppat"
                        onChange={addRegistAPI}
                        value="ppat"
                      />
                      <label
                        htmlFor="myCheckbox2"
                        className="group block mx-auto h-28 w-24 mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/ppat.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          PPAT
                        </h3>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox3"
                        // onChange={handleChange}
                        value="Notaris"
                      />
                      <label
                        htmlFor="myCheckbox3"
                        className="group block mx-auto h-28 w-24 mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/notaris.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          Notaris
                        </h3>
                      </label>
                    </li>
                  </ul>

                  <div className="w-full py-3"></div>

                  <ul className="w-full flex mx-auto">
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox4"
                        // onChange={handleChange}
                        value="Perusahaan"
                      />
                      <label
                        htmlFor="myCheckbox4"
                        className="group block mx-auto h-28 w-24 mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/perusahaan.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          Perusahaan
                        </h3>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox5"
                        // onChange={handleChange}
                        value="Organisasi"
                      />
                      <label
                        htmlFor="myCheckbox5"
                        className="group block mx-auto h-28 w-24 mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/organisasi.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          Organisasi
                        </h3>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="myCheckbox6"
                        // onChange={handleChange}
                        value="Pemerintah"
                      />
                      <label
                        htmlFor="myCheckbox6"
                        className="group block mx-auto h-28 w-24 mr-3 ml-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-blue-500 hover:ring-slate-900"
                      >
                        <img
                          src={require("assets/img/pemerintah.png").default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          Pemerintah
                        </h3>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <hr className="mt-6 mb-4 my-4 py-4 border-0" />
            </div>
            <div className="relative flex-col w-800-d mx-auto">
              {/* <div className="w-800-d">
                <Link to="/dashboard">
                  <button className="get-started text-black px-6 py-3 rounded-lg outline-none focus:outline-none bg-white active:bg-blue-600 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Kembali
                  </button>
                </Link>
              </div> */}
              {/* <div className="w-1/2 text-right">
                <Link to="/syarat">
                  <button
                    className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mb-1 bg-sky-600 active:bg-sky-600 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    type="button"
                  >
                    Lanjutkan
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <p className="pb-16"></p>
    </>
  );
}
