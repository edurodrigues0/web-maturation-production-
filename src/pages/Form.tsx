import { Layout } from '../layout'
import { SideMenu } from '../components/SideMenu'
import { Header } from '@/components/Header'
import { ProductionForm } from '@/components/ProductionForm'

export function Form() {
  return (
    <Layout>
      <div className="flex w-full h-full">
        <SideMenu />
        <div className="flex flex-col flex-1 gap-4">
          <Header title="Formulario" />

          <div className="flex gap-8 w-full pl-12">
            <ProductionForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}
