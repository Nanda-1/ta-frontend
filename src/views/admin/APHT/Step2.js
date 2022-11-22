import React, { useContext, useState } from "react";
import { FormGroup } from "reactstrap";
import { MyAphtcontext } from "Context/AphtContext";
import swal from "sweetalert";

const Step2 = props => {
  const { inputApht, setInputApht, setApht } = useContext(MyAphtcontext)
  const [ktp, setKTP] = useState({ previewKTP: "", rawKTP: "" });
  const [kk, setKK] = useState({ previewKK: "", rawKK: "" });
  const [sertifikatTanah, setSertifikatTanah] = useState({ previewST: "", rawST: "" });
  const [pbb, setPbb] = useState({ previewPBB: "", rawPBB: "" });
  const [stts, setStts] = useState({ previewSTTS: "", rawSTTS: "" });
  const [npwp, setNPWP] = useState({ previewNPWP: "", rawNPWP: "" });
  const [sk, setSK] = useState({ previewSk: "", rawSk: "" });
  const [aktaPendirian, setAktaPendirian] = useState({ previewAP: "", rawAP: "" });

    const uploadSKPengangkatan = (e) => {
        if (e.currentTarget.files.length) {
            const fileSize = e.currentTarget.files[0].size / 1024;
            const fileType = e.currentTarget.files[0].type;
            if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
              if(fileSize <= 2048){
            let formInput = e.target.name;
            let getSk =  e.currentTarget.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
              var sk_pengangkatan64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : sk_pengangkatan64})
            }
            reader.readAsDataURL(getSk);
   
            setSK({
            previewSk: URL.createObjectURL(e.currentTarget.files[0]),
            rawSk: e.currentTarget.files[0]
            });
        }else{
            swal("Error", "File tidak boleh lebih dari 2Mb", "error")
          }
          setApht({...inputApht})
        }else{
          swal("Error", "Format Tidak Sesuai", "error")
        }
      }
    };
   
    const uploadAktaPendirian = (e) => {
        if (e.currentTarget.files.length) {
            const fileSize = e.currentTarget.files[0].size / 1024;
            const fileType = e.currentTarget.files[0].type;
            if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
              if(fileSize <= 2048){
            let formInput = e.target.name;
            let getAkta =  e.currentTarget.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
              var aktaPendirian64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : aktaPendirian64})
            }   
            reader.readAsDataURL(getAkta);

            setAktaPendirian({
            previewAP: URL.createObjectURL(e.currentTarget.files[0]),
            rawAP: e.currentTarget.files[0]
            });
        }else{
            swal("Error", "File tidak boleh lebih dari 2Mb", "error")
          }
          setApht({...inputApht})
        }else{
          swal("Error", "Format Tidak Sesuai", "error")
        }
      }
    };

    const uploadNPWPPreview = (e) => {
      if (e.currentTarget.files.length) {
        const fileSize = e.currentTarget.files[0].size / 1024;
        const fileType = e.currentTarget.files[0].type;
        if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
          if(fileSize <= 2048){
            let formInput = e.target.name;
            let getNPWP =  e.currentTarget.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
              var npwp64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : npwp64})
            }
            reader.readAsDataURL(getNPWP);

            setNPWP({
              previewNPWP: URL.createObjectURL(e.currentTarget.files[0]),
              rawNPWP: e.currentTarget.files[0]
            });
            setApht({...inputApht})
          }else{
            swal("Error", "File tidak boleh lebih dari 2Mb", "error")
          }
          setApht({...inputApht})
        }else{
          swal("Error", "Format Tidak Sesuai", "error")
        }
      }
      setApht({...inputApht})
    };
         
    const uploadSTTSPreview = (e) => {
      if (e.currentTarget.files.length) {
        const fileSize = e.currentTarget.files[0].size / 1024;
        const fileType = e.currentTarget.files[0].type;
        if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
          if(fileSize <= 2048){
        let formInput = e.target.name;
         let getSTTS =  e.currentTarget.files[0];
         const reader = new FileReader();
            reader.onloadend = () => {
              var stts64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : stts64})
            }
            reader.readAsDataURL(getSTTS);
         setStts({
           previewSTTS: URL.createObjectURL(e.currentTarget.files[0]),
           rawSTTS: e.currentTarget.files[0]
          });
        }else{
          swal("Error", "File tidak boleh lebih dari 2Mb", "error")
          }
        setApht({...inputApht})
        }else{
          swal("Error", "Format Tidak Sesuai", "error")
        }
      }
    };
         
      const uploadPBBPreview = (e) => {
        if (e.currentTarget.files.length) {
          const fileSize = e.currentTarget.files[0].size / 1024;
        const fileType = e.currentTarget.files[0].type;
        if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
          if(fileSize <= 2048){
          let formInput = e.target.name;
           let getPBB =  e.currentTarget.files[0];
           const reader = new FileReader();
            reader.onloadend = () => {
              var pbb64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : pbb64})
            }
            reader.readAsDataURL(getPBB);
           setPbb({
             previewPBB: URL.createObjectURL(e.currentTarget.files[0]),
             rawPBB: e.currentTarget.files[0]
            });
          }else{
            swal("Error", "File tidak boleh lebih dari 2Mb", "error")
            }
          setApht({...inputApht})
        }else{
          swal("Error", "Format Tidak Sesuai", "error")
        }
        }
    };
    
    const uploadSertikatTanahPreview = (e) => {
      if (e.currentTarget.files.length) {
        const fileSize = e.currentTarget.files[0].size / 1024;
        const fileType = e.currentTarget.files[0].type;
        if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
          if(fileSize <= 2048){
        let formInput = e.target.name;
         let getST =  e.currentTarget.files[0];
         const reader = new FileReader();
            reader.onloadend = () => {
              var st64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : st64})
            }
            reader.readAsDataURL(getST);
         setSertifikatTanah({
           previewST: URL.createObjectURL(e.currentTarget.files[0]),
           rawST: e.currentTarget.files[0]
          });
        }else{
          swal("Error", "File tidak boleh lebih dari 2Mb", "error")
          }
        setApht({...inputApht})
      }else{
        swal("Error", "Format Tidak Sesuai", "error")
      }
    }
    };
  
    const uploadKTPPreview = (e) => {
      if (e.currentTarget.files.length) {
        const fileSize = e.currentTarget.files[0].size / 1024;
        const fileType = e.currentTarget.files[0].type;
        if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
          if(fileSize <= 2048){
        let formInput = e.target.name;
         let getKtp =  e.currentTarget.files[0];
         const reader = new FileReader();
            reader.onloadend = () => {
              var ktp64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : ktp64})
            }
            reader.readAsDataURL(getKtp);
         setKTP({
           previewKTP: URL.createObjectURL(e.currentTarget.files[0]),
           rawKTP: e.currentTarget.files[0]
          });
        }else{
          swal("Error", "File tidak boleh lebih dari 2Mb", "error")
          }
        setApht({...inputApht})
      }else{
        swal("Error", "Format Tidak Sesuai", "error")
      }
      }
    };
     
      const uploadKKPreview = (e) => {
        if (e.currentTarget.files.length) {
          const fileSize = e.currentTarget.files[0].size / 1024;
        const fileType = e.currentTarget.files[0].type;
        if(fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg"){
          if(fileSize <= 2048){
          let formInput = e.target.name;
           let getKk =  e.currentTarget.files[0];
           const reader = new FileReader();
            reader.onloadend = () => {
              var kk64 = reader.result.replace(/^data:.+;base64,/, '');
              setInputApht({...inputApht, [formInput] : kk64})
            }
            reader.readAsDataURL(getKk);
           setKK({
             previewKK: URL.createObjectURL(e.currentTarget.files[0]),
             rawKK: e.currentTarget.files[0]
            });
          }else{
            swal("Error", "File tidak boleh lebih dari 2Mb", "error")
            }
          setApht({...inputApht})
        }else{
          swal("Error", "Format Tidak Sesuai", "error")
        }
        }
      };

      const keterangan = [
        {
          text1 : 'Perhatian :',
          text2 : 'Gambar identitas & pas foto harus terbaca jelas.',
          text3 : 'Foto identitas adalah dokumen asli, bukan dokumen fotocopy.',
          text4 : 'Identitas yang terdaftar adalah data yang masih berlaku.'
        }
      ]

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      {/* <p>What should we call you?</p> */}
      <FormGroup>
      <div className="flex content-center items-center justify-center h-full mt-20">
      <div className="w-full lg:w-8/12 px-1">
            {/* <form onSubmit={addFilePenjual}> */}
            <div className="relative bg-white flex flex-col px-4 min-w-0 h-auto break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 text-darkgrey py-6 text-center">
                {inputApht.tipe_debitor === 'personal' ?
                <>

                {/* Surat Nikah */}
                {inputApht.status_debitor === 'menikah' ?
                <div className="relative w-full mb-24">
                  <label
                    className="block text-center text-blue text-xl font-bold mb-4"
                    htmlFor="grid-password"
                  >
                    Unggah Surat Nikah
                  </label>
                  <label className="text-xs">
                  Bila belum memiliki Surat Nikah dapat dikosongkan.<br/> Scan Surat Nikah <b>asli</b>.
                  </label>
                  <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                      <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col justify-center items-center"
                      >
                      <div className="mx-auto my-auto w-80">
                          <label htmlFor="upload-button">
                          {ktp.previewKTP ? (
                              <img
                              src={ktp.previewKTP}
                              alt="dummy1"
                              className="pt-2 mt-2 mx-auto max-h-15"
                              name="surat_nikah_debitor"
                              // require={true}
                              />
                          ) : (
                              <>
                              <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                              <p className="text-center text-sm">
                                  Klik disini untuk upload foto Surat Nikah Asli di file.
                              </p>
                              </>
                          )}
                          </label>
                          <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={uploadKTPPreview}
                          name='surat_nikah_debitor'
                          />
                          <br />
                      </div>
                      </li>
                      {keterangan.map((item) => {
                      return(
                      <div className='text-left text-xs pt-2 '>
                      {item.text1}
                          <ol className='list-decimal-ket pl-3'>
                              <li key={item.text2}>{item.text2}</li>
                              <li key={item.text3}>{item.text3}</li>
                              <li key={item.text4}>{item.text4}</li>
                          </ol>
                      </div>
                      )
                      })}
                  </ul>
                  </span>
                </div>
                :
                null
              }

                {/* Kartu Keluarga */}
                <div className="relative w-full mb-24">
                <label
                  className="block text-center text-blue text-xl font-bold mb-4"
                  htmlFor="grid-password"
                >
                  Unggah Kartu Keluarga
                </label>
                <label className="text-xs">
                Data Kartu Keluarga Debitor (Pihak Pertama).<br/> Gunakan Kartu Keluarga asli.
                </label>
                <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col justify-center items-center"
                    >
                    <div className="mx-auto my-auto w-80">
                        <label htmlFor="upload-button2">
                        {kk.previewKK ? (
                            <img
                            src={kk.previewKK}
                            alt="dummy2"
                            className="pt-2 mt-2 mx-auto max-h-15"
                            name='kartu_keluarga_debitor'
                            // required
                            />
                        ) : (
                            <>
                            <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                            <p className="text-center text-sm pt-7">
                                Klik disini untuk upload foto Kartu Keluarga Asli di file.
                            </p>
                            </>
                        )}
                        </label>
                            <input
                            type="file"
                            id="upload-button2"
                            style={{ display: "none" }}
                            onChange={uploadKKPreview}
                            name='kartu_keluarga_debitor'
                            // required={true}
                        />
                        <br />
                        {/* <button onClick={handleUploadKK} hidden>
                        Upload
                        </button> */}
                    </div>
                    </li>
                    {keterangan.map((item) => {
                    return(
                    <div className='text-left text-xs pt-2'>
                    {item.text1}
                        <ol className='list-decimal-ket pl-3'>
                            <li key={item.text2}>{item.text2}</li>
                            <li key={item.text3}>{item.text3}</li>
                            <li key={item.text4}>{item.text4}</li>
                        </ol>
                    </div>
                    )
                    })}
                </ul>
                </span>
                </div>

                {/* Sertifikat Tanah */}
                <div className="relative w-full mb-24">
                  <label
                    className="block text-center text-blue text-xl font-bold mb-4"
                    htmlFor="grid-password"
                  >
                    Unggah Sertifikat Tanah
                  </label>
                  <label className="text-xs">
                  Data Sertifikat Tanah (Pihak Pertama).<br/> Gunakan Scan Sertifikat Tanah asli.
                  </label>
                  <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                      <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col justify-center items-center"
                      >
                      <div className="mx-auto my-auto w-80">
                          <label htmlFor="upload-button3">
                          {sertifikatTanah.previewST ? (
                              <img
                              src={sertifikatTanah.previewST}
                              alt="dummy2"
                              className="pt-2 mt-2 mx-auto max-h-15"
                              name="sertifikat_tanah"
                              // required
                              />
                          ) : (
                              <>
                              <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                              <p className="text-center text-sm pt-7">
                                  Klik disini untuk upload foto Surat Tanah Asli di file.
                              </p>
                              </>
                          )}
                          </label>
                              <input
                              type="file"
                              id="upload-button3"
                              style={{ display: "none" }}
                              onChange={uploadSertikatTanahPreview}
                              name="sertifikat_tanah"
                              // required={true}
                          />
                          <br />
                          {/* <button onClick={handleUploadSertifikatTanah} hidden>
                          Upload
                          </button> */}
                      </div>
                      </li>
                      {keterangan.map((item) => {
                      return(
                      <div className='text-left text-xs pt-2'>
                      {item.text1}
                          <ol className='list-decimal-ket pl-3'>
                              <li key={item.text2}>{item.text2}</li>
                              <li key={item.text3}>{item.text3}</li>
                              <li key={item.text4}>{item.text4}</li>
                          </ol>
                      </div>
                      )
                      })}
                  </ul>
                  </span>
                </div>

                {/* PBB */}
                <div className="relative w-full mb-24">
                  <label
                    className="block text-center text-blue text-xl font-bold mb-4"
                    htmlFor="grid-password"
                  >
                    Unggah PBB Tahun Terakhir
                  </label>
                  <label className="text-xs">
                  Data SPPT (Surat Pemberitahuan Pajak Terutang) PBB (Pihak Pertama).<br/> Gunakan Scan SPPT PBB Tahun Terakhir asli.
                  </label>
                  <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                      <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col justify-center items-center"
                      >
                      <div className="mx-auto my-auto w-80">
                          <label htmlFor="upload-button4">
                          {pbb.previewPBB ? (
                              <img
                              src={pbb.previewPBB}
                              alt="dummy2"
                              className="pt-2 mt-2 mx-auto max-h-15"
                              name="pbb_tahun_terakhir"
                              // required
                              />
                          ) : (
                              <>
                              <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                              <p className="text-center text-sm pt-7">
                                  Klik disini untuk upload foto Surat Tanah Asli di file.
                              </p>
                              </>
                          )}
                          </label>
                              <input
                              type="file"
                              id="upload-button4"
                              style={{ display: "none" }}
                              onChange={uploadPBBPreview}
                              name="pbb_tahun_terakhir"
                              // required={true}
                          />
                          <br />
                          {/* <button onClick={handleUploadPBB} hidden>
                          Upload
                          </button> */}
                      </div>
                      </li>
                      {keterangan.map((item) => {
                      return(
                      <div className='text-left text-xs pt-2'>
                      {item.text1}
                          <ol className='list-decimal-ket pl-3'>
                              <li key={item.text2}>{item.text2}</li>
                              <li key={item.text3}>{item.text3}</li>
                              <li key={item.text4}>{item.text4}</li>
                          </ol>
                      </div>
                      )
                      })}
                  </ul>
                  </span>
                </div>

                {/* Surat Tanda Terima Setoran */}
                <div className="relative w-full mb-24">
                  <label
                    className="block text-center text-blue text-xl font-bold mb-4"
                    htmlFor="grid-password"
                  >
                    Unggah Surat Tanda Terima Setoran
                  </label>
                  <label className="text-xs">
                  Data STTS (Pihak Pertama).<br/> Gunakan STTS (Surat Tanda Terima Setoran) dari PBB Debitor.
                  </label>
                  <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                      <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col justify-center items-center"
                      >
                      <div className="mx-auto my-auto w-80">
                          <label htmlFor="upload-button5">
                          {stts.previewSTTS ? (
                              <img
                              src={stts.previewSTTS}
                              alt="dummy2"
                              className="pt-2 mt-2 mx-auto max-h-15"
                              name="stts"
                              // required
                              />
                          ) : (
                              <>
                              <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                              <p className="text-center text-sm pt-7">
                                  Klik disini untuk upload foto Surat Tanah Asli di file.
                              </p>
                              </>
                          )}
                          </label>
                              <input
                              type="file"
                              id="upload-button5"
                              style={{ display: "none" }}
                              onChange={uploadSTTSPreview}
                              name="stts"
                              // required={true}
                          />
                          <br />
                          {/* <button onClick={handleUploadSTTS} hidden>
                          Upload
                          </button> */}
                      </div>
                      </li>
                      {keterangan.map((item) => {
                      return(
                      <div className='text-left text-xs pt-2'>
                      {item.text1}
                          <ol className='list-decimal-ket pl-3'>
                              <li key={item.text2}>{item.text2}</li>
                              <li key={item.text3}>{item.text3}</li>
                              <li key={item.text4}>{item.text4}</li>
                          </ol>
                      </div>
                      )
                      })}
                  </ul>
                  </span>
                </div>

                {/* NPWP */}
                <div className="relative w-full mb-24">
                  <label
                    className="block text-center text-blue text-xl font-bold mb-4"
                    htmlFor="grid-password"
                  >
                    Unggah NPWP
                  </label>
                  <label className="text-xs">
                  Data NPWP (Pihak Pertama).<br/> Gunakan NPWP Asli.
                  </label>
                  <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                      <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col justify-center items-center"
                      >
                      <div className="mx-auto my-auto w-80">
                          <label htmlFor="upload-button6">
                          {npwp.previewNPWP ? (
                              <img
                              src={npwp.previewNPWP}
                              alt="dummy2"
                              className="pt-2 mt-2 mx-auto max-h-15"
                              name="npwp_debitor"
                              // required
                              />
                          ) : (
                              <>
                              <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                              <p className="text-center text-sm pt-7">
                                  Klik disini untuk upload foto Surat Tanah Asli di file.
                              </p>
                              </>
                          )}
                          </label>
                              <input
                              type="file"
                              id="upload-button6"
                              style={{ display: "none" }}
                              onChange={uploadNPWPPreview}
                              name="npwp_debitor"
                              // required={true}
                          />
                          <br />
                          {/* <button onClick={handleUploadNPWP} hidden>
                          Upload
                          </button> */}
                      </div>
                      </li>
                      {keterangan.map((item) => {
                      return(
                      <div className='text-left text-xs pt-2'>
                      {item.text1}
                          <ol className='list-decimal-ket pl-3'>
                              <li key={item.text2}>{item.text2}</li>
                              <li key={item.text3}>{item.text3}</li>
                              <li key={item.text4}>{item.text4}</li>
                          </ol>
                      </div>
                      )
                      })}
                  </ul>
                  </span>
                </div>
                </>
                :
                <>
                {/* Akta Pendirian */}
                <div className="relative w-full mb-24">
                    <label
                      className="block text-center text-blue text-xl font-bold mb-4"
                      htmlFor="grid-password"
                    >
                      Unggah Akta Pendirian
                    </label>
                    {/* <label className="text-xs">
                    Data Akta Pendirian Pembeli (Pihak Kedua).
                    </label> */}
                    <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                    {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                    <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                        <li
                        id="empty"
                        className="h-full w-full text-center flex flex-col justify-center items-center"
                        >
                        <div className="mx-auto my-auto w-80">
                            <label htmlFor="upload-button6">
                            {aktaPendirian.previewAP ? (
                                <img
                                src={aktaPendirian.previewAP}
                                alt="dummy2"
                                className="pt-2 mt-2 mx-auto max-h-15"
                                name='akta_pendirian_debitor'
                                required
                                />
                            ) : (
                                <>
                                <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                                <p className="text-center text-sm pt-7">
                                    Klik disini untuk upload foto Akta Pendirian Asli di file.
                                </p>
                                </>
                            )}
                            </label>
                                <input
                                type="file"
                                id="upload-button6"
                                style={{ display: "none" }}
                                onChange={uploadAktaPendirian}
                                name='akta_pendirian_debitor'
                                // required={true}
                            />
                            <br />
                            {/* <button onClick={handleUploadKK} hidden>
                            Upload
                            </button> */}
                        </div>
                        </li>
                        {keterangan.map((item, i) => {
                        return(
                        <div className='text-left text-xs pt-2' key={1}>
                        {item.text1}
                            <ol className='list-decimal-ket pl-3'>
                                <li key={'2'}>{item.text2}</li>
                                <li key={'3'}>{item.text3}</li>
                                <li key={'4'}>{item.text4}</li>
                            </ol>
                        </div>
                        )
                        })}
                    </ul>
                    </span>
                </div>
                
                {/* SK Pengangkatan */}
                <div className="relative w-full mb-24">
                    <label
                      className="block text-center text-blue text-xl font-bold mb-4"
                      htmlFor="grid-password"
                    >
                      Unggah SK Pengangkatan
                    </label>
                    {/* <label className="text-xs">
                    Data SK Pengangkatan Pembeli (Pihak Kedua).
                    </label> */}
                    <span className="flex h-250-px w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                    {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                    <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                        <li
                        id="empty"
                        className="h-full w-full text-center flex flex-col justify-center items-center"
                        >
                        <div className="mx-auto my-auto w-80">
                            <label htmlFor="upload-button7">
                            {sk.previewSk ? (
                                <img
                                src={sk.previewSk}
                                alt="dummy2"
                                className="pt-2 mt-2 mx-auto max-h-15"
                                name='sk_pengangkatan_debitor'
                                required
                                />
                            ) : (
                                <>
                                <i className={"far fa-file-alt text-6xl py-2"}></i>{" "}
                                <p className="text-center text-sm pt-7">
                                    Klik disini untuk upload foto SK Pengangkatan Asli di file.
                                </p>
                                </>
                            )}
                            </label>
                                <input
                                type="file"
                                id="upload-button7"
                                style={{ display: "none" }}
                                onChange={uploadSKPengangkatan}
                                name='sk_pengangkatan_debitor'
                                // required={true}
                            />
                            <br />
                            {/* <button onClick={handleUploadKK} hidden>
                            Upload
                            </button> */}
                        </div>
                        </li>
                        {keterangan.map((item, i) => {
                        return(
                        <div className='text-left text-xs pt-2' key={1}>
                        {item.text1}
                            <ol className='list-decimal-ket pl-3'>
                                <li key={'2'}>{item.text2}</li>
                                <li key={'3'}>{item.text3}</li>
                                <li key={'4'}>{item.text4}</li>
                            </ol>
                        </div>
                        )
                        })}
                    </ul>
                    </span>
                </div>
                </>
                    }
                  
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step2;