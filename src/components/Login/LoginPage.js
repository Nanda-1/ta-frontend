import React, { useState } from "react";

export default function LoginPage() {
  // const history = useHistory();
  // const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [input, setInput] = useState({
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
    // setLoading(true);

    setTimeout(() => {
      // history.push("/admin/dashboard");
    }, 3000);
    // var noTlp = trim(input.tlp);
    // let pass = input.password.length;

    // if (pass < 8) {
    //   setError("Password Minimal 8 Karakter!");
    //   setLoading(false);
    // } else {
    //   // if (noTlp) {
    //   await fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "same-origin",
    //     body: JSON.stringify({
    //       phone_number: input.tlp,
    //       email: input.email,
    //       password: input.password,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       if (res.data === null) {
    //         if (res.error === "Wrong Password") {
    //           setError("Password yang anda masukkan salah!");
    //           setLoading(false);
    //         } else {
    //           setError(
    //             "Nomor Handphone Tidak Terdaftar. Silahkan melakukan pendaftaran terlebih dahulu."
    //           );
    //           setLoading(false);
    //         }
    //       } else if (res.success === "false") {
    //         swal("Gagal", res.error, "error");
    //         setLoading(false);
    //       } else if (res.data !== null && res.success !== true) {
    //         swal("Gagal", res.error, "error");
    //         setLoading(false);
    //       } else {
    //         let phone = res.data.user.phone_number;
    //         let id = res.data.user.user_id;
    //         // localStorage.setItem("dataUser", JSON.stringify(res.data));
    //         cookies.set("phone", phone, { expires: 1 });
    //         cookies.set("uid", id, { expires: 1 });
    //         cookies.set("tipe_otp", "login", { expires: 1 });
    //         history.push("/login_otp");
    //         setLoginStatus(true);
    //         setLoading(false);
    //         return true;
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.message === "Failed to fetch") {
    //         swal("Error 404", "Tidak Ada Koneksi Internet", "error");
    //       }
    //       setLoading(false);
    //     });
    // }
  };

  return (
    <>
      {/* {loading ? <ModalDokumen /> : null} */}
      <div className="container mx-auto h-screen font-inter">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-4/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-xl border-0">
              <div className="mb-0 px-8 py-2 bg-white rounded-xl">
                <div className="text-center text-3xl mt-2 font-bold text-blue">
                  {/* <img src={LogoIPPAT} width="25%" className="mx-auto" /> */}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3 mt-5">
                    <label
                      className="block text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      NRA :
                    </label>
                    <input
                      type="text"
                      name="nra"
                      value={input.nra}
                      onChange={handleChange}
                      className="px-3 py-3 text-sm focus:outline-none w-full login-form"
                      required={true}
                      placeholder="E.g. I288IP"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="px-3 py-3 text-sm focus:outline-none w-full login-form"
                      value={input.password}
                      min="6"
                      onChange={handleChange}
                      required={true}
                      autoComplete="on"
                      placeholder="Enter your password"
                    />
                    <div className="flex text-xs font-bold justify-between mt-5">
                      <div className="">
                        <input
                          type="checkbox"
                          className="focus:outline-none"
                          onClick={() => setRememberMe(!rememberMe)}
                        />{" "}
                        Ingat Saya
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        {/* <Link to="/forgotpwd" className="text-green">
                          Lupa Password?
                        </Link> */}
                      </label>
                    </div>
                  </div>
                  <div className="text-center mt-6 mb-6">
                    <input
                      type="submit"
                      value="Masuk"
                      className="bg-green text-white text-sm font-bold py-2 mt-1 text-center rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
