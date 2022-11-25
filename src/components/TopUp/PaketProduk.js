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
    console.log(nilai, kode);
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
    let name =
      id === "a95616a7-1a31-4adc-82e3-31c92b77b836"
        ? "paket1"
        : id === "2a1cf5d2-9088-4c08-9fc9-c88a29a2ca53"
        ? "paket2"
        : "paket3";

    let data =
      id === "a95616a7-1a31-4adc-82e3-31c92b77b836"
        ? count.paket1 + 1
        : id === "2a1cf5d2-9088-4c08-9fc9-c88a29a2ca53"
        ? count.paket2 + 1
        : count.paket3 + 1;

    setCount({ ...count, [name]: data });
    let hasil = total.pajak + tax;
    let totalHarga = total.harga + price;
    setTotal({ ...total, pajak: hasil, harga: totalHarga });
    addPaket(data, id);
  };

  const handleKurangPaket = (id, price, tax) => {
    let name =
      id === "a95616a7-1a31-4adc-82e3-31c92b77b836"
        ? "paket1"
        : id === "2a1cf5d2-9088-4c08-9fc9-c88a29a2ca53"
        ? "paket2"
        : "paket3";

    let data =
      id === "a95616a7-1a31-4adc-82e3-31c92b77b836"
        ? count.paket1 - 1
        : id === "2a1cf5d2-9088-4c08-9fc9-c88a29a2ca53"
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
        {listPaketQuota.map((el) => {
          return (
            <div className="doc-box p-4 mx-4" key={el.package_id}>
              <div className="font-bold text-xl">{el.package_name}</div>
              <div className="font-semibold mt-2 ml-4">
                {formatHarga(el.price)}
              </div>
              <div className="font-semibold ml-4">
                {el.emeterai_quota ? (
                  <>e-Meterai : {el.emeterai_quota}</>
                ) : null}
              </div>
              <div className="font-semibold ml-4">
                {el.ttd_quota ? <>Tanda Tangan : {el.ttd_quota}</> : null}
              </div>
              <div className="font-semibold ml-4">
                {el.eform_quota ? <>e-Form : {el.eform_quota}</> : null}
              </div>
              <div className="font-semibold mt-2 text-xs">
                Pajak Rp {el.tax}
              </div>
              <div className="mt-4 mx-auto w-full text-center">
                <button
                  className="focus:outline-none mr-4"
                  onClick={() =>
                    handleKurangPaket(el.package_id, el.price, el.tax)
                  }
                  disabled={
                    count.paket1 > 0 || count.paket1 > 0 || count.paket1 > 0
                      ? false
                      : true
                  }
                >
                  <i className="fa fa-minus bg-blue py-1 px-2 rounded-full text-white text-xxs"></i>
                </button>
                {el.package_id === "a95616a7-1a31-4adc-82e3-31c92b77b836" ? (
                  <>{count.paket1}</>
                ) : el.package_id === "2a1cf5d2-9088-4c08-9fc9-c88a29a2ca53" ? (
                  <>{count.paket2}</>
                ) : el.package_id === "6b33e6a0-291a-4e18-b3bb-514bf03ec100" ? (
                  <>{count.paket3}</>
                ) : null}
                <button
                  className="focus:outline-none ml-4"
                  onClick={() =>
                    handleTambahPaket(el.package_id, el.price, el.tax)
                  }
                >
                  <i className="fa fa-plus bg-blue py-1 px-2 rounded-full text-white text-xxs"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
