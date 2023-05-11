import React, { useContext } from "react";

// Context
import { UserContext } from "Context/UserContext";

export default function UpdateApproval() {
  const { addBorrowModal, setAddBorrowModal } = useContext(UserContext);

  return (
    <>
      {addBorrowModal ? (
        <>
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
                      <span>05/05/2023</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        Name
                      </label>
                      <br />
                      <span>Rinanda Soelaiman</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        Initial Term
                      </label>
                      <br />
                      <span>3 days</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        Organization
                      </label>
                      <br />
                      <span>Impeesa</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        Start Date
                      </label>
                      <br />
                      <span>06/05/2023</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        Phone Number
                      </label>
                      <br />
                      <span>08130144420</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        End Date
                      </label>
                      <br />
                      <span>09/05/2023</span>
                    </div>
                    <div>
                      <label className="text-md text-blue-2 font-bold">
                        Email
                      </label>
                      <br />
                      <span>rinandasoe@gmail.com</span>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-blue text-white shadow-sm py-1 my-3">Download File Document ↓</button>
                  <div className="flex justify-evenly py-6">
                    <button className="py-2 px-10 rounded-xl bg-red text-white text-sm">
                      REJECT
                    </button>
                    <button className="bg-green text-white rounded-xl py-2 px-8 text-sm">
                      APPROVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
