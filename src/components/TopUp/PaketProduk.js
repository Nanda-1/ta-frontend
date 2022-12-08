import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";
import ReactTooltip from "react-tooltip";

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
    return "Rp" + parts.join(",");
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

    if (data >= 0) {
      setCount({ ...count, [name]: data });
      let hasil = total.pajak - tax;
      let totalHarga = total.harga - price;
      setTotal({ ...total, pajak: hasil, harga: totalHarga });
      addPaket(data, id);
    }
  };

  const tooltipDesc = (name) => {
    const indexOfSpace = name.indexOf(" ");
    let data = [
      { name: "100 e-Meterai" },
      { name: "100 Tanda Tangan" },
      { name: "100 Form" },
    ];

    if (indexOfSpace === -1) {
      return "";
    }

    return `Anda Mendapatkan ${
      name.substring(indexOfSpace + 1) === "Hemat"
        ? data.map((el) => el.name)
        : name.substring(indexOfSpace + 1)
    }`;
  };

  return (
    <div className="font-sans">
      <p className="font-bold mt-6 text-lg">Produk Paketan</p>
      {listPaketQuota.length === 0 ? (
        <div className="text-center my-3 text-sm text-grey">
          Tidak Ada Produk
        </div>
      ) : (
        <div className="grid grid-cols-3 mt-2 text-grey w-full">
          {listPaketQuota.map((el, index) => {
            return (
              <div
                className={`card-shadow border-grey-3 rounded-lg px-6 py-4 ${
                  index !== listPaketQuota.length ? "mr-4" : null
                }`}
                key={index}
              >
                <div className="font-bold text-sm text-black">
                  {el.package_name.toLowerCase().includes("ttd")
                    ? "100 Tanda Tangan"
                    : el.package_name.toLowerCase().includes("hemat")
                    ? "Paket 100"
                    : "100 e-Meterai"}
                  <a
                    data-tip={tooltipDesc(el.package_name)}
                    className="package-tooltip text-blue mx-2 rounded-full text-2xs"
                  >
                    i
                  </a>

                  <ReactTooltip
                    place="bottom"
                    type="dark"
                    effect="solid"
                    className="rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <div className="font-bold mt-2 w-full text-blue text-sm">
                    {formatHarga(Number(el.price))} <br />
                    <label className="text-xs text-black font-light">
                      Pajak {formatHarga(Number(el.tax))}
                    </label>
                  </div>
                  <div className="mt-4 w-full text-right">
                    <button
                      className="focus:outline-none add-quota"
                      onClick={() =>
                        handleKurangPaket(el.package_id, el.price, el.tax)
                      }
                    >
                      <i className="fa fa-minus text-blue border-blue quota-btn rounded-full text-xs"></i>
                    </button>
                    <label className="font-bold border-b-1 px-2 mx-2 text-sm">
                      {el.package_id === "a95616a7-1a31-4adc-82e3-31c92b77b836"
                        ? count.paket1
                        : el.package_id ===
                          "2a1cf5d2-9088-4c08-9fc9-c88a29a2ca53"
                        ? count.paket2
                        : el.package_id ===
                          "6b33e6a0-291a-4e18-b3bb-514bf03ec100"
                        ? count.paket3
                        : null}
                    </label>
                    <button
                      className="focus:outline-none"
                      onClick={() =>
                        handleTambahPaket(el.package_id, el.price, el.tax)
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
