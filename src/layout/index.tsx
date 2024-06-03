import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { ReactNode } from "react";
import { Footer } from "../components/Footer";

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Flex
      maxW={1280}
      w='100%'
      h='100vh'
      mx='auto'
      flexDir="column"
      position="relative"
    >
      <Header />
      {children}
      <Footer />
    </Flex>
  )
}