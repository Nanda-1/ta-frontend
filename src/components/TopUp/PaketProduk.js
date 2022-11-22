import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";

export default function PaketProduk() {
  const {
    listPaketQuota,
    count,
    setCount,
    total,
    setTotal,
    item,
    setItem,
    paketKuota,
  } = useContext(TopUpContext);

  useEffect(() => {
    paketKuota();
  }, []);

  const addPaket = (nilai, kode) => {
    if (nilai > 0) {
      const arr = item.filter((item) => item.package_id !== kode);
      setItem(arr);
      setItem((item) => [
        ...item,
        { package_id: kode, package_quantity: nilai },
      ]);
    } else {
      const arr = item.filter((item) => item.package_id !== kode);
      setItem(arr);
    }
  };

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  const handleTambahPaket = (id, price, tax) => {
    let name = id === 4 ? "paket1" : id === 3 ? "paket2" : "paket3";
    let data =
      id === 4
        ? count.paket1 + 1
        : id === 3
        ? count.paket2 + 1
        : count.paket3 + 1;

    setCount({ ...count, [name]: data });
    let hasil = total.pajak + tax;
    let totalHarga = total.harga + price;
    setTotal({ ...total, pajak: hasil, harga: totalHarga });
    addPaket(data, id);
  };

  const handleKurangPaket = (id, price, tax) => {
    let name = id === 4 ? "paket1" : id === 3 ? "paket2" : "paket3";
    let data =
      id === 4
        ? count.paket1 - 1
        : id === 3
        ? count.paket2 - 1
        : count.paket3 - 1;

    setCount({ ...count, [name]: data });
    let hasil = total.pajak - tax;
    let totalHarga = total.harga - price;
    setTotal({ ...total, pajak: hasil, harga: totalHarga });
    addPaket(data, id);
  };

  return (
    <>
      <p className="font-bold text-xl mt-6">Paket Produk</p>
      <div className="grid grid-cols-3 mt-2 text-grey w-full">
        {listPaketQuota.map(
          ({
            package_name,
            eform_quota,
            ematerai_quota,
            id,
            price,
            ttd_quota,
            tax,
          }) => {
            return (
              <div className="doc-box p-4 mx-4" key={id}>
                <div className="font-bold text-xl">{package_name}</div>
                <div className="font-semibold mt-2 ml-4">
                  {formatHarga(price)}
                </div>
                <div className="font-semibold ml-4">
                  {ematerai_quota ? <>e-Meterai : {ematerai_quota}</> : null}
                </div>
                <div className="font-semibold ml-4">
                  {ttd_quota ? <>Tanda Tangan : {ttd_quota}</> : null}
                </div>
                <div className="font-semibold ml-4">
                  {eform_quota ? <>e-Form : {eform_quota}</> : null}
                </div>
                <div className="font-semibold mt-2 text-xs">Pajak Rp {tax}</div>
                <div className="mt-4 mx-auto w-full text-center">
                  <button
                    className="focus:outline-none mr-4"
                    onClick={() => handleKurangPaket(id, price, tax)}
                    disabled={
                      count.paket1 > 0 || count.paket1 > 0 || count.paket1 > 0
                        ? false
                        : true
                    }
                  >
                    <i className="fa fa-minus bg-blue py-1 px-2 rounded-full text-white text-xxs"></i>
                  </button>
                  {id === 4 ? (
                    <>{count.paket1}</>
                  ) : id === 3 ? (
                    <>{count.paket2}</>
                  ) : (
                    <>{count.paket3}</>
                  )}
                  <button
                    className="focus:outline-none ml-4"
                    onClick={() => handleTambahPaket(id, price, tax)}
                  >
                    <i className="fa fa-plus bg-blue py-1 px-2 rounded-full text-white text-xxs"></i>
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}
