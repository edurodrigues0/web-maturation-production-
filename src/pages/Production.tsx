import { Box, Divider, Heading } from '@chakra-ui/react'
import { Layout } from '../layout'
import { ProductionForm } from '../components/ProductionForm'
import { Header } from '../components/Header'

export function Production() {
  return (
    <Layout>
      <Header />
      <Box
        w={['20rem', '20rem', '30rem']}
        mx="auto"
        mt="1rem"
        p="1.5rem"
        rounded="8px"
        boxShadow="2xl"
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading color="heading">Produção</Heading>

        <Divider orientation="horizontal" h="2px" bg="gray.900" mt="1rem" />

        <ProductionForm />
      </Box>
    </Layout>
  )
}
