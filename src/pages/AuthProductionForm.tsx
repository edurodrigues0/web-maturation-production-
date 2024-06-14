import { Flex } from '@chakra-ui/react'
import { Layout } from '../layout'
import { ProductionForm } from '../components/ProductionForm'
import { SideMenu } from '../components/SideMenu'

export function AuthProductionForm() {
  return (
    <Layout>
      <Flex w="100%" h="100%" p={['1rem', '1rem', '1rem']}>
        <SideMenu />
        <Flex p="3rem">
          <ProductionForm />
        </Flex>
      </Flex>
    </Layout>
  )
}
