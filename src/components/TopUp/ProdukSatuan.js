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
    blankoTax,
    ttdTax,
    meteraiTax,
    taxBlangko,
    taxMeterai,
    taxTtd,
    priceBlangko,
    priceMeterai,
    priceTtd,
    blangkoPrice,
    ttdPrice,
    meteraiPrice,
    functions,
    item,
    setItem,
  } = useContext(TopUpContext);

  const { histori } = functions;

  useEffect(() => {
    produk();
    blankoTax();
    ttdTax();
    meteraiTax();
    blangkoPrice();
    ttdPrice();
    meteraiPrice();
    histori();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(item);

  const addForm = (nilai, type) => {
    let produk =
      type === "eform.price"
        ? "blangko"
        : type === "ttd.price"
        ? "ttd"
        : "meterai";
    if (nilai > 0) {
      const arr = item.filter((item) => item.quota_name !== produk);
      setItem(arr);
      setItem((item) => [
        ...item,
        { quota_name: produk, quota_quantity: nilai },
      ]);
    } else {
      const arr = item.filter((item) => item.quota_name !== produk);
      setItem(arr);
    }
  };

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  const tambahNilai = (type) => {
    let data =
      type === "eform.price"
        ? count.blangko + 1
        : type === "ttd.price"
        ? count.ttd + 1
        : count.meterai + 1;

    let name =
      type === "eform.price"
        ? "blangko"
        : type === "ttd.price"
        ? "ttd"
        : "meterai";

    setCount({ ...count, [name]: data });
    let tax =
      type === "eform.price"
        ? taxBlangko
        : type === "ttd.price"
        ? taxTtd
        : taxMeterai;

    let price =
      type === "eform.price"
        ? priceBlangko
        : type === "ttd.price"
        ? priceTtd
        : priceMeterai;
    let nilai = 1 * tax;
    let nilai2 = 1 * price;
    let hasil = total.pajak + nilai;
    let totalHarga = total.harga + nilai2;
    setTotal({ ...total, pajak: hasil, harga: totalHarga });

    addForm(data, type);
  };

  const kurangNilai = (type) => {
    let data =
      type === "eform.price"
        ? count.blangko - 1
        : type === "ttd.price"
        ? count.ttd - 1
        : count.meterai - 1;

    let name =
      type === "eform.price"
        ? "blangko"
        : type === "ttd.price"
        ? "ttd"
        : "meterai";

    setCount({ ...count, [name]: data });

    let tax =
      type === "eform.price"
        ? taxBlangko
        : type === "ttd.price"
        ? taxTtd
        : taxMeterai;

    let price =
      type === "eform.price"
        ? priceBlangko
        : type === "ttd.price"
        ? priceTtd
        : priceMeterai;

    let nilai = 1 * tax;
    let nilai2 = 1 * price;
    let hasil = total.pajak - nilai;
    let totalHarga = total.harga - nilai2;
    setTotal({ ...total, pajak: hasil, harga: totalHarga });

    addForm(data, type);
  };

  return (
    <>
      <label className="font-bold text-xl">Produk Satuan</label>
      <div className="grid grid-cols-3 mt-2 text-grey w-full">
        {produkSatuan
          .filter(
            (el) =>
              el.name === "eform.price" ||
              el.name === "ttd.price" ||
              el.name === "ematerai.price"
          )
          .map(({ name, value, id }) => {
            return (
              <div className="doc-box p-4 mx-4" key={id}>
                <div className="font-bold text-xl" key={id}>
                  {name === "eform.price"
                    ? "Blangko"
                    : name === "ttd.price"
                    ? "Tanda tangan"
                    : name === "ematerai.price"
                    ? "e-Meterai"
                    : null}
                </div>
                <div className="font-semibold mt-2 ml-4">
                  {formatHarga(Number(value))}
                </div>
                <div className="font-semibold mt-2 ml-4 text-xs">
                  Pajak{" "}
                  {name === "eform.price"
                    ? formatHarga(taxBlangko)
                    : name === "ttd.price"
                    ? formatHarga(taxTtd)
                    : name === "ematerai.price"
                    ? formatHarga(taxMeterai)
                    : ""}
                </div>
                <div className="mt-4 mx-auto w-full text-center">
                  <button
                    className="focus:outline-none mr-4"
                    onClick={() => kurangNilai(name)}
                    disabled={
                      count.blangko > 0 || count.ttd > 0 || count.meterai > 0
                        ? false
                        : true
                    }
                  >
                    <i className="fa fa-minus bg-blue py-1 px-2 rounded-full text-white text-xxs"></i>
                  </button>
                  {name === "eform.price" ? (
                    <>{count.blangko}</>
                  ) : name === "ttd.price" ? (
                    <>{count.ttd}</>
                  ) : name === "ematerai.price" ? (
                    <>{count.meterai}</>
                  ) : (
                    ""
                  )}
                  <button
                    className="focus:outline-none ml-4"
                    onClick={() => tambahNilai(name)}
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
