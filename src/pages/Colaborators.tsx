/* eslint-disable no-sequences */
import { Layout } from '../layout'
import { api } from '../services/api'
import { ChangeEvent, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { queryClient } from '../services/queryClient'
import { usePagination } from '../hooks/usePagination'
import { FiPlus } from 'react-icons/fi'
import { TableColaborators } from '../components/TableColaborators'
import { SideMenu } from '../components/SideMenu'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { Button } from '@/components/ui/button'
import { ColaboratorDialog } from '@/components/ColaboratorDialog'

type Colaborator = {
  id: number
  name: string
  isOnSector: boolean
  createdAt: Date
}

type ColaboratorFormData = {
  colaboratorId: number
  colaboratorName: string
}

export function Colaborators() {
  const [searchName, setSearchName] = useState(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.has('name')) {
      return url.searchParams.get('name') ?? ''
    }

    return ''
  })
  const [colaborators, setColaborators] = useState<Colaborator[]>([])

  const { page, setPagination } = usePagination()

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('name', searchName)
    window.history.pushState({}, '', url)
  }, [searchName])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearchName(event.target.value)
  }

  const createColaborator = useMutation(
    async (colaborator: ColaboratorFormData) => {
      const colaboratorBodyResponse = {
        id: colaborator.colaboratorId,
        name: colaborator.colaboratorName,
      }

      const response = await api.post('colaborators', colaboratorBodyResponse)

      return response.data.colaborator
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['colaborators'])
        fetchColaborators()
      },
    },
  )

  function fetchColaborators() {
    api
      .get(`/colaborators?page=${page}&&name=${searchName}`)
      .then((response) => {
        setColaborators(response.data.colaborators),
          setPagination(response.data.pagination)
      })
      .finally()
  }

  useEffect(() => {
    fetchColaborators()
  }, [page])

  return (
    <Layout>
      <div className="flex w-full h-full">
        <SideMenu />
        <div className="flex flex-col flex-1 gap-2 relative">
          <Header title="Colaboradores" onSearch={onSearchInputChanged} />

          <div className="flex w-full items-center justify-start pl-12">
            <ColaboratorDialog onFunctionColaborator={createColaborator}>
              <Button size="lg" variant="outline">
                <FiPlus className="mr-2" size={18} />
                Adicionar novo
              </Button>
            </ColaboratorDialog>
          </div>

          <div className="mt-4 px-12">
            <TableColaborators colaborators={colaborators} />
          </div>

          <div className="absolute bottom-24 right-0">
            <Pagination />
          </div>
        </div>
      </div>
    </Layout>
  )
}
