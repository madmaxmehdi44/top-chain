import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  useTheme,
  Text,
  Container,
  Navbar,
  Button,
  Spacer,
  Dropdown,
  Avatar,
  Modal,
  Row,
  Checkbox,
  Input,
  Card,
} from "@nextui-org/react"

import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
// import router from "next/router"
// import { Password } from "../components/Password"
// import { Mail } from "../components/Mail"
// import LoginPage from "src/pages/auth/login"
import LoginForm from "src/auth/components/LoginForm"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [visible, setVisible] = React.useState(false)
  const handler = () => setVisible(true)
  const closeHandler = () => {
    setVisible(false)
    console.log("closed")
  }

  if (currentUser.id) {
    return (
      <>
        <Dropdown placement="bottom">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$23" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                اطلاعات راهبر:
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="email" css={{ height: "$23", flex: "content" }}>
              <Text color="success">
                {/* ایمیل شما {currentUser.email} و [{currentUser.memberships?.map((uss) => uss.role)}] */}
                نام کاربری: <code>{currentUser.name || "بدون نام"}</code>
              </Text>
              <Text>
                ایمیل:<code>{currentUser.email}</code>
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              تنظیمات من
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">وضعیت شغلی</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              تحلیل و گزارشات
            </Dropdown.Item>
            <Dropdown.Item key="system">راهبری</Dropdown.Item>
            <Dropdown.Item key="configurations">پیکربندی</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              راهنما و بازخورد
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              <Text
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                خروج از حساب
              </Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    )
  } else {
    return (
      <>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                size="lg"
                color="primary"
                title="Tony Reichert"
                alt="@tonyreichert"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => {
              // console.log(actionKey === "profile" ? actionKey : "Nop")
              if (actionKey === "profile") {
                handler()
                console.log("Modal Opened")
              } else if (actionKey === "") {
              }
            }}
          >
            <Dropdown.Item
              key="profile"
              textValue="ورود به حساب"
              title="ورود به حساب"
              command="⌘M"
              description="Create a new file"
            >
              {/* <Button   onClick={handler}>
              ورود به حساب
            </Button> */}
              {/* <a key="profile" style={{ backgroundColor: "darksalmon" }} onClick={handler}> */}
              {/* <Text b color="inherit" css={{ d: "flex" }}> */}
              {/* ورود به حساب */}
              {/* </Text> */}
              {/* </a> */}
            </Dropdown.Item>
            <Dropdown.Item
              key="login"
              command="⌘⇧F"
              description="Allows you to edit the file"
              withDivider
            >
              <Link href={Routes.SignupPage()}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  ثبت نام مجانی
                </Text>
              </Link>
            </Dropdown.Item>

            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Modal closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
          <Modal.Body>
            <Card variant="bordered" css={{ mw: "stretch" }}>
              <Card.Body>
                <LoginForm />
              </Card.Body>
              <Card.Footer>
                <Row justify="center" align="stretch">
                  <Link href={Routes.SignupPage()}>
                    <Button>عضو جدید هستم</Button>
                  </Link>
                </Row>
              </Card.Footer>
            </Card>

            {/* <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="ایمیل"
            contentLeft={<Mail fill="currentColor"  />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row> */}
          </Modal.Body>

          {/* <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer> */}
        </Modal>
      </>
    )
  }
}

const collapseItems = [
  ["لوحه اعزام و پذیرش", ""],
  ["فروشگاه ها", "stores"],
  ["پروژه ها", "projects"],
  ["راهنما", "help"],
  ["اخبار", "team"],
  ["قوانین", "legal"],
  ["سازمان", "company"],
]

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  // const { theme } = useTheme()
  const { asPath } = useRouter()
  return (
    <>
      <Head>
        <title>{title || "سامانه های همیار سیستمی"}</title>
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          {/* <AcmeLogo /> */}
          <Text b color="inherit" hideIn="xs">
            سامانه های همیار سیستمی
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          {collapseItems.map((item, index) => {
            if (asPath === "/" + item[1])
              return (
                <Link color="secondary" key={index} href={"/" + item[1]} legacyBehavior>
                  <Navbar.Link isActive key={index}>
                    {item[0]}
                  </Navbar.Link>
                </Link>
              )
            else
              return (
                <Link color="success" key={index} href={"/" + item[1]} legacyBehavior>
                  <Navbar.Link key={index}>{item[0]}</Navbar.Link>
                </Link>
              )
          })}
        </Navbar.Content>

        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfo />
          </Suspense>
        </Navbar.Content>

        {/* Humberger Menu */}
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item[1]}>
              <Link color="primary" href={"/" + item[1]} legacyBehavior>
                {item[0]}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      {children}

      {/* Login.redirectAuthenticatedTo = "/" */}
      {/* <Container className="bg-black text-center">
        <footer>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            طراحی و توسعه سامانه: مهدی زاده مینایی
          </Link>
        </footer>
      </Container> */}
    </>
  )
}

export default Layout
