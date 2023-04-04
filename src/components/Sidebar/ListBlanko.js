import { UserContext } from "Context/UserContext";
import React, { useContext, useState } from "react";
import ArrowUp from "../../assets/img/arrow-up.png";
import ArrowDown from "../../assets/img/arrow-down.png";

export default function ListBlanko() {
  const [active, setActive] = useState(false);
  const { functions } = useContext(UserContext);

  const { createDocumentAJB, createDocumentAPHT, createSuratKuasa } = functions;

  const pilihDok = (num) => {
    // alert(num)
    if (num === 0) {
      createSuratKuasa("pendaftaran_tanah_sistematis_lengkap");
    } else if (num === 1) {
      createSuratKuasa("surat_kuasa");
    } else if (num === 2) {
      createDocumentAJB();
    } else if (num === 3) {
      createDocumentAPHT();
    }
  };

  const listAkta = [
    {
      judul: "Pendaftaran Peralihan Hak Jual",
    },
    {
      judul: "Surat Kuasa",
    },
    {
      judul: "Akta Jual Beli",
    },
    {
      judul: "Akta Pemberian Hak Tanggungan",
    },
    {
      judul: "Akta Tukar Menukar",
    },
    {
      judul: "Akta Hibah",
    },
    {
      judul: "Akta Masuk ke Perusahaan",
    },
    {
      judul: "Akta Pembagian Hak Bersama",
    },
    {
      judul: "Akta Pemberian Hak Guna Bangunan",
    },
    {
      judul: "Surat Kuasa Membebankan Hak Tanggungan",
    },
  ];

  return (
    <>
      <div className="list-animation ml-1">
        {listAkta.slice(0, active ? listAkta.length : 3).map((item, index) => {
          return (
            <div className="w-full" key={index}>
              <button
                key={index}
                className="list-blanko text-xs text-left pt-2 ml-3 focus:outline-none"
                onClick={() => pilihDok(index)}
              >
                {item.judul}
              </button>
            </div>
          );
        })}
      </div>
      <hr className="mt-4 mx-auto sidebar-line" />
      <button
        className="list-akta-btn mx-auto w-full focus:outline-none"
        onClick={() => setActive(!active)}
      >
        <img
          src={!active ? ArrowDown : ArrowUp}
          className="mx-auto"
          alt="arrow"
        />
      </button>
    </>
  );
}
