import { Button, Flex, Heading } from '@chakra-ui/react'
import { Layout } from '../layout'
import { useNavigate } from 'react-router-dom'

export function Tasks() {
  const navigate = useNavigate()

  return (
    <Layout>
      <Flex
        w="100%"
        h="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <Heading>Ops... Esta página está em obra, volte mais tarde! 🏗️</Heading>

        <Button
          colorScheme="pink"
          w="15rem"
          fontWeight={700}
          onClick={() => navigate('/')}
        >
          Retornar
        </Button>
      </Flex>
    </Layout>
  )
}
