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
    return "Rp" + parts.join(",");
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
    <div className="font-sans">
      <label className="font-bold text-lg">Produk Satuan</label>
      {produkSatuan.length === 0 ? (
        <div className="text-center my-3 text-sm text-grey">Tidak Ada Produk</div>
      ) : (
        <div className="grid grid-cols-3 mt-2 text-grey w-full">
          {produkSatuan.map((el, index) => {
            return (
              <div
                className={`card-shadow border-grey-3 rounded-lg px-6 py-4 ${
                  index !== produkSatuan.length ? "mr-4" : null
                }`}
                key={index}
              >
                <div
                  className="font-bold text-sm text-600 text-black"
                  key={index}
                >
                  {el.product_name === "eform"
                    ? "Blangko"
                    : el.product_name === "ttd"
                    ? "Tanda tangan"
                    : "e-Meterai"}
                </div>
                <div className="flex justify-between mt-2">
                  <div className="font-bold mt-2 w-full text-blue text-sm">
                    {formatHarga(Number(el.product_price))} <br />
                    <label className="text-xs text-black font-light">
                      Pajak {formatHarga(Number(el.product_tax))}
                    </label>
                  </div>
                  <div className="mt-4 w-full text-right">
                    <button
                      className="focus:outline-none add-quota"
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
                      <i
                        className={`fa fa-minus text-blue border-blue quota-btn rounded-full text-xs`}
                      ></i>
                    </button>
                    <label className="font-bold border-b-1 px-2 mx-2 text-sm">
                      {el.product_name === "eform"
                        ? count.eform
                        : el.product_name === "ttd"
                        ? count.ttd
                        : count.emeterai}
                    </label>
                    <button
                      className="focus:outline-none"
                      onClick={() =>
                        tambahNilai(
                          el.product_name,
                          el.product_price,
                          el.product_tax
                        )
                      }
                    >
                      <i className="fa fa-plus text-blue border-blue quota-btn rounded-full text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
