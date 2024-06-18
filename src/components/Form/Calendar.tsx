import { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'
import { CalendarProps, Calendar as ShadcnCalendar } from '../ui/calendar'
import { Label } from '../ui/label'
import {
  DayPickerDefaultProps,
  DayPickerProps,
  DayPickerProps,
} from 'react-day-picker'

type Props = CalendarProps & {
  title: string
  label?: string
  error?: FieldError
}

const CalendarBase: ForwardRefRenderFunction<DayPickerProps, Props> = (
  { title, label, error = null, ...rest },
  ref,
) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      {!!label && (
        <Label className="ml-1 uppercase text-xs" htmlFor={title}>
          {label}
        </Label>
      )}
      <ShadcnCalendar mode="single" id={title} {...rest} ref />
      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Calendar = forwardRef(CalendarBase)
