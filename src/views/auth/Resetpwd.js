import React, { /*useContext,*/ useState, useEffect } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router";
import cookies from "js-cookie";
export default function Resetpwd() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  //show/hide repassword
  const [repasswordShown, setrePasswordShown] = useState(false);
  const togglerePassword = () => {
    setrePasswordShown(!repasswordShown);
  };
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    token: "",
  });
  const handleChange = (event) => {
    let typeOfInput = event.target.value;
    let name = event.target.name;

    setValues({ ...values, [name]: typeOfInput });
  };

  useEffect(() => {
    const checkToken = async () => {
      const query = new URLSearchParams(window.location.search);
      const imel = query.get("u");
      const token = query.get("n");

      //console.log("api called");
      setLoading(true);
      let myHeaders = new Headers();
      myHeaders.append("Cookie", "REVEL_FLASH=");
      myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
      myHeaders.append("Content-Type", "application/json");

      fetch(process.env.REACT_APP_BACKEND_HOST + "/api/users/cekresetcode", {
        method: "POST",
        headers: myHeaders,
        credentials: "same-origin",
        body: JSON.stringify({
          email: imel,
          reset_code: token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          //console.log(res)
          setLoading(false);
          if (res.data === null) {
          }
          if (res.success === false) {
            swal({
              title: "Gagal!",
              text: "Reset Password Token tidak valid",
              icon: "warning",
            });
            history.push("/login");
          }
        });
    };
    checkToken();
  }, [history]);
  const [errors, setErrors] = useState({
    password: [],
    confirmPassword: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validatePassword = (password) => {
    const arr = [];
    if (password.length < 8) {
      arr.push("Kata sandi harus memiliki minimal 8 karakter");
    }
    if (!/\d/.test(password)) {
      arr.push("Kata sandi harus memiliki minimal 1 angka");
    }
    if (!/[A-Z]/.test(password)) {
      arr.push("Kata sandi harus memiliki minimal 1 karakter huruf besar");
    }
    if (!/[a-z]/.test(password)) {
      arr.push("Kata sandi harus memiliki minimal 1 karakter huruf kecil");
    }
    // if (!/[!@#$%^&*()_\-+={[}\]\\|:;"'<,>.]/.test(password)) {
    //   arr.push("Kata sandi harus memiliki minimal 1 karakter khusus/simbol");
    // }
    return arr;
  };
  const validates = () => {
    const errors = {
      password: [],
      confirmPassword: [],
    };

    errors.password = validatePassword(values.password);
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword.push("Kata sandi tidak sama");
    }
    setErrors({ ...errors });

    return errors.password.length || errors.confirmPassword.length
      ? false
      : true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit clicked");
    const query = new URLSearchParams(window.location.search);
    const imel = query.get("u");
    const token = query.get("n");
    // let pass = values.password;
    // let confpass = values.confirmPassword;
    //console.log(imel + pass + confpass);
    setLoading(true);
    if (validates()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }

    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    if (isFormValid === true) {
      await fetch(
        process.env.REACT_APP_BACKEND_HOST + "/api/users/password/update",
        {
          method: "POST",
          headers: myHeaders,
          credentials: "same-origin",
          body: JSON.stringify({
            email: imel,
            password: values.password,
            reset_code: token,
          }),
        }
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
              text: "Password berhasil diubah, silahkan coba login",
              icon: "success",
            });
            history.push("/login");
          }
          setLoading(false);
          return true;
        });
    }
    setLoading(false);
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
        <div className="flex content-center items-center justify-center">
          <div className="w-full lg:w-4/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 py-6 ">
                <div className="text-center text-3xl font-bold text-blue pt-6">
                  Reset Untuk Lupa Password
                </div>
                <div className="text-sm pt-2 pb-10 text-center">
                  {" "}
                  Silahkan masukan Password baru yang Anda inginkan disini.
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group relative w-full mb-3">
                    {errors.password.map((error, index) => (
                      <div
                        className="invalid-feedback flex items-center bg-red-500 text-white font-bold text-xtss px-4 py-2"
                        role="alert"
                        key={index}
                      >
                        <svg
                          className="fill-current w-3 h-3 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                        </svg>
                        {error}
                      </div>
                    ))}
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-1 border-0"
                      htmlFor="grid-password"
                    >
                      Kata Sandi
                    </label>
                    <input
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Kata Sandi"
                      className={
                        errors.password.length
                          ? "form-control is-invalid border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          : "form-control border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      id="password"
                      value={values.password}
                      onChange={handleChange}
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
                  </div>
                  <div className="form-group relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-1 border-0"
                      htmlFor="confirm-password"
                    >
                      Ketik Ulang Kata Sandi
                    </label>
                    <input
                      name="confirmPassword"
                      type={repasswordShown ? "text" : "password"}
                      placeholder="Ketik Ulang Kata Sandi"
                      className={
                        errors.confirmPassword.length
                          ? "form-control is-invalid border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          : "form-control border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      id="confirm-password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={togglerePassword}
                      className="showPass focus:outline-none"
                    >
                      <i
                        className={
                          repasswordShown ? "fa fa-eye-slash" : "fa fa-eye"
                        }
                      ></i>
                    </button>
                    {errors.confirmPassword.map((error, index) => (
                      <div
                        className="invalid-feedback text-xs text-red-500 mt-0"
                        key={index}
                      >
                        {error}
                      </div>
                    ))}
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