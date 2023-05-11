import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import cookies from "js-cookie";
import { RegistContext } from "./RegistContext";
import swal from "sweetalert";
import ModalDokumen from "components/Modals/ModalDokumen";

export default function Register() {
  const history = useHistory();

  //Show Error
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  //Show Spinner
  const [load, setLoad] = useState(false);

  //show/hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  //show/hide repassword
  const [repasswordShown, setrePasswordShown] = useState(false);
  const togglerePassword = () => {
    setrePasswordShown(!repasswordShown);
  };

  //Save to Context
  const { regist, setRegist, setStatus, apiRegist } = useContext(RegistContext);

  // eslint-disable-next-line no-unused-vars
  const [isFormValid, setIsFormValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  //validasi email//
  const changeHandle = (e) => {
    if (!regist["email"] || regist["email"] !== "") {
      var patternd = new RegExp(/\S+@\S+\.\S+/);
      if (!patternd.test(regist["email"])) {
        setErrorEmail(true);
      } else {
        setErrorEmail(false);
      }
    } else if (typeof valuesPhone.phone !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(valuesPhone.phone)) {
        setErrorPhone(true);
      } else if (valuesPhone.phone.length !== 10) {
        setErrorPhone(true);
      } else {
        setErrorPhone(false);
      }
    } else {
      setErrorPhone(false);
      setErrorEmail(false);
    }

    let isian = e.target.value;
    let formIsian = e.target.name;
    setRegist({ ...regist, [formIsian]: isian });
  };

  const validatePhone = (phone) => {
    let phones = String(phone).trim();
    const arr = [];
    if (phones.startsWith("+62") || phones.startsWith("62")) {
      arr.push("Format No.handphone salah");
    }
    if (phone.length <= 6) {
      arr.push("No.handphone harus memiliki minimal 7 karakter");
    }
    if (phone.length >= 14) {
      arr.push("No.handphone harus memiliki maksimal 13 karakter");
    }
    if (!/^[0-9\b]+$/.test(phone)) {
      arr.push("No.handphone tidak valid");
    }
    return arr;
  };

  // eslint-disable-next-line no-unused-vars
  const [valuesPhone, setValuesPhone] = useState({
    phone: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [errorp, setErrorp] = useState({
    phone: [],
  });

  const phoneHandle = () => {
    // const errorp = {
    //   phone: []
    // };

    errorp.phone = validatePhone(valuesPhone.phone);
    setErrorp({ ...errorp });

    return errorp.phone.length ? false : true;
  };

  //validasi password//
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
    if (!/[!@#$%^&*()_\-+={[}\]\\|:;"'<,>.]/.test(password)) {
      arr.push("Kata sandi harus memiliki minimal 1 karakter khusus/simbol");
    }
    return arr;
  };

  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({
    password: [],
    confirmPassword: [],
  });

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

  const addRegistAPI = async (event) => {
    event.preventDefault();
    cookies.remove("token");
    if (phoneHandle()) {
      setIsValid(true);
    } else {
      setIsValid(false);
      swal({
        title: "Gagal!",
        text: "No.Handphone tidak valid",
        icon: "warning",
      });
    }

    if (validates()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      swal({
        title: "Gagal!",
        text: "Password tidak sesuai",
        icon: "warning",
      });
    }

    setLoad(false);

    if (isValid === true && isFormValid === true) {
      swal({
        title: "Perhatian",
        text: "Pastikan Anda mengisikan alamat email dan nomor handphone dengan baik dan benar. Karena data tersebut tidak dapat diubah dan akan digunakan sebagai alat autentikasi tanda tangan digital Anda.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((OK) => {
        if (OK) {
          setLoad(true);
          try {
            fetch(apiRegist, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "same-origin",
              body: JSON.stringify({
                email: regist.email,
                phone_number: valuesPhone.phone,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                setLoad(false);

                let data = res.data;
                let sukses = res.success;

                if (data === null) {
                  swal({
                    title: "Gagal!",
                    text:
                      res.error === "Phone Used"
                        ? "No. Handphone sudah terdaftar"
                        : res.error === "Email Used"
                        ? "Email sudah terdaftar"
                        : res.error === "phone not valid"
                        ? "No. Handphone tidak valid"
                        : res.error,
                    icon: "warning",
                  });
                } else if (sukses === false) {
                  swal({
                    title: "Error!",
                    text: res.error,
                    icon: "error",
                  });
                  setLoad(false);
                } else {
                  swal("Berhasil", res.data.message, "success");
                  cookies.set("uid", res.data.user.user_id, { expires: 1 });
                  const userObject = res.data.user;
                  const lsValue = JSON.stringify(userObject);
                  //simpan info akun dari respon google ke localstorage
                  localStorage.setItem("user-info", lsValue);
                  // setInputRegist({ ...inputRegist, [id]: getID });
                  history.push("/modal2");
                  setStatus(true);
                  return true;
                }
              })
              .catch((res) => {
                setLoad(false);
              });
          } catch (res) {
            swal("Error", res.message, "error");
          }
        }
      });
    }
  };

  return (
    <>
      {load === true ? <ModalDokumen /> : null}
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-4/12">
            <div className=" bg-white relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center">
                  <h1 className="text-blue text-xxl font-bold mt-4 mb-4">
                    Registrasi Akun
                  </h1>
                </div>
              </div>
              <div className="container px-4 mx-auto">
                {errorp.phone.map((error, index) => (
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
                {errorEmail === true ? (
                  <div
                    className="flex items-center bg-red-500 text-white font-bold text-xtss px-4 py-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-3 h-3 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p className="text-xtss">Harap masukan e-mail Anda</p>
                  </div>
                ) : null}
                {errorPhone === true ? (
                  <div
                    className="flex items-center bg-red-500 text-white font-bold text-xtss px-4 py-2"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-3 h-3 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p className="text-xtss">Harap masukan no.handphone Anda</p>
                  </div>
                ) : null}
                <form onSubmit={addRegistAPI}>
                  {" "}
                  <div className="relative w-full mb-3 mt-3">
                    <label className="block text-blueGray-600 text-xs font-bold mb-1">
                      E-Mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="E-Mail"
                      value={regist.email || ""}
                      onChange={changeHandle}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-xs font-bold mb-1"
                      htmlFor="grid-password"
                    >
                      No. Handphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      // className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="No. Handphone (contoh: 08xxxxx)"
                      value={valuesPhone.phone || regist.phone || ""}
                      // onChange={changeHandle}
                      className={`form-control border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.phone ? " is-invalid" : null
                      }`}
                      onChange={(e) =>
                        setValuesPhone({
                          ...valuesPhone,
                          phone: e.target.value,
                        })
                      }
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="form-group relative w-full mb-3">
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
                      id="password"
                      value={values.password}
                      autoComplete="true"
                      className={`form-control border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.password.length ? " is-invalid" : null
                      }`}
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                      required
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
                      className={`form-control border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.password.length ? " is-invalid" : null
                      }`}
                      id="confirm-password"
                      value={values.confirmPassword}
                      autoComplete="true"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
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
                    {/* {errors.confirmPassword.map((error, index) => (
                      <div
                        className="invalid-feedback text-xs text-red-500 mt-0"
                        key={index}
                      >
                        {error}
                      </div>
                    ))} */}
                  </div>
                  <div className="text-center mt-6">
                    <input
                      type="Submit"
                      value="Buat Akun"
                      onChange={addRegistAPI}
                      className="cursor-pointer bg-blue text-white active:bg-sky-500 text-sm font-bold px-6 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </form>
              </div>
              <span className="ml-2 text-xs font-semibold text-blueGray-600 text-center mb-4">
                Sudah mendaftar?{" "}
                <a href="/login" className="text-blue mb-4 text-xs">
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
