import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box
      as="footer"
      w="100%"
      mt="1rem"
      display="flex"
      justifyContent="center"
    >
      <Text
        fontWeight="bold"
        fontSize="0.825rem"
        color="purple.700"
      >
        Desenvolvido por Eduardo Rodrigues
      </Text>
    </Box>
  )
}