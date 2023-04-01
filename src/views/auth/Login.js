import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useHistory } from "react-router";
import swal from "sweetalert";

// Context
import { UserContext } from "Context/UserContext";
import ModalDokumen from "components/Modals/ModalDokumen";

export default function Login() {
  const history = useHistory();
  const { setLoginStatus } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [input, setInput] = useState({
    tlp: null,
    email: null,
    password: "",
  });

  const handleChange = (event) => {
    let typeOfInput = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: typeOfInput });
  };

  if (input.tlp?.includes("@")) {
    setInput({ ...input, email: input.tlp, tlp: null });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // var pattern = new RegExp(/^\s+|\s+$/g, "");
    setLoading(true);
    // var noTlp = trim(input.tlp);
    let pass = input.password.length;

    if (pass < 8) {
      setError("Password Minimal 8 Karakter!");
      setLoading(false);
    } else {
      // if (noTlp) {
      await fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          phone_number: input.tlp,
          email: input.email,
          password: input.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data === null) {
            if (res.error === "Wrong Password") {
              setError("Password yang anda masukkan salah!");
              setLoading(false);
            } else {
              setError(
                res.error
                // "Nomor Handphone Tidak Terdaftar. Silahkan melakukan pendaftaran terlebih dahulu."
              );
              setLoading(false);
            }
          } else if (res.success === "false") {
            swal("Gagal", res.error, "error");
            setLoading(false);
          } else if (res.data !== null && res.success !== true) {
            swal("Gagal", res.error, "error");
            setLoading(false);
          } else {
            let phone = res.data.user.phone_number;
            let id = res.data.user.user_id;
            // localStorage.setItem("dataUser", JSON.stringify(res.data));
            cookies.set("phone", phone, { expires: 1 });
            cookies.set("uid", id, { expires: 1 });
            cookies.set("tipe_otp", "login", { expires: 1 });
            history.push("/login_otp");
            setLoginStatus(true);
            setLoading(false);
            return true;
          }
        })
        .catch((err) => {
          if (err.message === "Failed to fetch") {
            swal("Error 404", "Tidak Ada Koneksi Internet", "error");
          }
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-4/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 py-6 bg-white">
                <div className="text-center text-3xl font-bold text-blue pt-6">
                  Log In
                </div>
                <div className="text-sm pt-2 pb-10 text-center">
                  {" "}
                  Masukkan nomor handphone dan password akun Anda
                </div>
                {error ? (
                  <div
                    className="my-2 text-sm text-left text-red-600 bg-red-200 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md
                    "
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nomor Handphone
                    </label>
                    <input
                      type="text"
                      name="tlp"
                      value={input.tlp || input.email || ""}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
                      required={true}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      className="border-0 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
                      value={input.password || ""}
                      min="6"
                      onChange={handleChange}
                      required={true}
                      autoComplete="on"
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="showPass focus:outline-none"
                    >
                      <i
                        className={
                          passwordShown ? "fa fa-eye-slash" : "fa fa-eye"
                        }
                      ></i>
                    </button>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <Link
                          to="/forgotpwd"
                          className="text-blue text-xs font-bold"
                        >
                          Klik Disini Untuk Lupa Password
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <input
                      type="submit"
                      value="Log In"
                      className="bg-blue text-white text-sm font-bold py-2 mt-1 text-center rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </form>
                <div className="text-center text-xs mt-8">
                  Belum Memiliki Akun?{" "}
                  <Link
                    to="/syaratKetentuan"
                    className="text-blue text-xs font-bold"
                  >
                    Klik Untuk Daftar.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
