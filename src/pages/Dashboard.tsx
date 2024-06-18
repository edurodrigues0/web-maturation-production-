import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Layout } from '../layout'
import { MetricYesterday } from '../components/MetricYesterday'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { SideMenu } from '../components/SideMenu'
import { Header } from '../components/Header'

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
  const [metricsOnLastTwelveMonths, setMetricsOnLastTwelveMonths] = useState<
    Metrics[]
  >([])
  useEffect(() => {
    api.get('/metrics/consume-on-last-day').then((response) => {
      setMetricsYesterday(response.data.metricsOnLastDay)
    })

    api.get('/metrics/consume-on-last-twelve-months').then((response) => {
      setMetricsOnLastTwelveMonths(response.data.metricsOnLastTwelveMonths)
    })
  }, [])

  function formatMonthAndYear(month: number, year: number) {
    const formattedMonth = String(month).padStart(2, '0')

    return `${year}/${formattedMonth}`
  }

  const dataOnLastTwelveMonths = metricsOnLastTwelveMonths.map((metric) => {
    return {
      data: formatMonthAndYear(metric.month, metric.year),
      'Total de alcool(L)': metric.sumOfMinilitersOfAlcool,
      'Total de dois lados(L)': metric.sumOfMinilitersOfDoubleSidedGlue,
      'Total de arremate(L)': metric.sumOfMinilitersOfFinalTrim,
    }
  })

  const dataTotalPiecesOnLastTwelveMonths = metricsOnLastTwelveMonths.map(
    (metric) => {
      return {
        data: formatMonthAndYear(metric.month, metric.year),
        'Total de peças alcool': metric.totalOfPiecesOfAlcool,
        'Total de peças dois lados': metric.totalOfPiecesOfDoubleSidedGlue,
        'Total de peças arremate': metric.totalOfPiecesOfFinalTrim,
      }
    },
  )

  const averangeLiterForPiece = metricsOnLastTwelveMonths.map((metric) => {
    return {
      data: formatMonthAndYear(metric.month, metric.year),
      'Média de litros por peça no alcool':
        metric.totalOfPiecesOfAlcool / (metric.sumOfMinilitersOfAlcool / 1000),
      'Média de litros por peça em dois lados':
        metric.totalOfPiecesOfDoubleSidedGlue /
        (metric.sumOfMinilitersOfDoubleSidedGlue / 1000),
      'Média de litros por peça no arremate':
        metric.totalOfPiecesOfFinalTrim /
        (metric.sumOfMinilitersOfFinalTrim / 1000),
    }
  })

  return (
    <Layout>
      <div className="w-full h-full flex">
        <SideMenu />

        <div className="flex flex-col flex-1 gap-4">
          <Header title="Dashboard" />

          <div className="flex gap-8 w-full pl-12">
            <div className="w-[54.875rem] h-80 p-8 flex flex-col flex-1 bg-slate-700 rounded-md">
              <h1 className="text-xl mb-7">
                Consumo de listros nos ultimos 12 meses
              </h1>

              <ResponsiveContainer>
                <AreaChart
                  width={589}
                  height={240}
                  data={dataOnLastTwelveMonths}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 20,
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
                    stroke="#247BA0"
                    fill="#247BA0ce"
                  />

                  <Area
                    type="monotone"
                    stackId="1"
                    dataKey="Total de dois lados(L)"
                    stroke="#FB3640"
                    fill="#FB3640ce"
                  />

                  <Area
                    type="monotone"
                    stackId="1"
                    dataKey="Total de arremate(L)"
                    stroke="#3ABEFF"
                    fill="#3ABEFFce"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="w-[37rem] h-80 p-8 flex flex-col gap-2 bg-slate-700 rounded-md">
              <h1 className="text-xl mb-7">Consumo de ontem</h1>
              <MetricYesterday
                averangeTotal={metricsYesterday?.sumOfMinilitersOfAlcool}
                totalOfPieces={metricsYesterday?.totalOfPiecesOfAlcool}
              />
              <MetricYesterday
                type="DoubleSidedGlue"
                averangeTotal={
                  metricsYesterday?.sumOfMinilitersOfDoubleSidedGlue
                }
                totalOfPieces={metricsYesterday?.totalOfPiecesOfDoubleSidedGlue}
              />
              <MetricYesterday
                type="Finaltrim"
                averangeTotal={metricsYesterday?.sumOfMinilitersOfFinalTrim}
                totalOfPieces={metricsYesterday?.totalOfPiecesOfFinalTrim}
              />
            </div>
          </div>

          <div className="flex flex-1 gap-8 pl-12">
            <div className="w-[54.875rem] h-80 p-8 flex flex-col flex-1 bg-slate-700 rounded-md">
              <h1 className="text-xl mb-7">
                Total de peças feitas nos ultimos 12 meses
              </h1>
              <ResponsiveContainer>
                <BarChart
                  width={589}
                  height={240}
                  data={dataTotalPiecesOnLastTwelveMonths}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Total de peças alcool"
                    fill="#247BA0"
                    activeBar={<Rectangle fill="#247BA0" stroke="black" />}
                  />
                  <Bar
                    dataKey="Total de peças dois lados"
                    fill="#FB3640"
                    activeBar={<Rectangle fill="#FB3640" stroke="black" />}
                  />
                  <Bar
                    dataKey="Total de peças arremate"
                    fill="#3ABEFF"
                    activeBar={<Rectangle fill="#3ABEFF" stroke="black" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-[37rem] h-80 p-8 flex flex-col gap-2 bg-slate-700 rounded-md">
              <h1 className="text-xl mb-7">
                Média de litros por peças nos ultimos 12 meses
              </h1>
              <ResponsiveContainer>
                <AreaChart
                  width={589}
                  height={240}
                  data={averangeLiterForPiece}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
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
                    stroke="#247BA0"
                    fill="#247BA0ce"
                  />

                  <Area
                    type="monotone"
                    stackId="1"
                    dataKey="Média de litros por peça em dois lados"
                    stroke="#FB3640"
                    fill="#FB3640ce"
                  />

                  <Area
                    type="monotone"
                    stackId="1"
                    dataKey="Média de litros por peça no arremate"
                    stroke="#3ABEFF"
                    fill="#3ABEFFce"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
