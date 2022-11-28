import React, { ComponentPropsWithoutRef, ReactNode } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledCheckboxFieldProps extends ComponentPropsWithoutRef<"input"> {
  /** Field name. */
  name: string
  /** Field label. */
  label: ReactNode
  outerProps?: ComponentPropsWithoutRef<"div">
  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledCheckboxField = React.forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, className, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      type: "checkbox",
      ...fieldProps,
    })
    const id = new Date().toString() + Math.random()

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div {...outerProps}>
        <div className="flex space-x-2 text-sm">
          <div className="h-5">
            <input
              id={id}
              key={id}
              disabled={submitting}
              ref={ref}
              {...input}
              {...props}
              className="h-4 w-4 text-indigo-600 rounded-sm shadow-sm"
            />
          </div>
          <label htmlFor={id} {...labelProps} className="mt-px select-none">
            {label}
            <div role="alert" className="mt-1 text-sm font-bold text-red-700">
              {showError && normalizedError}
            </div>
          </label>
        </div>
      </div>
    )
  }
)
