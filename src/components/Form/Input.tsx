import { 
  NumberInput as ChakraNumberInput, 
  NumberInputProps as ChakraInputProps, 
  FormControl, 
  FormLabel, 
  FormErrorMessage, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper 
} from '@chakra-ui/react'
import { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

interface NumberInputProps extends ChakraInputProps {
  title: string
  label?: string
  error?: FieldError
}

const NumberInputBase: ForwardRefRenderFunction<HTMLInputElement, NumberInputProps> 
  = ({ title, label, error = null, ...rest}, ref) => {
    return (
      <FormControl isInvalid={!!error} mt="1rem">
        {!!label && <FormLabel htmlFor={title}>{ label }</FormLabel>}

        <ChakraNumberInput
          id={title}
          {...rest}
          ref={ref}
          borderColor="gray.400"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </ChakraNumberInput>

        {!!error && (
          <FormErrorMessage mt="0.5rem">
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    )
  }

  export const NumberInput = forwardRef(NumberInputBase)