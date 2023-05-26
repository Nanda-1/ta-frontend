import React, { useContext } from "react";

// Context
import { UserContext } from "Context/UserContext";

export default function AddCollection() {
  const { addCollectionModal, setAddCollectionModal, createCollection } =
    useContext(UserContext);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddCollectionModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const create = () => {
    createCollection();
  };
  return (
    <>
      {addCollectionModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-960-d my-2 mx-auto mb-6 add-team-modal p-6">
              {/*content*/}
              <button
                className="text-white bg-blue rounded-full float-right focus:outline-none"
                style={{ padding: "1px 9px" }}
                onClick={() => setAddCollectionModal(false)}
              >
                X
              </button>
              <div className="relative flex flex-col w-full outline-none focus:outline-none">
                {/*body*/}
                <div className="relative flex-col px-10 text-blue font-inter">
                  <label className="text-xs font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={addCollectionModal.name}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Division</label>
                  <select
                    name="divisiId"
                    value={addCollectionModal.divisiId}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  >
                    <option selected>Select Division</option>
                    <option value="1">Panjang Tebing</option>
                    <option value="2">Gunung Hutan</option>
                    <option value="3">Selam</option>
                  </select>
                  <label className="text-xs font-bold">Jumlah</label>
                  <input
                    type="number"
                    name="jumlah"
                    value={addCollectionModal.jumlah}
                    onChange={handleChange}
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                  />
                  <label className="text-xs font-bold">Information</label>
                  <textarea
                    name="keterangan"
                    className="px-3 py-3 text-xs mb-2 focus:outline-none w-full login-form"
                    required={true}
                    value={addCollectionModal.keterangan}
                    onChange={handleChange}
                  ></textarea>
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
