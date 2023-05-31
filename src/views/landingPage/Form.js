import React, { useEffect, useRef, useState } from "react";
import Climb from "../../assets/img/photo.png";
import swal from "sweetalert";

export default function Form() {
  const [file, setFile] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    // setAddDocumentModal({ ...addDocumentModal, [name]: value });
  };

  const uploadKTPPreview = (e) => {
    console.log(e);
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

  return (
    <>
      <div className="flex py-4 px-24 text-blue">
        <div className="bg-white flex rounded-lg shadow-form">
          <div className="lg:w-5/12 py-6 px-12 border-form">
            <label className="font-bold">How to borrow?</label>
            <table className="mt-2">
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
                  You will receive an email again if your loan has been approved
                  by the IMPEESA team and the items to be borrowed can be picked
                  up at the IMPEESA secretariat room.
                </td>
              </tr>
            </table>
            <img src={Climb} className="mt-2" />
          </div>
          <div className="lg:w-7/12 py-6 px-12">
            <label className="text-md font-bold">Name</label>
            <input
              type="text"
              name="name"
              //   value={addDocumentModal.username}
              onChange={handleChange}
              className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
              required={true}
              placeholder="Enter your name"
            />
            <label className="text-md font-bold">Organization</label>
            <input
              type="text"
              name="organization"
              //   value={addDocumentModal.password}
              onChange={handleChange}
              className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
              required={true}
              placeholder="IMPEESA Perbanas Institute"
            />
            <label className="text-md font-bold">Email</label>
            <input
              type="email"
              name="email"
              //   value={addDocumentModal.password}
              onChange={handleChange}
              className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
              required={true}
              placeholder="you@example.com"
            />
            <label className="text-md font-bold">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              //   value={addDocumentModal.password}
              onChange={handleChange}
              className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form-3"
              required={true}
              placeholder="081100011100"
            />
            <label className="text-md font-bold">Initial Term (day)</label>
            <input
              type="text"
              name="initial_term"
              //   value={addDocumentModal.password}
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
                  //   value={addDocumentModal.password}
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
                  //   value={addDocumentModal.password}
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
                // value={file}
                // id="upload-button2"
                // className="upload-file"
                style={{ display: "none" }}
                onChange={uploadKTPPreview}
                name="dokumen"
                // required={true}
              />
              <p className="text-center text-sm mt-7 font-600">
                <b>Click to upload</b> or drag and drop
              </p>
              <span className="keterangan">JPG, PNG, or PDF (max. 10mb)</span>
            </div>
            <div className="text-center my-2">
              <button className="upload-btn text-white px-12 py-1">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
