import { Box, Divider, Flex, Text } from "@chakra-ui/react";

type ProductionType = 'Alcool' | 'Finaltrim' | 'DoubleSidedGlue'

interface MetricYesterdayProps {
  type?: ProductionType
  averangeTotal: number
  totalOfPieces: number
  totalOfRegister: number
}

export function MetricYesterday({
  type = 'Alcool',
  averangeTotal = 0,
  totalOfPieces = 0,
  totalOfRegister = 0,
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

  return (
    <Box
      px="1rem"
      py="0.5rem"
      flex={1}
      display="flex"
      rounded="6px"
      bg="gray.100"
      gap="0.5rem"
    >
      <Flex
        w="6.25rem"
        flexDir="column" 
        gap="0.25rem"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          fontWeight="bold"
          fontSize="0.825rem"
          color="gray.500"
        >
          { isTypeAlcool }
        </Text>

        <Text
          fontWeight="bold"
          fontSize="1.25rem"
        >
          { averangeTotal }L
        </Text>
      </Flex>

      <Divider 
        orientation="vertical"
        borderColor="gray.400"
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
          color="gray.500"
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
        borderColor="gray.400"
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
          color="gray.500"
        >
          Total de registros
        </Text>

        <Text
          fontWeight="bold"
          fontSize="1.25rem"
        >
          { totalOfRegister }
        </Text>
      </Flex>
    </Box>
  )
}