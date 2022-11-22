import React, { /*useContext,*/ useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router";
import cookies from "js-cookie";

export default function Forgotpwd() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    let typeOfInput = event.target.value;
    let name = event.target.name;
    setInput({ ...input, [name]: typeOfInput });
  };
  const [input, setInput] = useState({
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    //eslint-disable-next-line
    // var pattern = new RegExp(/^\s+|\s+$/g, "");
    // var pattern = new RegExp(/^[0-9\b]+$/);
    var pattern = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!pattern.test(input.email)) {
      setLoading(false);
      swal({
        title: "Gagal!",
        text: "Email Tidak Valid",
        icon: "warning",
      });

      return false;
    } else {
    }

    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: JSON.stringify({
        email: input.email,
      }),
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BACKEND_HOST + "/api/users/resetpassword",
      requestOptions
    )
      // console.log(res.status)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.data === null) {
        }
        if (res.success === false) {
          swal({
            title: "Gagal!",
            text: "Email Tidak Terdaftar",
            icon: "warning",
          });
        }
        if (res.success === true) {
          swal({
            title: "Sukses!",
            text: "Cek Email anda, link untuk Reset Password sudah dikirim",
            icon: "success",
          });
          input.email = "";
          history.push("/login");
        }
        setLoading(false);
        return true;
      });
  };
  return (
    <>
      {" "}
      {loading ? (
        <>
          <div className="spinner"></div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-4/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 py-6 ">
                <div className="text-center text-3xl font-bold text-blue pt-6">
                  Lupa Password
                </div>
                <div className="text-sm pt-2 pb-10 text-center">
                  {" "}
                  Silahkan masukkan email Anda yang telah Terdaftar. Link untuk
                  mengatur ulang password akan kami kirimkan melalui email.
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
                      required={true}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <input
                      type="submit"
                      value="Kirim Reset Password"
                      className="bg-blue text-white text-sm font-bold py-2 mt-1 text-center rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
