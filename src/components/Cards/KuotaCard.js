import React, { useContext, useEffect } from "react";
import { UserContext } from "Context/UserContext";
import { Link } from "react-router-dom";

export default function KuotaCard() {
  const {
    dataUser,
    selesai,
    pending,
    draft,
    dokumenPending,
    dokumenSelesai,
    dokumenDraft,
    functions,
    meteraiQuota,
    ttdQuota,
    formQuota,
  } = useContext(UserContext);

  const { quotaMeterai, cekQuota, quotaForm } = functions;

  console.log(meteraiQuota)

  useEffect(() => {
      // dokumenSelesai(dataUser.uid);
      // dokumenPending(dataUser.uid);
      // dokumenDraft(dataUser.uid);
      cekQuota('eform');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {dataUser !== null && (
        <div className="w-full grid grid-cols-3 text-center text-3xl align-middle">
          <div className="meterai-count ml-8 mb-4 pt-2">
            {meteraiQuota}
            <div className="text-xxs pt-1">E-Meterai Digital</div>
          </div>
          <div className="sign-count ml-8 mb-4 pt-2">
            {ttdQuota}
            <div className="text-xxs pt-1">Tanda Tangan Digital</div>
          </div>
          <div className="akta-count ml-8 mb-4 pt-2">
            {formQuota}
            <div className="text-xxs pt-1">Blangko Akta Digital</div>
          </div>
          <div className="finish-count ml-8 mb-4 pt-2">
            {selesai ? selesai : "0"}
            <div className="text-xxs pt-1">Dokumen Selesai</div>
          </div>
          <div className="pending-count ml-8 mb-4 pt-2">
            {pending ? pending : "0"}
            <div className="text-xxs pt-1">Dokumen Pending</div>
          </div>
          <div className="draft-count ml-8 mb-4 pt-2">
            {draft ? draft : "0"}
            <div className="text-xxs pt-1">Dokumen Draft</div>
          </div>
          <Link className="top-up ml-8 text-xs pt-3" to="/admin/topup">
            Isi Ulang
          </Link>
        </div>
      )}
    </>
  );
}
