import { Box, Divider, Flex, Text } from "@chakra-ui/react";

interface MetricYesterdayProps {
  type?: 'Alcool' | 'GlueFilm'
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
  const isTypeAlcool = type === 'Alcool' ? 'Total de alcool' : 'Total de cola'

  return (
    <Box
      p="1rem"
      flex={1}
      display="flex"
      rounded="6px"
      bg="gray.100"
      gap="0.5rem"
    >
      <Flex
        w="6.25rem"
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
          { isTypeAlcool }
        </Text>

        <Text
          fontWeight="bold"
          fontSize="2rem"
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
          fontSize="2rem"
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
          fontSize="2rem"
        >
          { totalOfRegister }
        </Text>
      </Flex>
    </Box>
  )
}