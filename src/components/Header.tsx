import { Avatar, Flex, Heading, Input, Link, Text } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { ChangeEvent } from 'react'

type HeaderProps = {
  title?: string
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void
  isDateInput?: boolean
}

export function Header({
  title = 'Scala',
  onSearch,
  isDateInput,
}: HeaderProps) {
  const { admin } = useAuth()

  return (
    <Flex
      as="header"
      w="100%"
      py="2rem"
      px="2.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      {admin ? (
        <>
          <Heading fontSize="2.25rem" color="heading">
            {title}
          </Heading>

          {onSearch && (
            <Input
              type={isDateInput ? 'date' : 'text'}
              title="search"
              w="32rem"
              placeholder="Procure aqui..."
              py="0.875rem"
              px="1.5rem"
              onChange={(event) => onSearch(event)}
            />
          )}

          <Flex alignItems="center" gap="0.5rem">
            <Avatar
              w={['2rem', '3.5rem']}
              h={['2rem', '3.5rem']}
              bg="primary"
              name={admin.name}
              color="text"
            />
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text fontWeight={[400, 700]} fontSize={['xs', 'base', 'base']}>
                {admin.name}
              </Text>
              <Text
                as="span"
                fontWeight={200}
                fontSize={['xs']}
                color="secondary"
              >
                Admin
              </Text>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Heading
            fontSize={['1rem', '1.125rem', '2.25rem']}
            fontWeight="bold"
            color="heading"
          >
            {title}
          </Heading>

          <Link
            px={['1.5rem', '2.25rem', '3rem']}
            py={['0.25rem', '0.5rem']}
            bg="primary"
            fontSize={['0.75rem', '0.75rem', '1rem']}
            borderRadius="8px"
            color="text"
            fontWeight="bold"
            _hover={{
              textDecor: 'none',
              bg: 'teal.600',
            }}
            href="/login"
          >
            Login
          </Link>
        </>
      )}
    </Flex>
  )
}
