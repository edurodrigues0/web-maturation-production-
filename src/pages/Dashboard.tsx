import { Box, Flex, Heading } from '@chakra-ui/react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Layout } from "../layout"
import { Section } from '../components/Section'
import { MetricYesterday } from '../components/MetricYesterday';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Metrics = {
  id: string
  month: number
  year: number
  sumOfMinilitersOfAlcool: number
  sumOfMinilitersOfDoubleSidedGlue: number
  sumOfMinilitersOfFinalTrim: number
  totalOfPiecesOfAlcool: number
  totalOfPiecesOfDoubleSidedGlue: number
  totalOfPiecesOfFinalTrim: number
}

export function Dashboard() {
  const [metricsYesterday, setMetricsYesterday] = useState<Metrics>()
  const [metricsOnLastTwelveMonths, setMetricsOnLastTwelveMonths] = useState<Metrics[]>([])
  useEffect(() => {
    api.get(
      '/metrics/consume-on-last-day'
    ).then((response) => { 
      setMetricsYesterday(response.data.metricsOnLastDay)
    })
  
    api.get(
      '/metrics/consume-on-last-twelve-months'
    ).then((response) => { 
      setMetricsOnLastTwelveMonths(response.data.metricsOnLastTwelveMonths)
    })
  }, [])

  function formatMonthAndYear(month: number, year: number) {
    const formattedMonth = String(month).padStart(2, '0');

    return `${year}/${formattedMonth}`;
  }

  const dataOnLastTwelveMonths = metricsOnLastTwelveMonths.map((metric) => {
    return {
      "data": formatMonthAndYear(metric.month, metric.year),
      "Total de alcool(L)": metric.sumOfMinilitersOfAlcool,
      "Total de dois lados(L)": metric.sumOfMinilitersOfDoubleSidedGlue,
      "Total de arremate(L)": metric.sumOfMinilitersOfFinalTrim,
    }
  })

  const dataTotalPiecesOnLastTwelveMonths = metricsOnLastTwelveMonths.map((metric) => {
    return {
      "data": formatMonthAndYear(metric.month, metric.year),
      "Total de peças alcool": metric.totalOfPiecesOfAlcool,
      "Total de peças dois lados": metric.totalOfPiecesOfDoubleSidedGlue,
      "Total de peças arremate": metric.totalOfPiecesOfFinalTrim,
    }
  })

  const averangeLiterForPiece = metricsOnLastTwelveMonths.map((metric) => {
    return {
      data: formatMonthAndYear(metric.month, metric.year),
      "Média de litros por peça no alcool": metric.totalOfPiecesOfAlcool / (metric.sumOfMinilitersOfAlcool / 1000),
      "Média de litros por peça em dois lados": metric.totalOfPiecesOfDoubleSidedGlue / (metric.sumOfMinilitersOfDoubleSidedGlue / 1000),
      "Média de litros por peça no arremate": metric.totalOfPiecesOfFinalTrim / (metric.sumOfMinilitersOfFinalTrim / 1000)
    }
  })

  return (
    <Layout>
      <Flex
        w="100%"
        h="100%"
      >
        <Section />

        <Flex
          flex={1}
          bg="gray.100"
          p="1.875rem"
          gap="1.5rem"
          flexDirection="column"
        >
          <Heading 
            color="purple.700"
          >
            Dashboard
          </Heading>

          <Flex
            w="100%"
            h="360px"
            gap="1.5rem"
          >
            <Box
              flex={1}
              bg="gray.200"
              rounded="6px"
              p="1rem"
            >
              <Heading fontSize="1.25rem" color="purple.500">
                Consumo de litros nos ultimos 12 meses
              </Heading>
              <ResponsiveContainer>
                <AreaChart
                  width={780}
                  height={340}
                  data={dataOnLastTwelveMonths}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone"
                    stackId="1"
                    dataKey="Total de alcool(L)" 
                    stroke="#8b11fd" 
                    fill="#8c50c0" 
                  />

                  <Area 
                    type="monotone"
                    stackId="1"
                    dataKey="Total de dois lados(L)" 
                    stroke="#02abff" 
                    fill="#0c4ba9" 
                  />

                  <Area 
                    type="monotone"
                    stackId="1"
                    dataKey="Total de arremate(L)" 
                    stroke="#f31b29" 
                    fill="#e96e8f" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            <Flex
              w="400px"
              h="100%"
              p="1rem"
              flexDir="column"
              gap="0.5rem"
              bg="gray.200"
              rounded="6px"
            >
              <Heading fontSize="1.25rem" color="purple.500">
                Consumo de ontem
              </Heading>
              <MetricYesterday 
                averangeTotal={metricsYesterday?.sumOfMinilitersOfAlcool}
                totalOfPieces={metricsYesterday?.totalOfPiecesOfAlcool}
              />
              <MetricYesterday 
                type='DoubleSidedGlue'
                averangeTotal={metricsYesterday?.sumOfMinilitersOfDoubleSidedGlue}
                totalOfPieces={metricsYesterday?.totalOfPiecesOfDoubleSidedGlue}
              />
              <MetricYesterday 
                type='Finaltrim'
                averangeTotal={metricsYesterday?.sumOfMinilitersOfFinalTrim}
                totalOfPieces={metricsYesterday?.totalOfPiecesOfFinalTrim}
              />
            </Flex>
          </Flex>

          <Flex
            flex={1}
            gap="1.5rem"
          >
            <Box 
              flex={1}
              h="21.875rem"
              p="1rem"
              bg="gray.200"
            >
              <Heading fontSize="1.125rem" color="purple.500">
                Total de peças feitas nos ultimos 12 meses
              </Heading>
              <ResponsiveContainer>
                <BarChart
                  width={780}
                  height={340}
                  data={dataTotalPiecesOnLastTwelveMonths}
                  margin={{
                    top: 0,
                    right: 10,
                    left: -10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="Total de peças alcool" 
                      fill="#8c50c0" 
                      activeBar={<Rectangle fill="purple" stroke="blue" />} 
                    />
                    <Bar 
                      dataKey="Total de peças dois lados" 
                      fill="#0c4ba9" 
                      activeBar={<Rectangle fill="cyan" stroke="purple" />} 
                    />
                    <Bar 
                      dataKey="Total de peças arremate" 
                      fill="#e96e8f" 
                      activeBar={<Rectangle fill="pink" stroke="purple" />} 
                    />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            <Box 
              w="25rem"
              h="21.875rem"
              p="1rem"
              bg="gray.200"
            >
              <Heading fontSize="1rem" color="purple.500">
                Média de litros por peças nos ultimos 12 meses
              </Heading>
              <ResponsiveContainer>
                <AreaChart
                  width={780}
                  height={340}
                  data={averangeLiterForPiece}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone"
                    stackId="1"
                    dataKey="Média de litros por peça no alcool" 
                    stroke="#8b11fd" 
                    fill="#8c50c0" 
                  />

                  <Area 
                    type="monotone"
                    stackId="1"
                    dataKey="Média de litros por peça em dois lados" 
                    stroke="#02abff" 
                    fill="#0c4ba9" 
                  />

                  <Area 
                    type="monotone"
                    stackId="1"
                    dataKey="Média de litros por peça no arremate" 
                    stroke="#f31b29" 
                    fill="#e96e8f" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}