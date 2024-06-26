import { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'
import { InputProps, Input as ShadcnInput } from '../ui/input'
import { Label } from '../ui/label'

type Props = InputProps & {
  title: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { title, label, error = null, ...rest },
  ref,
) => {
  return (
    <div className="grid w-full max-w-xl items-center gap-2">
      {!!label && (
        <Label className="ml-1 uppercase text-xs" htmlFor={title}>
          {label}
        </Label>
      )}
      <ShadcnInput id={title} {...rest} ref={ref} />
      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
