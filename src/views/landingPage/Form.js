import React, { useEffect, useRef, useState } from "react";
import Climb from "../../assets/img/photo.png";
import swal from "sweetalert";

export default function Form() {
  const [file, setFile] = useState(null);

  const uploadKTPPreview = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length) {
      onUpload(e.target.files);
    }
  };

  const drop = useRef(null);

  useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    if (files && files.length) {
      onUpload(files);
    }
  };

  const onUpload = (files) => {
    const data = files[0];
    setFile(data);
  };

  console.log(file);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const [input, setInput] = useState({
    name: "",
    email: "",
    asal_organisasi: "",
    phone_number: "",
    start_date: "",
    end_date: "",
    initial_day: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log(input);
    // Validate date fields
    if (!input.start_date || !input.end_date) {
      swal("Error", "Please select start and end dates", "error");
      return;
    }
    var formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("email", input.email);
    formdata.append("asal_organisasi", input.asal_organisasi);
    formdata.append("file", file);
    formdata.append("phone_number", input.phone_number);
    formdata.append("start_date", input.start_date);
    formdata.append("end_date", input.end_date);
    formdata.append("initial_day", input.initial_day);

    var myHeaders = {
      "API.KEY": "KkNEUgWfFlkQTPKqwFOnsdaPOsdnopdnwqOoIyjUKKcjCiMnQZRZBfJoIlh",
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    console.log(requestOptions);
    await fetch(
      "http://localhost:8070/api/peminjaman/create",
      // process.env.REACT_APP_BACKEND_HOST + "/api/auth/login",
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          swal("Error", res.error, "error");
        } else {
          console.log("token", res.data.token);
          // localStorage.setItem("token", res.data.token.access_token);
        }
        // setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          swal("Error", "Internal Server Error", "error");
        }
        // setLoading(false);
      });
  };

  return (
    <>
      <div className="flex py-4 px-24 text-blue">
        <div className="bg-white flex rounded-lg shadow-form">
          <div className="lg:w-5/12 py-6 px-12 border-form">
            <label className="font-bold">How to borrow?</label>
            <table className="mt-2">
              <tbody>
                <tr>
                  <td valign="top">1.</td>
                  <td>Fill in your data in the form correctly.</td>
                </tr>
                <tr>
                  <td valign="top">2.</td>
                  <td>
                    After your data has been successfully uploaded, the IMPEESA
                    team will send you an email notification that your loan data
                    has been checked.
                  </td>
                </tr>
                <tr>
                  <td valign="top">3.</td>
                  <td>
                    You will receive an email again if your loan has been
                    approved by the IMPEESA team and the items to be borrowed
                    can be picked up at the IMPEESA secretariat room.
                  </td>
                </tr>
              </tbody>
            </table>
            <img src={Climb} alt="climb" className="mt-2" />
          </div>
          <div className="lg:w-7/12 py-6 px-12">
            <form onSubmit={handleSubmit}>
              <label className="text-md font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
                required={true}
                placeholder="Enter your name"
              />
              <label className="text-md font-bold">Organization</label>
              <input
                type="text"
                name="asal_organisasi"
                value={input.asal_organisasi}
                onChange={handleChange}
                className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
                required={true}
                placeholder="IMPEESA Perbanas Institute"
              />
              <label className="text-md font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
                required={true}
                placeholder="you@example.com"
              />
              <label className="text-md font-bold">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={input.phone_number}
                onChange={handleChange}
                className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
                required={true}
                placeholder="081100011100"
              />
              <label className="text-md font-bold">Initial Term (day)</label>
              <input
                type="text"
                name="initial_day"
                value={input.initial_day}
                onChange={handleChange}
                className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
                required={true}
                placeholder="3 days"
              />
              <div className="flex">
                <div className="flex-col w-full mr-12">
                  <label className="text-md font-bold">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={input.start_date}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
                    required={true}
                    placeholder="Select date"
                  />
                </div>
                <div className="flex-col w-full">
                  <label className="text-md font-bold">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={input.end_date}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs focus:outline-none w-full login-form-3 mb-3"
                    required={true}
                    placeholder="Select date"
                  />
                </div>
              </div>
              <label className="text-md">
                <b>Upload and attach file</b> your loan letter from your
                organization
              </label>
              <div className="upload-file text-center text-xs mt-2" ref={drop}>
                <input
                  type="file"
                  // value={input.file}
                  // id="upload-button2"
                  // className="upload-file"
                  style={{ display: "none" }}
                  onChange={uploadKTPPreview}
                  name="file"
                  // required={true}
                />
                <p className="text-center text-sm mt-7 font-600">
                  <b>Click to upload</b> or drag and drop
                </p>
                <span className="keterangan">PDF (max. 5mb)</span>
              </div>
              <div className="text-center my-2">
                <button
                  type="submit"
                  className="upload-btn text-white px-12 py-1"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
