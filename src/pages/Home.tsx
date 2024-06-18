import { ProductionForm } from '@/components/ProductionForm'
import { Button } from '@/components/ui/button'

import { Layout } from '@/layout'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="h-full w-full grid grid-cols-2 gap-4">
        <div className="h-full w-full p-10 flex flex-col gap-10 justify-center">
          <span className="text-xl">Scala Control</span>
          <h1 className="text-4xl">
            O Dashboard perfeito para <br /> controle de consumo.
          </h1>

          <p className="text-base text-zinc-400 w-[31.25rem]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id cumque
            necessitatibus non. Non molestiae nobis reprehenderit, dicta unde
            repudiandae! Optio voluptatum asperiores debitis architecto eos
            atque ea sit deserunt dolorem.
          </p>

          <div className="flex gap-4">
            <Button size="lg" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button size="lg">Leia mais sobre</Button>
          </div>

          <span className="text-sm text-zinc-400">
            Feito por Eduardo Rodrigues
          </span>
        </div>

        <div className="m-10 p-10 flex flex-1 justify-center items-center flex-col bg-teal-600 rounded-md">
          <h1 className="text-4xl">Formulario Produção</h1>
          <div className="h-2 w-full border-t-4 border-slate-900 my-4" />

          <ProductionForm />
        </div>
      </div>
    </Layout>
  )
}
