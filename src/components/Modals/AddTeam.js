import React, { useContext } from "react";

// Context
import { UserContext } from "Context/UserContext";

export default function AddTeam() {
  const { addDocumentModal, setAddDocumentModal, createTeams } =
    useContext(UserContext);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setAddDocumentModal({ ...addDocumentModal, [name]: value });
  };

  const create = () => {
    createTeams();
  };

  return (
    <>
      {addDocumentModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" w-960-d mt-6 mx-auto mb-6 add-team-modal p-6 absolute top-0">
              {/*content*/}
              <button
                className="text-white bg-blue rounded-full float-right focus:outline-none"
                style={{ padding: "1px 9px" }}
                onClick={() => setAddDocumentModal(false)}
              >
                X
              </button>
              <div className="relative flex flex-col w-full outline-none focus:outline-none">
                {/*body*/}

                <div className="relative flex-col px-10 text-blue font-inter">
                  <label className="text-xs font-bold">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={addDocumentModal.username}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={addDocumentModal.password}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Role</label>
                  <select
                    name="role_id"
                    value={addDocumentModal.role_id}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  >
                    <option selected>Select Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Anggota</option>
                  </select>
                  <label className="text-xs font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={addDocumentModal.name}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">NRA</label>
                  <input
                    type="text"
                    name="nra"
                    value={addDocumentModal.nra}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Division</label>
                  <input
                    type="text"
                    name="divisi"
                    value={addDocumentModal.divisi}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={addDocumentModal.phone_number}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={addDocumentModal.email}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={addDocumentModal.address}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                </div>
              </div>
              <div className="w-full text-center">
                <button
                  onClick={() => create()}
                  className="bg-blue text-white rounded-md my-3 py-1 px-10 text-sm focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
