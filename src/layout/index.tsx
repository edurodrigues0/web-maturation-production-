import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Footer } from '../components/Footer'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Flex
      maxW={1920}
      w="100%"
      h="100vh"
      mx="auto"
      flexDir="column"
      position="relative"
    >
      {children}
      <Footer />
    </Flex>
  )
}
