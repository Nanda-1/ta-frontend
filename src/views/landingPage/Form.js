/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Climb from "../../assets/img/photo.png";
import swal from "sweetalert";

export default function Form() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [, setLoading] = useState(false);
  const uploadFileInputRef = useRef(null);

  const handleFileSelect = () => {
    // Check if a file input element is available and trigger click only if it exists
    if (uploadFileInputRef.current) {
      uploadFileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onUpload([file]);
  };


  const uploadKTPPreview = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length) {
      onUpload(e.target.files);
    }
  };

  const removeFile = () => {
    setFilename(null);
    // Lakukan operasi lain yang diperlukan untuk menghapus file
  };

  const drop = useRef(null);

  useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setFilename(data.name);
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

    setLoading(true);

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
    await fetch("http://localhost:8070/api/peminjaman/create", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          swal("Error", res.error, "error");
        } else {
          console.log("token", res.data.token);
          // localStorage.setItem("token", res.data.token.access_token);
        }
        swal("Success", "Pemintaan Permohonan Berhasil Dikirim", "Success");
        // Clear form fields after successful submission
        setInput({
          name: "",
          email: "",
          asal_organisasi: "",
          phone_number: "",
          start_date: "",
          end_date: "",
          initial_day: "",
        });
        setFile(null);
      })
      .catch((err) => {
        console.log(err);
        if (err.response === 400) {
          swal("Error", "File tidak boleh kosong", "error");
        }
      })
      .finally(() => {
        setLoading(false); // Set isLoading back to false
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
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  ref={uploadFileInputRef}
                  name="file"
                  accept=".pdf"
                />
                {filename ? (
                  <div>
                    <p className="text-center text-sm mt-7 font-600">
                      {filename}
                    </p>
                    <button onClick={removeFile}>Remove</button>
                  </div>
                ) : (
                  <div>
                    <p className="text-center text-sm mt-7 font-600">
                      <button onClick={handleFileSelect}>
                        <b>Click to upload</b> or drag and drop
                      </button>
                    </p>
                  </div>
                )}
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
