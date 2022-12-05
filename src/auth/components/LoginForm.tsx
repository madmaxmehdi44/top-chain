import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { Password } from "src/core/components/Password"
import { Mail } from "src/core/components/Mail"
import { Button, Card, Container, Grid, Row } from "@nextui-org/react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <>
      {/* <Row justify="center" align="center"> */}
      <Form
        submitText="login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <Grid.Container gap={1} justify="center" css={{ mx: "$1", px: "$1" }}>
          <Grid>
            <LabeledTextField type="email" name="email" label="ایمیل" placeholder="ایمیل" />
          </Grid>
          <Grid>
            <LabeledTextField name="password" label="رمز" placeholder="رمز" type="password" />
          </Grid>
          <Grid css={{ my: "$4" }}>
            <Link href={Routes.ForgotPasswordPage()}>فراموشی رمز</Link>
          </Grid>
        </Grid.Container>
      </Form>

      {/* </Row> */}
    </>
  )
}

export default LoginForm
