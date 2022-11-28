import { Card, Col, Row, Button, Text, Loading } from "@nextui-org/react"
import saveAs from "file-saver"
import { IoDownload, IoCloudDownloadOutline, IoSend } from "react-icons/io5"
import { MdPreview } from "react-icons/md"
// import SinglePagePDFViewer from "src/core/components/PDF/SinglePageViewExample"
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core"
import ModalExample from "src/core/components/PDF/ModalExample"
// import SinglePageViewExample from "src/core/components/PDF/SinglePageViewExample"
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

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
      <Card className="w-screen min-h-screen scroll-auto" dir="rtl">
        <Card.Header className="absolute z-10 top-1">
          <Col>
            <code className="text-2xl text-[#0f111466] p-1"> سازمان حمل و نقل ریلی شیراز</code>

            <Text className="datePicker text-2xl justify-center  p-2  ">
              <code className="text-green-700 text-2xl font-bold "> لوحه امروز </code>

              <code className="text-violet-800 text-3xl font-bold p-2 m-1"> {curdate} </code>
            </Text>
          </Col>
        </Card.Header>
        <Card.Body className="p-0">
          <Card.Image
            src="./wallpaper.jpg"
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Lohe"
          />

        </Card.Body>
        <Card.Footer
          isBlurred
          className="gap-2  backdrop-blur-xl bg-[#0f111466]  border-t-gray-800 bottom-0 z-10 "
        >
                    <Row className="bg-red-700 opacity-80 rounded-md gap-2 hidden lg:flex">
            <Col span={1}>
              <Card.Image
                src="/favicon.ico"
                className=" p-0 m-0.5"
                height={40}
                width={40}
                alt="لوحه"
              />
            </Col>
            <Col>
              <Text color="#d1d1d1" size={14}>
                لوحه اعزام و پذیرش
              </Text>
              <Text color="#d1d1d1" size={10}>
                لطفا به ساعت اعزام خود دقت فرمایید
              </Text>
            </Col>
          </Row>
          <Row className="gap-1">
            <Col>
              <Row className="justify-end gap-2 ">
                <Col span={6}>
                  <ModalExample fileUrl={"/lohe.pdf"} />
                </Col>
                <Col span={6}>
                  <Button
                    iconRight={
                      <IoCloudDownloadOutline className="animate-bounce text-xl font-bold " />
                    }
                    onPress={saveFile}
                    shadow
                    color="success"
                    auto
                  >
                    {/* <Loading color="currentColor" size="sm" /> */}
                    <Text className=" text-md font-bold">دریافت لوحه</Text>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}
