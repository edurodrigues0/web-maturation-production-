import { Avatar, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const { admin } = useAuth()

  return (
    <Flex
      as="header"
      w="100%"
      py="2rem"
      px={["1rem", "1rem", "1rem"]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        fontSize={["1rem", "1.125rem", "1.76rem"]}
        w="15rem"
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
              w={["2rem", "3rem"]}
              h={["2rem", "3rem"]}
              bg="purple.700"
              name={admin.name}
              color="gray.200"
            />
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text
                fontWeight={[400, 700]}
                fontSize={["xs", "base", "base"]}
              >
                { admin.name }
              </Text>
              <Text 
                as="span"
                fontWeight={200}
                fontSize={["xs"]}
                color="gray.500"
              >
                Admin
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Link
            px={["1.5rem", "2.25rem", "3rem"]}
            py={["0.25rem","0.5rem"]}
            bg="purple.500"
            fontSize={["0.75rem", "0.75rem", "1rem"]}
            borderRadius="8px"
            color="gray.100"
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