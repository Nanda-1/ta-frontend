import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import PaketProduk from "./PaketProduk";
import ProdukSatuan from "./ProdukSatuan";

export default function ListProduk() {
  const { total, setLoadingFile, item, functions } = useContext(TopUpContext);

  const { topUp } = functions;

  const pesanItem = () => {
    topUp(item);
    setLoadingFile(true);
  };

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  return (
    <>
      <div className="w-full grid grid-cols-4 relative break-words font-montserrat cursor-default">
        <div className="col-span-3">
          <ProdukSatuan />
          <PaketProduk />
        </div>
        <div className="text-white mt-9 ml-3">
          <div className="bg-blue rounded-lg p-6 ">
            <div className="font-bold text-xl mb-6">Ringkasan</div>
            <div className="mb-5">
              Total Harga :{" "}
              <span className="float-right">{formatHarga(total.harga)}</span>
            </div>
            <div className="mb-5">
              Pajak :{" "}
              <span className="float-right">{formatHarga(total.pajak)}</span>
            </div>
            <div className="font-bold">Total Pesanan</div>
            <div className="text-right text-lg font-bold">
              {formatHarga(total.pajak + total.harga)}
            </div>
            <button
              className="checkout-button align-bottom text-blue bg-white mt-8 w-full font-bold py-2 rounded-sm"
              onClick={pesanItem}
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
