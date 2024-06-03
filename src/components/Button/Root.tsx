import { Button, ButtonProps, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface RootProps extends ButtonProps {
  children: ReactNode
  isActive?: boolean
}

export function Root(props: RootProps) {
  const isActive = props.isActive ? 'solid' : 'ghost'

  return (
    <Button
      h="3.25rem"
      w="full"
      colorScheme="purple"
      textAlign="start"
      variant={isActive}
      _active={{
        backgroundColor: 'purple.400'
      }}
      _hover={{
        backgroundColor: 'purple.300'
      }}
      {...props}
    >
      <Text w="full">
        {props.children}
      </Text>
    </Button>
  )
}