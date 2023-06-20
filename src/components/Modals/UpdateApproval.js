import React, { useState, useEffect, useContext } from "react";

// Context
import { UserContext } from "Context/UserContext";

export default function UpdateApproval({ id }) {
  const {
    addBorrowModal,
    setAddBorrowModal,
    GetAllBorrow,
    Borrowlist,
    GetFiles,
    SendStatuMail,
  } = useContext(UserContext);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);

  useEffect(() => {
    if (!limitExceeded) {
      GetAllBorrow();
      setLimitExceeded(true);
    }
  }, [limitExceeded, GetAllBorrow]);

  const handleApprove = (id) => {
    setLoading(true);
    SendStatuMail(id, "approve");
    setUpdateComplete(true);
  };

  const handleReject = (id) => {
    setLoading(true);
    SendStatuMail(id, "reject");
    setUpdateComplete(true);
  };

  return (
    <>
      {addBorrowModal && (
        <>
          {updateComplete && (
            <p className="text-green-500 text-sm mt-2">
              Process completed. Page updated.
            </p>
          )}
          {Borrowlist.filter((items) => items.id === id).map((item, index) => (
            <div key={index} style={{ fontSize: "12px" }}>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-5/12  my-2 mx-auto mb-6">
                  {/*content*/}
                  <div className="updateApprovalModal relative flex flex-col w-full outline-none focus:outline-none">
                    {/*body*/}
                    <div className="relative p-2 flex-col text-black font-inter px-6">
                      <div className="flex justify-between align-center">
                        <h2 className="text-lg font-bold py-4 uppercase text-blue-2">
                          PENDING APPROVAL
                        </h2>
                        <p
                          className="cursor-pointer bg-blue text-white rounded-full px-2 py-1 text-xs"
                          onClick={() => setAddBorrowModal(false)}
                        >
                          X
                        </p>
                      </div>
                      <div className="grid grid-cols-2">
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Date
                          </label>
                          <br />
                          <span>{item.created_at}</span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Name
                          </label>
                          <br />
                          <span>{item.name}</span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Initial Term
                          </label>
                          <br />
                          <span>
                            {item.peminjamans && item.peminjamans.length > 0
                              ? item.peminjamans[0].initial_day
                              : ""}
                          </span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Organization
                          </label>
                          <br />
                          <span>{item.asal_organisai}</span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Start Date
                          </label>
                          <br />
                          <span>
                            {item.peminjamans && item.peminjamans.length > 0
                              ? item.peminjamans[0].start_date
                              : ""}
                          </span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Phone Number
                          </label>
                          <br />
                          <span>{item.phone_number}</span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            End Date
                          </label>
                          <br />
                          <span>
                            {item.peminjamans && item.peminjamans.length > 0
                              ? item.peminjamans[0].end_date
                              : ""}
                          </span>
                        </div>
                        <div>
                          <label className="text-md text-blue-2 font-bold">
                            Email
                          </label>
                          <br />
                          <span>{item.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => GetFiles(item.id)}
                        className="w-full rounded-lg bg-blue text-white shadow-sm py-1 my-3"
                      >
                        Download File Document ↓
                      </button>
                      <div className="flex justify-evenly py-6">
                        <button
                          onClick={() => handleReject(item.id)}
                          className="py-2 px-10 rounded-xl bg-red text-white text-sm"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "REJECT"}
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="bg-green text-white rounded-xl py-2 px-8 text-sm"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "APPROVE"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
