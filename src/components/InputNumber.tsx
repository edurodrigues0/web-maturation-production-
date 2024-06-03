import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputProps } from "@chakra-ui/react";

interface InputNumberProps extends NumberInputProps {}

export function InputNumber(props: InputNumberProps) {
  return (
    <NumberInput {...props} borderColor="gray.400">
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}