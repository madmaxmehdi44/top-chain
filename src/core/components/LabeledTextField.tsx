import { Container, Grid, Input, Text } from "@nextui-org/react"
import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Mail } from "./Mail"
import { Password } from "./Password"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <>
        <Grid.Container gap={2}>
          <Grid>
            <Input
              {...input}
              //{...props}
              type={props.type}
              fullWidth={true}
              clearable
              disabled={submitting}
              color="secondary"
              size="lg"
              labelPlaceholder={props.placeholder}
              // label={label}
              // contentLeftStyling={true}
              contentLeft={
                props.type === "password" ? (
                  <Password fill="currentColor" size={24} height={12} width={12} />
                ) : (
                  <Mail fill="currentColor" size={24} height={12} width={12} />
                )
              }
              // contentRight={<Mail fill="currentColor" size={24} height={12} width={12} />}
              ref={ref}
            />
            {touched && normalizedError && (
              <div role="alert" style={{ color: "orchid" }}>
                <Text>اطلاعات صحیح نیست</Text>
                {normalizedError}
              </div>
            )}
          </Grid>
        </Grid.Container>
      </>
    )
  }
)

export default LabeledTextField
