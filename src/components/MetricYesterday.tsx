import { Divider, Flex, Grid, Text } from "@chakra-ui/react";

type ProductionType = "Alcool" | "Finaltrim" | "DoubleSidedGlue"

type MetricYesterdayProps = {
  type?: ProductionType
  averangeTotal?: number
  totalOfPieces?: number
  totalOfRegister?: number
}

export function MetricYesterday({
  type = 'Alcool',
  averangeTotal = 0,
  totalOfPieces = 0,
}: MetricYesterdayProps) {
  
  function productionType (type: ProductionType) {
    if (type === 'DoubleSidedGlue') {
      return 'Dois lados'
    }

    if (type === 'Finaltrim') {
      return 'Arremate'
    }

    return 'Alcool'
  }

  const isTypeAlcool = productionType(type)

  const convertedInLiters = averangeTotal >= 1 ? averangeTotal / 1000 : 0
  const averange = totalOfPieces / averangeTotal

  return (
    <Grid
      p="0.5rem"
      rounded="6px"
      bg="background"
      templateColumns="repeat(5, 1fr)"
    >
      <Flex
        flexDir="column" 
        gap="0.25rem"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          fontWeight="bold"
          fontSize="0.825rem"
          color="text"
        >
          { isTypeAlcool }
        </Text>

        <Text
          fontWeight="bold"
          fontSize="1.25rem"
        >
          { convertedInLiters }L 
        </Text>
      </Flex>

      <Divider 
        orientation="vertical"
        borderColor="primary"
        mx="auto"
      />

      <Flex
        flexDir="column" 
        gap="0.5rem"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          fontWeight="bold"
          fontSize="0.825rem"
          color="text"
        >
          Total de pçs
        </Text>

        <Text
          fontWeight="bold"
          fontSize="1.25rem"
        >
          { totalOfPieces }
        </Text>
      </Flex>

      <Divider 
        orientation="vertical"
        borderColor="primary"
        mx="auto"
      />

      <Flex
        flexDir="column" 
        gap="0.5rem"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          fontWeight="bold"
          fontSize="0.825rem"
          color="text"
        >
          Média por pç
        </Text>

        <Text
          fontWeight="bold"
          fontSize="1.25rem"
        >
          { averange >= 1 ? averange : 0 }L
        </Text>
      </Flex>
    </Grid>
  )
}