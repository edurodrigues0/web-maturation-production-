import { Flex } from "@chakra-ui/react";
import { Section } from "../components/Section";
import { Layout } from "../layout";
import { ProductionForm } from "../components/ProductionForm";

export function AuthProductionForm() {
  return (
    <Layout>
      <Flex
        w="100%"
        h="100%"
        px={["1rem", "1rem", "1rem"]}
      >
        <Section />
        <Flex
          px="2rem"
          borderWidth="2px"
          borderColor="purple.500"
          borderRadius="6px"
        >
          <ProductionForm />
        </Flex>
      </Flex>
    </Layout>
  )
}