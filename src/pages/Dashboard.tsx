import { Box, Flex, Heading } from '@chakra-ui/react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import { Layout } from "../layout"
import { Section } from '../components/Section'
import { MetricYesterday } from '../components/MetricYesterday';

export function Dashboard() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
          ml="1rem"
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
              <AreaChart
                width={780}
                height={340}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: -10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </Box>

            <Flex
              w="400px"
              h="100%"
              p="1rem"
              flexDir="column"
              gap="1rem"
              bg="gray.200"
              rounded="6px"
            >
              <MetricYesterday 
                averangeTotal={100}
                totalOfPieces={70000}
                totalOfRegister={24}
              />
              <MetricYesterday 
                type='GlueFilm'
                averangeTotal={60.5}
                totalOfPieces={14000}
                totalOfRegister={12}
              />
            </Flex>
          </Flex>

          <Flex
            flex={1}
            gap="1.5rem"
          >
            <Box 
              w="400px"
              h="100%"
              bg="yellow.400"
            />
            <Box 
              w="400px"
              h="100%"
              bg="green.400"
            />
            <Box 
              w="400px"
              h="100%"
              bg="cyan.400"
            />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}