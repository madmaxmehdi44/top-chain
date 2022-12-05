import React, { useState } from "react"
import ReactDOM from "react-dom"
import { ScrollMode, Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core"
import { pdfjs } from "react-pdf"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { MdPreview } from "react-icons/md"
import { FaWindowClose } from "react-icons/fa"

import { Button, Container, Text } from "@nextui-org/react"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
interface ModalExampleProps {
  fileUrl: string
}

export default function ModalExample({ fileUrl }): JSX.Element {
  const [shown, setShown] = useState(false)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  // const { toggleTab } = defaultLayoutPluginInstance
  // toggleTab(1)
  const modalBody = () => (
    <Container
      style={{
        backgroundColor: "#fff",
        flexDirection: "column",
        overflow: "hidden",

        /* Fixed position */
        left: 0,
        right: 0,
        position: "fixed",
        top: 0,

        /* Take full size */
        height: "100%",
        width: "100%",

        /* Displayed on top of other elements */
        zIndex: 9999,
      }}
    >
      <Container
        style={{
          alignItems: "center",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          padding: ".5rem",
        }}
      >
        <div>فایل لوحه</div>
        <FaWindowClose
          fill="currentColor"
          style={{
            marginRight: "auto",

            cursor: "pointer",
          }}
          onClick={() => setShown(false)}
        />
      </Container>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Container
          style={{
            flexGrow: 1,
            overflow: "auto",
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "100%",
            width: "100%",
            // direction: "ltr",
          }}
        >
          <Viewer
            fileUrl={fileUrl}
            // plugins={[defaultLayoutPluginInstance]}
            scrollMode={ScrollMode.Wrapped}
            defaultScale={SpecialZoomLevel.PageWidth}
          />
        </Container>
      </Worker>
    </Container>
  )

  return (
    <>
      <button onClick={() => setShown(true)} className="btn btn-warning ">
        مشاهده سریع لوحه
      </button>
      {/* <Button
        iconRight={<MdPreview className=" text-xl " />}
        onClick={() => setShown(true)}
        shadow
        color="primary"
        auto
        className="animate-pulse "
      >
        <Text className="animate-pulse text-md font-bold ">مشاهده لوحه</Text>
      </Button> */}
      {shown && ReactDOM.createPortal(modalBody(), document.body)}
    </>
  )
}
