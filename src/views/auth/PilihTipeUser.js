import React, { useContext } from "react";
import { useHistory } from "react-router";
import cookies from "js-cookie";
import { RegistContext } from "./RegistContext";
import swal from "sweetalert";

export default function PilihTipeUser() {
  const history = useHistory();
  const { inputRegist, setInputRegist } = useContext(RegistContext);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const pengguna = [
    {
      id: "personal",
      name: "Personal",
    },
    {
      id: "ppat",
      name: "PPAT",
    },
    {
      id: "notaris",
      name: "Notaris",
    },
    {
      id: "perusahaan",
      name: "Perusahaan",
    },
    {
      id: "organisasi",
      name: "Organisasi",
    },
    {
      id: "pemerintah",
      name: "Pemerintah",
    },
  ];

  //Call API Lengkapi Diri GET(POST)
  const addRegistAPI = (event) => {
    let getRole = "roles";
    let roles = event;
    cookies.set(getRole, roles);

    setInputRegist({ ...inputRegist, uid: object.uid, [getRole]: roles });

    if (roles === "personal") {
      history.push("/lengkapiDiri/stepper");
      swal({
        title: "Perhatian",
        text: "Pastikan Anda mengisikan data sesuai KTP asli anda. Karena data - data tersebut tidak dapat diubah dan akan digunakan sebagai alat autentikasi tanda tangan digital Anda",
        icon: "warning",
        closeOnClickOutside: false
      });
    } else if (roles === "ppat") {
      history.push("/lengkapiDiri/stepperPPAT");
      swal({
        title: "Perhatian",
        text: "Pastikan Anda mengisikan data sesuai KTP asli anda. Karena data - data tersebut tidak dapat diubah dan akan digunakan sebagai alat autentikasi tanda tangan digital Anda",
        icon: "warning",
        closeOnClickOutside: false
      });
    }
  };

  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-960-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 mb-0 px-6 py-6">
                <div className="text-center mb-0">
                  <h1 className="text-blue text-xl font-bold mt-4">
                    Pilih Tipe Pengguna
                  </h1>
                </div>
              </div>
              <div className="space-y-4 container px-tipe mx-auto">
                <div className="flex-wrap flex-1 w-full mx-auto grid grid-cols-3">
                  {pengguna.map((el, index) => {
                    return (
                      <button
                        onClick={() => addRegistAPI(el.id)}
                        className="mb-6 focus:outline-none group cursor-pointer block mx-auto h-28 w-24 m-3 p-2 rounded-lg bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:pilihTipeUser"
                        key={index}
                      >
                        <img
                          src={require(`assets/img/` + el.id + `.png`).default}
                          alt="no data"
                          className="mx-auto mt-3 h-d-4 w-d-4"
                        />
                        <h3 className="pt-d text-sky-900d group-hover:text-white mx-auto text-center text-xs font-semibold">
                          {el.name}
                        </h3>
                      </button>
                    );
                  })}
                </div>
              </div>
              <hr className="mt-6 mb-4 my-4 py-4 border-0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
