import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Organization } from "./organizations/[organizationId]"
import { Button, Container, Grid, Loading, Spacer } from "@nextui-org/react"
import { LoheCard } from "src/lohes/components/LoheCard"
import { Vazirmatn } from "@next/font/google"

// import { Viewer, Worker } from "@react-pdf-viewer/core"
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logoutMutation] = useMutation(logout)

//   if (currentUser.id) {
//     return (
//       <>
//           <Button
//             color={"secondary"}
//             onClick={async () => {
//               await logoutMutation()
//             }}
//           >
//             Logout
//           </Button>

//           <Spacer y={0.5} />

//           <div>
//             User id: <code>{currentUser.id}</code>
//             <br />
//             E-Mail: <code>{currentUser.email}</code>
//             <br />
//             User Role: <code>{currentUser.memberships?.map((mb) => mb.role)}</code>
//           </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         {/* <Container> */}
//           <Link href={Routes.SignupPage()}>
//             <a className="button small">
//               <strong>Sign Up</strong>
//             </a>
//           </Link>
//           <Link href={Routes.LoginPage()}>
//             <a className="button small">
//               <strong>Login</strong>
//             </a>
//           </Link>
//         {/* </Container> */}
//       </>
//     )
//   }
// }
const vazirmatn = Vazirmatn({ subsets: ["arabic"] })

const Home: BlitzPage = () => {
  return (
    <Layout title="سامانه های همیار سیستمی">
      <Grid.Container className="gap-2 justify-center">
        <Grid xs={12} md={10}>
          <Suspense fallback="درحال بارگزاری ...">
            <LoheCard />
          </Suspense>
        </Grid>
        {/* <Grid xs={12} sm={9}>
          <LoheCard />
        </Grid>
        <Grid xs={12} sm={9}>
          <LoheCard />
        </Grid> */}
      </Grid.Container>
    </Layout>
  )
}

export default Home
