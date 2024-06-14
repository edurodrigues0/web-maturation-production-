import { Box, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box
      as="footer"
      w="100%"
      h="1rem"
      mt="1rem"
      display="flex"
      justifyContent="center"
    >
      <Text fontWeight="bold" fontSize="0.75rem" color="primary">
        Desenvolvido por Eduardo Rodrigues
      </Text>
    </Box>
  )
}
