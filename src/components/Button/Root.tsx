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
      colorScheme="cyan"
      color="gray.50"
      textAlign="start"
      variant={isActive}
      _active={{
        backgroundColor: 'primary'
      }}
      _hover={{
        backgroundColor: 'teal.500'
      }}
      {...props}
    >
      <Text w="full">
        {props.children}
      </Text>
    </Button>
  )
}