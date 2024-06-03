import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";

export function Header() {
  const isValidToken = true

  return (
    <Flex
      as="header"
      w="100%"
      py='2rem'
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        fontSize="3rem"
        fontWeight="bold"
        color="purple.700"
      >
        Scala - Maturação
      </Heading>

      {
        isValidToken ? (
          <Flex
            alignItems="center"
            gap="0.5rem"
          >
            <Avatar bg="purple.700" />
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text
                fontWeight="bold"
                fontSize="base"
              >
                Eduardo Rodrigues
              </Text>
              <Text 
                as="span"
                fontSize="sm"
                color="gray.500"
              >
                Admin
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Button
            w="8rem"
            h="2.25rem"
            colorScheme="purple"
          >
            Login
          </Button>
        )}
    </Flex>
  )
}