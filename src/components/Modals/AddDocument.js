import React, { useContext, useState } from "react";

// Context
import { UserContext } from "Context/UserContext";

export default function ModalAddDocument() {
    const { addDocumentModal, setAddDocumentModal, functions } = useContext(UserContext);
    const [kateroriDokumen] = useState([
      {
        title: 'Akta Jual Beli'
      },
      {
        title: 'Akta Pemberian Hak Tanggungan'
      },
      {
        title: 'Surat Pernyataan'
      },
      {
        title: 'Kwitansi'
      },
      {
        title: 'Dokumen Tunggal'
      },
      {
        title: 'Dokumen Lain'
      }
    ])

    const { createDocumentAJB, createDocumentAPHT } = functions

    const handleButton = (e) => {
      let namaDokumen = e.target.value;

      // window.location.reload();
      if(namaDokumen === 'Akta Jual Beli'){
        createDocumentAJB()
        // window.location.reload();
      }else if(namaDokumen === 'Akta Pemberian Hak Tanggungan'){
        createDocumentAPHT()
      }
      setAddDocumentModal(false)
    }

  return (
    <>
      {addDocumentModal ? (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          // onClick={() => setAddDocumentModal(false)}
        >
          <div className="relative w-auto my-2 mx-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-2 flex-col text-blue font-roboto">
                <h2 className="text-center text-2xl font-bold py-4">Blangko Akta PPAT</h2>
                <div className="grid grid-cols-3 py-2 px-2">
                {kateroriDokumen.map((item) => {
                  return(
                    // <Link to={`/admin/createDocument/${item.title}`}
                    // // className="box-content border cursor-pointer hover:addDokumen text-xs text-center my-2 mx-2 py-4 border-blue rounded"
                    // onClick={handleButton}
                    // >
                      <button 
                        className="box-content border cursor-pointer hover:addDokumen text-xs text-center my-2 mx-2 py-4 px-6 border-blue rounded"
                        onClick={handleButton}
                        key={item.title}
                        value={item.title}
                      >
                          {item.title}
                      </button>
                        // </Link>
                  )
                })}
                </div>
              </div>
            </div>
              <button
                className="text-blue float-right text-xs bg-white mt-2 border-blue rounded-lg background-transparent font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setAddDocumentModal(false)}
              >
                Batalkan
              </button>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null}
    </>
  );
}