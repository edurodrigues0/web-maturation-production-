import { Avatar, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const { admin } = useAuth()

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
        admin ? (
          <Flex
            alignItems="center"
            gap="0.5rem"
          >
            <Avatar 
              bg="purple.700"
              name={admin.name}
            />
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text
                fontWeight="bold"
                fontSize="base"
              >
                {admin.name}
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
          <Link
            px="3rem"
            py="0.5rem"
            bg="purple.500"
            borderRadius="8px"
            color="gray.300"
            fontWeight="bold"
            _hover={{
              textDecor: "none",
              bg: "purple.600"
            }}
            href="/login"
          >
            Login
          </Link>
        )}
    </Flex>
  )
}