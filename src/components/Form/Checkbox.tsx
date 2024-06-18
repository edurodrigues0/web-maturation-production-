import { Control, Controller, FieldError, Merge } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'

type Item = {
  id: string
  label: string
}

type CheckboxFormProps = {
  items: Item[]
  control: Control<any>
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
  items,
  control,
  error,
}) => {
  return (
    <div className={`my-4 ${error === null ? 'border-red-500' : ''}`}>
      <span className="block text-sm font-medium">Select Options</span>
      <Controller
        name="activitiesArray"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div className="flex flex-wrap item-center gap-x-4">
            {items.map((item) => (
              <div key={item.id}>
                <label className="flex items-center mt-2">
                  <Checkbox
                    checked={field.value.includes(item.id)}
                    onCheckedChange={(isChecked) => {
                      if (isChecked) {
                        field.onChange([...field.value, item.id])
                      } else {
                        field.onChange(
                          field.value.filter((val: string) => val !== item.id),
                        )
                      }
                    }}
                    className="form-checkbox h-4 w-4 text-slate-900 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm">{item.label}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}

export default CheckboxForm
