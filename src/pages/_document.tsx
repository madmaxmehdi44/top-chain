import Document, { Html, Main, NextScript, Head, DocumentContext } from "next/document"
// import { CssBaseline } from "@nextui-org/react"
import React from "react"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      // styles: React.Children.toArray([initialProps.styles]),
    }
  }
  render() {
    return (
      <Html lang="fa" dir="rtl" data-theme="fantacy">
        {/* <Head>{CssBaseline.flush()}</Head> */}
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
