import React from "react"
import "src/core/layouts/index.css"
// import "@react-pdf-viewer/core/lib/styles/index.css"
// import "@react-pdf-viewer/default-layout/lib/styles/index.css"

import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps, Routes } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { withBlitz } from "src/blitz-client"
// import { NextUIProvider } from "@nextui-org/react"
import router from "next/router"
import Link from "next/link"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <div>
        هشدار: لطفا ابتدا جهت ورود ثبت نام نمایید .{" "}
        <Link href={`${router.push(Routes.LoginPage().pathname.toLowerCase())}`}>
          ورود به سیستم
        </Link>
      </div>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent statusCode={error.statusCode} title="شما مجوز دسترسی به این بخش را ندارید." />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    // <NextUIProvider>
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
    // </NextUIProvider>
  )
}

export default withBlitz(MyApp)
