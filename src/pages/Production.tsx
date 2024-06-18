import { Layout } from '../layout'
import { api } from '../services/api'
import { ChangeEvent, useEffect, useState } from 'react'

import { usePagination } from '../hooks/usePagination'
import { TableProductions } from '../components/TableProductions'
import { FiPlus } from 'react-icons/fi'
import { SideMenu } from '../components/SideMenu'
import { Header } from '../components/Header'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/Pagination'
import { useNavigate } from 'react-router-dom'

type Production = {
  id: number
  colaboratorName: string
  colaboratorId: string
  realizedIn: Date
  activities: string
}

export function Production() {
  const navigate = useNavigate()
  const [searchRealizedIn, setSearchRealizedIn] = useState(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.has('name')) {
      return url.searchParams.get('name') ?? ''
    }

    return ''
  })
  const [productions, setProductions] = useState<Production[]>([])
  const { page, setPagination, onCurrentPage } = usePagination()

  useEffect(() => {
    onCurrentPage(1)
  }, [onCurrentPage])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearchRealizedIn(event.target.value)
  }

  useEffect(() => {
    api
      .get(`/productions?page=${page}&&realizedIn=${searchRealizedIn}`)
      .then((response) => {
        setProductions(response.data.productions)
        setPagination(response.data.pagination)
      })
      .finally()
  }, [page, searchRealizedIn, setPagination])

  function goToProductionForm() {
    navigate('/formulario')
  }

  return (
    <Layout>
      <div className="flex w-full h-full">
        <SideMenu />
        <div className="flex flex-col flex-1 gap-2 relative">
          <Header
            title="Produção"
            onSearch={onSearchInputChanged}
            isDateInput
          />

          <div className="flex w-full items-center justify-start pl-12">
            <Button size="lg" variant="outline" onClick={goToProductionForm}>
              <FiPlus className="mr-2" size={18} />
              Adicionar novo
            </Button>
          </div>

          <div className="mt-4 px-12">
            <TableProductions productions={productions} />
          </div>

          <div className="absolute bottom-24 right-0">
            <Pagination />
          </div>
        </div>
      </div>
    </Layout>
  )
}
