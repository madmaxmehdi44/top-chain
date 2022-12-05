import { Card, Col, Row, Button, Text, Loading } from "@nextui-org/react"
import saveAs from "file-saver"
import { IoDownload, IoCloudDownloadOutline, IoSend } from "react-icons/io5"
import { MdPreview } from "react-icons/md"
// import SinglePagePDFViewer from "src/core/components/PDF/SinglePageViewExample"
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core"
import ModalExample from "src/core/components/PDF/ModalExample"
// import SinglePageViewExample from "src/core/components/PDF/SinglePageViewExample"
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import Image from "next/image"
// import { Document, Page } from "react-pdf"
// import lohePDF from "public/lohe.pdf"
export function LoheCard(): JSX.Element {
  const curdate = new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(
    new Date(Date.now())
  )

  const saveFile = () => {
    saveAs("/lohe.pdf", "lohe.pdf")
  }

  // const defaultLayoutPluginInstance = defaultLayoutPlugin()
  function viewFile() {
    return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
        <div
          style={{
            height: "750px",
            width: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Viewer fileUrl="/lohe.pdf" />
        </div>
      </Worker>
    )
  }

  return (
    <>
      <div className="card  glass w-screen min-h-screen">
        <Image src="/wallpaper.jpg" objectFit="cover" layout="fill" alt="Lohe" />
        <div className="card-body absolute z-10 top-1">
          <h2 className="card-title">لوحه اعزام و پذیرش امروز مورخ: {curdate}</h2>
          <p>سازمان حمل و نقل ریلی شیراز</p>
          <div className="card-actions justify-end">
            <button onClick={saveFile} className="btn btn-secondary">
              دریافت لوحه
            </button>
            <ModalExample fileUrl={"/lohe.pdf"} />
          </div>
        </div>
      </div>
    
    </>
  )
}
