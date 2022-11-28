import * as React from "react"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

interface SinglePageViewExampleProps {
  fileUrl: string
}

const SinglePageViewExample: React.FC<SinglePageViewExampleProps> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  return (
    <React.Suspense>
      <Worker workerUrl="/pdf.worker.js">
        <div
          style={{
            height: "750px",
            width: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Viewer fileUrl={fileUrl}  />
        </div>
      </Worker>
    </React.Suspense>

    // <div
    //   style={{
    //     border: "1px solid rgba(0, 0, 0, 0.3)",
    //     height: "750px",
    //   }}
    // >
    //   <Viewer fileUrl={fileUrl} defaultScale={SpecialZoomLevel.PageFit} />
    // </div>
  )
}

export default SinglePageViewExample
