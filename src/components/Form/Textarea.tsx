import { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'
import { Label } from '../ui/label'
import { Textarea as ShadcnTextarea, TextareaProps } from '../ui/textarea'

type Props = TextareaProps & {
  title: string
  label?: string
  error?: FieldError
}

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
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
      <ShadcnTextarea id={title} {...rest} ref={ref} />
      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Textarea = forwardRef(TextareaBase)
