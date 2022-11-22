import React, { useContext, useState, useRef } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import AktaJualBeli from 'assets/pdf/akta_jual_beli.pdf'
import signature from 'assets/img/signature/signature.png'
import meteraiImg from 'assets/img/signature/meterai.png'

import { MyAjbContext } from "Context/AjbContext";

import { fabric } from "fabric";
import { FormGroup } from "reactstrap";

const Step6 = props => {
    const { ajb, inputAjb, setInputAjb, setAjb, meterai, meterai2, ttdDigital, setOtpModal, setBtnConfirm, btnConfirm, coord, setCoord, setMeteraiCoord, functions } = useContext(MyAjbContext)

    const {addMeterai} = functions

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);  

  const onDocumentLoadSuccess = async({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(+1);
  }

  const handlePembubuhan = () => {
    setOtpModal(true)
    if(ttdDigital === false){
      let name = "signaturePage";
      setInputAjb({...inputAjb, [name] : pageNumber})
    }else if(meterai === false){
      let name = "meteraiPage1";
      setInputAjb({...inputAjb, [name] : pageNumber})
    }else if(meterai2 === false){
      let name = "meteraiPage2";
      setInputAjb({...inputAjb, [name] : pageNumber})
    }
    setAjb({...inputAjb})
  }
  console.log(inputAjb)

  const addTtd = () => {
    setBtnConfirm(true)

    var canvas = new fabric.Canvas("canvas");
    
    canvas.setDimensions({width: ref.current.clientWidth, height:ref.current.clientHeight});
    
    var image = document.getElementById('my-image');
    
    var fabricImage = new fabric.Image(image, { 
      hasControls: false,
      visible: true,
      hasBorders: false,
      scaleX: .8,
      scaleY: .8,
      width: 150
    });
    
    canvas.add(fabricImage);

    canvas.on('object:moving', function(e) {
      var obj = e.target;

      // if object is too big ignore

      // Get Coordinate
      console.log(obj.setCoords().aCoords.bl)

      let llx_signature = "llx_signature"
      let lly_signature = "lly_signature"

      setInputAjb({...inputAjb, [llx_signature]:obj.setCoords().aCoords.bl.x, [lly_signature]:obj.setCoords().aCoords.bl.y })

      let top = obj.setCoords().top
      let left = obj.setCoords().left

      let signatureCoord = {
        'topSignature' : top,
        'leftSignature' : left
      }
      setCoord({...coord, signatureCoord})

      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
          return;
      }        
      obj.setCoords();        
      // top-left  corner
      if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
          obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
          obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
      }
      // bot-right corner
      if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
          obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
          obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
      }
    });
    setAjb({...inputAjb})
  }

  const addMeterai = () => {
    // setMeterai(true)
    setBtnConfirm(true)

    var canvas = new fabric.Canvas("canvasMeterai",{
      preserveObjectStacking: true
    });
    canvas.setDimensions({width: ref.current.clientWidth, height:ref.current.clientHeight});

    var eMeterai = document.getElementById('meterai');
  
    var imgMeterai = new fabric.Image(eMeterai, { 
      hasControls: false,
      hasBorders: false,
      scaleX: .3,
      scaleY: .3
    });

    canvas.add(imgMeterai);

    canvas.on('object:moving', function(e) {
      var obj = e.target;

      // if object is too big ignore

      // Get Coordinate
      let top = obj.setCoords().top
      let left = obj.setCoords().left

      let meterai1 = {
        'topMeterai' : top,
        'leftMeterai' : left
      }
      setCoord({...coord, meterai1})

      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
          return;
      }        
      obj.setCoords();        
      // top-left  corner
      if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
          obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
          obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
      }
      // bot-right corner
      if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
          obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
          obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
      }
    });
  }

  const addMeterai2 = () => {
    // setMeterai(true)
    setBtnConfirm(true)

    var canvas = new fabric.Canvas("canvasMeterai2");
    canvas.setDimensions({width: ref.current.clientWidth, height:ref.current.clientHeight});

    var eMeterai2 = document.getElementById('meterai2');
  
    var imgMeterai2 = new fabric.Image(eMeterai2, { 
      hasControls: false,
      hasBorders: false,
      scaleX: .3,
      scaleY: .3
    });

    canvas.add(imgMeterai2);

    canvas.on('object:moving', function(e) {
      var obj = e.target;

      // if object is too big ignore

      // Get Coordinate
      let top = obj.setCoords().top
      let left = obj.setCoords().left

      // console.log(obj.setCoords())

      let meterai2 = {
        'topMeterai2' : top,
        'leftMeterai2' : left
      }
      setCoord({...coord, meterai2})

      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
          return;
      }        
      obj.setCoords();        
      // top-left  corner
      if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
          obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
          obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
      }
      // bot-right corner
      if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
          obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
          obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
      }
    });
  }

  const ref = useRef(null)
        // canvas.add(fabricImageMeterai);
      //   var text = new fabric.Text('Adrian Narabai, S.H', { 
      //     hasControls: false,
      //     left: 205, 
      //     top: 240 ,
      //     fontSize: 13,
      //     fontWeight: 20
      //   });
      // canvas.add(text);

  if (props.currentStep !== 6) {
    return null;
  }


  return (
    <>
      {/* <p>We recommend creating a secure password for your account</p> */}
      <FormGroup>
      <div className="flex content-center items-center justify-center h-full mt-20">
        <div className="w-full lg:w-12/12 px-1">
        <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
            <div className="rounded-t mb-0 px-4 text-grey py-6">
              <div className="text-white text-xs text-right bg-darkgray py-2 px-12 pembubuhan shadow-md">
                {ttdDigital === true && meterai !== true && meterai2 !== true ? 
                  <button className="bg-blue px-10 py-2 rounded-md" 
                  onClick={addMeterai}
                  >
                  E-Meterai
                  </button>
                  :
                  ttdDigital === true && meterai === true && meterai2 !== true ? 
                    <button className="bg-blue px-10 py-2 rounded-md" 
                    onClick={addMeterai2}
                    >
                    E-Meterai
                  </button>
                  :
                  meterai2 === true ? 
                  <button className="bg-darkgray-2 text-white px-10 py-2 rounded-md cursor-not-allowed" disabled>
                  E-Meterai 
                </button>
                :
                null
                }
                {ttdDigital === true ? (
                  <button className="bg-darkgray-2 text-white rounded-md py-2 px-3 cursor-not-allowed ml-4" disabled>
                  Tanda Tangan Digital
                  </button>
                ):(
                <button className="bg-cyan px-3 py-2 rounded-md" 
                onClick={addTtd}
                >
                  Tanda Tangan Digital
                </button>
                )}
              </div>
              <div className="bg-darkgray-2 text-xs shadow-md text-black pembubuhan-2">
                <div className="mx-auto w-9/12">
                  <div className="Example__container">
                  <div className="flex w-full justify-center py-2 ">
                  {pageNumber === 1 ?
                        <button
                          type="button"
                          disabled={pageNumber <= 1}
                          onClick={previousPage}
                          className="bg-darkgray rounded-md text-grey px-2 py-1"
                          disabled
                        >
                          Previous
                        </button>
                        :
                        <button
                          type="button"
                          disabled={pageNumber <= 1}
                          onClick={previousPage}
                          className="bg-white rounded-md text-black px-2 py-1 border-black"
                        >
                          Previous
                        </button>
                    }
                        <p className="text-black px-3 py-1 font-semibold">
                          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                        </p>
                        {pageNumber === numPages ?
                        <button
                          type="button"
                          disabled={pageNumber >= numPages}
                          onClick={nextPage}
                          className="bg-darkgray rounded-md text-grey px-4 py-1"
                          disabled
                        >
                          Next
                        </button>
                        :
                        <button
                          type="button"
                          disabled={pageNumber >= numPages}
                          onClick={nextPage}
                          className="bg-white rounded-md text-black px-4 border-black"
                        >
                          Next
                        </button>
                        }
                      </div>
                    <div ref={ref}>
                      {pageNumber === inputAjb.signaturePage && ttdDigital ? 
                        <div className="canvas-wrapper">
                        <canvas id="canvas" className="z-2">
                        <img src={signature} id="my-image" className='img-canvas'  alt="ttd" relative/>
                        </canvas>
                        </div>
                          : ttdDigital === false ?
                        <div className="canvas-wrapper">
                        <canvas id="canvas" className="z-2">
                        <img src={signature} id="my-image" className='img-canvas'  alt="ttd" relative/>
                        </canvas>
                        </div>
                        :
                        <div className="canvas-wrapper">
                        <canvas id="canvas">
                        <img src={signature} id="my-image" className='img-canvas'  alt="ttd" relative/>
                        </canvas>
                        </div>
                      }
                       {pageNumber === inputAjb.meteraiPage1 && meterai ? 
                        <div className="canvas-wrapper">
                        <canvas id="canvasMeterai" className="z-3">
                        <img src={meteraiImg} id="meterai" className="z-10 img-canvas" alt="meterai"/>
                        </canvas>
                        </div>
                        : meterai === false ?
                        <div className="canvas-wrapper">
                        <canvas id="canvasMeterai" className="z-3">
                        <img src={meteraiImg} id="meterai" className="z-10 img-canvas" alt="meterai"/>
                        </canvas>
                        </div>
                        :
                        <div className="canvas-wrapper">
                        <canvas id="canvasMeterai">
                        <img src={meteraiImg} id="meterai" className="z-10 img-canvas" alt="meterai"/>
                        </canvas>
                        </div>
                      }

                      {pageNumber === inputAjb.meteraiPage2 && meterai2 ? 
                        <div className="canvas-wrapper">
                        <canvas id="canvasMeterai2" className="z-3">
                        <img src={meteraiImg} id="meterai2" className="z-10 img-canvas" alt="meterai"/>
                        </canvas>
                        </div>
                         : meterai2 === false ?
                         <div className="canvas-wrapper">
                        <canvas id="canvasMeterai2" className="z-3">
                        <img src={meteraiImg} id="meterai2" className="z-10 img-canvas" alt="meterai"/>
                        </canvas>
                        </div>
                         :
                        <div className="canvas-wrapper">
                        <canvas id="canvasMeterai2">
                        <img src={meteraiImg} id="meterai2" className="z-10 img-canvas" alt="meterai"/>
                        </canvas>
                        </div>
                      }
                    <Document
                      file={AktaJualBeli}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber}></Page>
                    </Document>
                      </div>
                      <div className="flex w-full justify-center py-2 ">
                      {pageNumber === 1 ?
                        <button
                          type="button"
                          disabled={pageNumber <= 1}
                          onClick={previousPage}
                          className="bg-darkgray rounded-md text-grey px-2 py-1"
                          disabled
                        >
                          Previous
                        </button>
                        :
                        <button
                          type="button"
                          disabled={pageNumber <= 1}
                          onClick={previousPage}
                          className="bg-white rounded-md text-black px-2 py-1 border-black"
                        >
                          Previous
                        </button>
                    }
                        <p className="text-black px-3 py-1 font-semibold">
                          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                        </p>
                        {pageNumber === numPages ?
                        <button
                          type="button"
                          disabled={pageNumber >= numPages}
                          onClick={nextPage}
                          className="bg-darkgray rounded-md text-grey px-4 py-1"
                          disabled
                        >
                          Next
                        </button>
                        :
                        <button
                          type="button"
                          disabled={pageNumber >= numPages}
                          onClick={nextPage}
                          className="bg-white rounded-md text-black px-4 border-black"
                        >
                          Next
                        </button>
                        }
                      </div>
                      {btnConfirm ? (
                        <button 
                        className="bg-blue text-white w-full rounded-md text-center py-2 mb-2"
                        onClick={handlePembubuhan}
                        >
                          Bubuhkan
                        </button>
                      ):(
                        null
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step6;
