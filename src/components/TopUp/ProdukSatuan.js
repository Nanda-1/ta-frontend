import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";

export default function ProdukSatuan() {
  const {
    produk,
    produkSatuan,
    count,
    setCount,
    total,
    setTotal,
    item,
    setItem,
  } = useContext(TopUpContext);

  useEffect(() => {
    produk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addForm = (nilai, type) => {
    if (nilai > 0) {
      const arr = item.filter((item) => item.quota_name !== type);
      setItem(arr);
      setItem((item) => [...item, { quota_name: type, quota_quantity: nilai }]);
    } else {
      const arr = item.filter((item) => item.quota_name !== type);
      setItem(arr);
    }
  };

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  const tambahNilai = (type, harga, pajak) => {
    let data =
      type === "eform"
        ? count.eform + 1
        : type === "ttd"
        ? count.ttd + 1
        : count.emeterai + 1;

    setCount({ ...count, [type]: data });

    let hasil = total.pajak + Number(pajak);
    let totalHarga = total.harga + Number(harga);
    setTotal({ ...total, pajak: hasil, harga: totalHarga });

    addForm(data, type);
  };

  const kurangNilai = (type, harga, pajak) => {
    let data =
      type === "eform"
        ? count.eform - 1
        : type === "ttd"
        ? count.ttd - 1
        : count.emeterai - 1;

    setCount({ ...count, [type]: data });

    let hasil = total.pajak - Number(pajak);
    let totalHarga = total.harga - Number(harga);
    setTotal({ ...total, pajak: hasil, harga: totalHarga });

    addForm(data, type);
  };

  return (
    <>
      <label className="font-bold text-xl">Produk Satuan</label>
      <div className="grid grid-cols-3 mt-2 text-grey w-full">
        {produkSatuan.map((el, index) => {
          return (
            <div className="doc-box p-4 mx-4" key={index}>
              <div className="font-bold text-xl" key={index}>
                {el.product_name === "eform"
                  ? "Blangko"
                  : el.product_name === "ttd"
                  ? "Tanda tangan"
                  : "e-Meterai"}
              </div>
              <div className="font-semibold mt-2 ml-4">
                {formatHarga(Number(el.product_price))}
              </div>
              <div className="font-semibold mt-2 ml-4 text-xs">
                Pajak {formatHarga(Number(el.product_tax))}
              </div>
              <div className="mt-4 mx-auto w-full text-center">
                <button
                  className="focus:outline-none mr-4"
                  onClick={() =>
                    kurangNilai(
                      el.product_name,
                      el.product_price,
                      el.product_tax
                    )
                  }
                  disabled={
                    count.eform > 0 || count.ttd > 0 || count.emeterai > 0
                      ? false
                      : true
                  }
                >
                  <i className="fa fa-minus bg-blue py-1 px-2 rounded-full text-white text-xxs"></i>
                </button>
                {el.product_name === "eform" ? (
                  <>{count.eform}</>
                ) : el.product_name === "ttd" ? (
                  <>{count.ttd}</>
                ) : (
                  <>{count.emeterai}</>
                )}
                <button
                  className="focus:outline-none ml-4"
                  onClick={() =>
                    tambahNilai(
                      el.product_name,
                      el.product_price,
                      el.product_tax
                    )
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
