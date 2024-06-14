import { Button, Flex } from '@chakra-ui/react'
import { Layout } from '../layout'
import { api } from '../services/api'
import { ChangeEvent, useEffect, useState } from 'react'

import { usePagination } from '../hooks/usePagination'
import { TableProductions } from '../components/TableProductions'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { SideMenu } from '../components/SideMenu'
import { Header } from '../components/Header'

type Production = {
  id: number
  colaboratorName: string
  colaboratorId: string
  realizedIn: Date
  activities: string
}

export function AuthProduction() {
  const navigate = useNavigate()
  const [searchRealizedIn, setSearchRealizedIn] = useState(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.has('name')) {
      return url.searchParams.get('name') ?? ''
    }

    return ''
  })
  const [productions, setProductions] = useState<Production[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { page, setPagination, onCurrentPage } = usePagination()

  useEffect(() => {
    onCurrentPage(1)
  }, [onCurrentPage])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearchRealizedIn(event.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    api
      .get(`/productions?page=${page}&&realizedIn=${searchRealizedIn}`)
      .then((response) => {
        setProductions(response.data.productions),
          setPagination(response.data.pagination)
      })
      .finally(() => setIsLoading(false))
  }, [page, searchRealizedIn, setPagination])

  function goToProductionForm() {
    navigate('/formulario')
  }

  return (
    <Layout>
      <Flex w="100%" h="100%">
        <SideMenu />

        <Flex flex={1} p="1.875rem" gap="1.5rem" flexDirection="column">
          <Header
            title="Produção"
            isDateInput
            onSearch={onSearchInputChanged}
          />
          <Flex w="100%" alignItems="center" justifyContent="flex-start">
            <Button
              rightIcon={<FiPlus size={18} />}
              colorScheme="teal"
              onClick={goToProductionForm}
            >
              Adicionar novo
            </Button>
          </Flex>

          <TableProductions productions={productions} />
        </Flex>
      </Flex>
    </Layout>
  )
}
