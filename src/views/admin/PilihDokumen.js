import React, { useContext, useState } from "react";
import { UserContext } from "Context/UserContext";
import { useHistory } from "react-router";

import BackIcon from "assets/img/icon/003-previous@2x.png";

export default function PilihDokumen() {
  const { functions } = useContext(UserContext);
  const [active, setActive] = useState(0);

  const { createDocumentAJB, createDocumentAPHT } = functions;

  let history = useHistory();

  const pilihDok = (num) => {
    if (num === 1) {
      createDocumentAJB();
    } else if (num === 2) {
      createDocumentAPHT();
    }
  };

  const listAkta = [
    {
      id: 1,
      judul: "Akta Jual Beli",
    },
    {
      id: 2,
      judul: "Akta Pemberian Hak Tanggungan",
    },
    {
      id: 3,
      judul: "Akta Tukar Menukar",
    },
    {
      id: 4,
      judul: "Akta Hibah",
    },
    {
      id: 5,
      judul: "Akta Masuk ke Perusahaan",
    },
    {
      id: 6,
      judul: "Akta Pembagian Hak Bersama",
    },
    {
      id: 7,
      judul: "Akta Pemberian Hak Guna Bangunan",
    },
    {
      id: 8,
      judul: "Surat Kuasa Membebankan Hak Tanggungan",
    },
  ];

  return (
    <div className="relative break-words font-montserrat mx-32 my-10 cursor-default">
      <div
        className={
          "relative font-bold box-content px-10 py-12 history-shadow rounded-sm"
        }
      >
        <div className="flex text-green2 text-bold-800 text-5xl ml-4">
          <img
            src={BackIcon}
            width="75"
            className="mr-4 py-2 cursor-pointer"
            onClick={() => history.goBack()}
            alt="back"
          />
          BLANGKO <br /> AKTA PPAT
        </div>
        <div className="grid grid-cols-3 mt-8 text-grey w-full">
          {listAkta.map((el, index) => {
            return (
              <button
                className={
                  "text-xl text-left text-bold-800 rounded-lg m-4 py-1 px-4 pt-16 focus:outline-none " +
                  (active !== el.id ? "mb-4 doc-box " : "mb-1 doc-box-active ")
                }
                onClick={
                  active === el.id
                    ? () => pilihDok(el.id)
                    : () => setActive(el.id)
                }
                key={index}
              >
                {active === el.id ? "Buat " + el.judul : el.judul}
                <div className="text-xs pb-6 text-bold pt-2">
                  {active === el.id
                    ? "Klik untuk membuat " + el.judul
                    : "Anda dapat membuat " +
                      el.judul +
                      " Digital dengan lebih aman, mudah dan cepat."}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
