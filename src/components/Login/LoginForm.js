/* eslint-disable jsx-a11y/alt-text */
import React, {  useState } from "react";
import { useHistory } from "react-router";
import ModalDokumen from "components/Modals/ModalDokumen";
import swal from "sweetalert";
import Gambar from "../../assets/img/login.png";
import Icon from "../../assets/img/impeesa_icon.png";

export default function LoginForm() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    nra: null,
    password: "",
  });

  const handleChange = (event) => {
    let typeOfInput = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: typeOfInput });
  };

  if (input.tlp?.includes("@")) {
    setInput({ ...input, nra: input.tlp, tlp: null });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    var formdata = new FormData();
    formdata.append("username", input.username);
    formdata.append("password", input.password);

    var myHeaders = {
      'Content-Type': 'application/json',
      'API.KEY': 'KkNEUgWfFlkQTPKqwFOnednwqOoIyjUKKcjCiMnQZRZBfJoIlh'
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(Object.fromEntries(formdata)),
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BACKEND_HOST + "/api/auth/login",
      // "http://localhost:8080/api/auth/login",
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          swal("Error", res.error, "error");
        } else {
          console.log("token", res.data.token)
          localStorage.setItem("token", res.data.token.access_token);
          setTimeout(() => {
            history.push("/admin/dashboard");
          }, 1000);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          swal("Error", "Internal Server Error", "error");
        }
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <div className="container mx-auto h-screen font-inter">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full px-1">
            <div className="relative min-w-0 break-words w-full grid grid-cols-2">
              <div className="mb-0">
                <img src={Gambar} />
              </div>
              <div className="mb-0 px-6">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3 mt-5">
                    <img src={Icon} width={70} className="mx-auto" />
                    <h5 className="text-center text-blue my-6">
                      Login as Admin
                    </h5>

                    <input
                      type="text"
                      name="username"
                      value={input.username}
                      onChange={handleChange}
                      className="px-3 py-3 text-sm mb-3 focus:outline-none w-full login-form"
                      required={true}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      name="password"
                      className="px-3 py-3 text-sm focus:outline-none w-full login-form"
                      value={input.password}
                      min="6"
                      onChange={handleChange}
                      required={true}
                      autoComplete="on"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center mt-6 mb-6">
                    <input
                      type="submit"
                      value="Login"
                      className="bg-blue text-white text-sm font-bold py-2 text-center rounded shadow outline-none focus:outline-none my-1 px-20"
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
