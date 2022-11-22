import React, { useContext, useEffect, useState } from "react";
import { DokumenContext } from "Context/DokumenContext";

export default function BpnInfo() {
  const { allUsers, functions, listData } = useContext(DokumenContext);
  const [rankPpat, setRankPpat] = useState(1);

  const { getCountUsers, listTransaksi } = functions;

  useEffect(() => {
    listTransaksi();
    getCountUsers();
    // getDocBaru('draft')
    getDocPending();
    getDocSelesai();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDocBaru = (status) => {
    let bigCities = listData.filter(function (e) {
      return e.doc_status === status;
    });
    return bigCities.length;
  };

  const getDocPending = (status) => {
    let bigCities = listData.filter(function (e) {
      return e.doc_status !== status;
    });
    return bigCities.length;
  };

  const getDocSelesai = (status) => {
    let bigCities = listData.filter(function (e) {
      return e.doc_status === status;
    });
    return bigCities.length;
  };

  const ppatTeratas = [
    {
      text1: "Kantor Pertanahan Kota Administrasi Jakarta Pusat",
      text2: "Kantor Pertanahan Kota Administrasi Jakarta Selatan",
      text3: "Kantor Pertanahan Kota Administrasi Jakarta Barat",
      text4: "Kantor Pertanahan Kota Administrasi Kota Bogor",
      text5: "Kantor Pertanahan Kabupaten Bogor",
    },
  ];

  const ppatTerbawah = [
    {
      text1: "Kantor Pertanahan Kota Subang",
      text2: "Kantor Pertanahan Kabupaten Pidie",
      text3: "Kantor Pertanahan Kota Langsa",
      text4: "Kantor Pertanahan Gayo Lues",
      text5: "Kantor Pertanahan Kota Subulussalam",
    },
  ];

  return (
    <>
      <div className="relative text-white font-montserrat w-full">
        <div className="w-full grid grid-cols-3 text-3xl align-middle">
          <div className="doc-baru rounded-md px-4 py-4 font-bold m-2">
            {listData ? getDocBaru("draft") : "0"} Dokumen Baru
            <div className="text-xs text-red-300 pt-6">
              Dokumen Baru Yang Masuk
            </div>
          </div>
          <div className="doc-tertunda rounded-md px-4 py-4 font-bold m-2">
            {listData ? getDocPending("draft", "selesai") : "0"} Dokumen Pending
            <div className="text-xs text-yellow-200 pt-6">
              Dokumen Tertunda Hari Ini
            </div>
          </div>
          <div className="doc-setuju rounded-md px-4 py-4 font-bold m-2">
            {listData ? getDocSelesai("selesai") : "0"} Dokumen Disetujui
            <div className="text-xs text-green-200 pt-6">
              Dokumen Disetujui Hari Ini
            </div>
          </div>
        </div>
      </div>
      <div className="relative text-white font-montserrat w-full">
        <div className="w-full grid grid-cols-4 text-3xl">
          <div className="count-ppat rounded-md px-4 py-4 font-bold m-2">
            {allUsers ? allUsers : 0} PPAT Terdaftar
            <div className="text-xs count-ppat-2 text-semiblack pt-6">
              Jumlah Nasional PPAT Telah Mendaftar.
            </div>
          </div>
          <div className="count-user rounded-md px-4 py-4 font-bold m-2">
            17 User Aktif Hari ini
            <div className="text-xs count-user-2 text-blue-600 pt-6">
              Jumlah Total User Aktif Hari Ini
            </div>
          </div>
          <div className="rounded-md top-ppat text-black m-2 col-span-2">
            <table>
              <tbody>
                <tr>
                  <td width="230">
                    <button
                      className={
                        rankPpat === 1
                          ? "px-2 ml-2 text-xs font-semibold bg-purple rounded-md py-2 focus:outline-none text-white"
                          : "px-2 ml-2 text-xs font-semibold focus:outline-none"
                      }
                      onClick={() => setRankPpat(1)}
                    >
                      5 Kantor Pertahanan Teratas
                    </button>
                    <br />
                    <button
                      className={
                        rankPpat === 2
                          ? "px-2 ml-2 text-xs font-semibold bg-purple rounded-md py-2 focus:outline-none text-white"
                          : "px-2 ml-2 text-xs font-semibold focus:outline-none"
                      }
                      onClick={() => setRankPpat(2)}
                    >
                      5 Kantor Pertahanan Terbawah
                    </button>
                  </td>
                  <td>
                    {rankPpat === 1 ? (
                      <>
                        {ppatTeratas.map((item) => {
                          return (
                            <div className="text-xs pt-2 text-bold" key={1}>
                              <ol className="list-decimal-ket">
                                <li key={"2"}>{item.text1}</li>
                                <li key={"3"}>{item.text2}</li>
                                <li key={"4"}>{item.text3}</li>
                                <li key={"5"}>{item.text4}</li>
                                <li key={"6"}>{item.text5}</li>
                              </ol>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {ppatTerbawah.map((item) => {
                          return (
                            <div className="text-xs pt-2 text-bold" key={1}>
                              <ol className="list-decimal-ket">
                                <li key={"2"}>{item.text1}</li>
                                <li key={"3"}>{item.text2}</li>
                                <li key={"4"}>{item.text3}</li>
                                <li key={"5"}>{item.text4}</li>
                                <li key={"6"}>{item.text5}</li>
                              </ol>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
