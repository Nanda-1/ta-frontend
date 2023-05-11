import React from "react";

export default function ModalDokumen() {

  return (
    <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none"
        >
          <div className="relative w-auto mx-auto">
             <div className="lds-ellipsis bg-white rounded-md"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  );
}