import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import PaketProduk from "./PaketProduk";
import ProdukSatuan from "./ProdukSatuan";
import Payment from "components/Modals/Payment";

export default function ListProduk() {
  const {
    total,
    setLoadingFile,
    item,
    functions,
    paymentModal,
  } = useContext(TopUpContext);

  const { topUp } = functions;

  console.log(item)

  const pesanItem = () => {
    topUp(item);
    setLoadingFile(true);
  };

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp" + parts.join(",");
  };

  return (
    <>
      {paymentModal ? <Payment /> : null}
      <div className="w-full grid grid-cols-4 relative break-words font-montserrat cursor-default">
        <div className="col-span-3">
          <ProdukSatuan />
          <PaketProduk />
        </div>
        <div className="text-black mt-9 card-shadow border-grey-3 rounded-lg font-sans">
          <div className="rounded-lg p-4 text-sm">
            <div className="font-bold font-700 mb-6">Ringkasan Pemesanan</div>
            <div className="mb-5 text-xs text-grey">
              Total Harga {item.length !== 0 ? `(${item.length} Produk)` : ''}
              <span className="float-right">{formatHarga(total.harga)}</span>
            </div>
            <hr className="my-3 mx-auto total-line" />
            <div className="font-bold">
              Total Tagihan
              <span className="float-right">
                {formatHarga(total.pajak + total.harga)}
              </span>
            </div>
            <button
              className="checkout-button text-white bg-blue mt-8 w-full font-bold py-2 rounded-lg"
              onClick={pesanItem}
              disabled={total.harga === 0 ? true : false}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}