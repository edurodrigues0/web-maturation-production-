type ProductionType = 'Alcool' | 'Finaltrim' | 'DoubleSidedGlue'

type MetricYesterdayProps = {
  type?: ProductionType
  averangeTotal?: number
  totalOfPieces?: number
  totalOfRegister?: number
}

export function MetricYesterday({
  type = 'Alcool',
  averangeTotal = 0,
  totalOfPieces = 0,
}: MetricYesterdayProps) {
  function productionType(type: ProductionType) {
    if (type === 'DoubleSidedGlue') {
      return 'Dois lados'
    }

    if (type === 'Finaltrim') {
      return 'Arremate'
    }

    return 'Alcool'
  }

  const isTypeAlcool = productionType(type)

  const convertedInLiters = averangeTotal >= 1 ? averangeTotal / 1000 : 0
  const averange = totalOfPieces / averangeTotal

  return (
    <div className="grid grid-cols-5 flex-1 bg-slate-500 rounded-md px-4">
      <div className="flex flex-col gap-1 items-center justify-center">
        <span className="text-bold text-sm">{isTypeAlcool}</span>
        <span className="text-bold text-xl">{convertedInLiters}</span>
      </div>

      <div className="border-r-2 border-background mx-auto" />

      <div className="flex flex-col gap-1 items-center justify-center">
        <span className="text-bold text-sm">Total de pçs</span>
        <span className="text-bold text-xl">{totalOfPieces}</span>
      </div>

      <div className="border-r-2 border-background mx-auto" />

      <div className="flex flex-col gap-1 items-center justify-center pr-4">
        <span className="text-bold text-sm">Média por pç</span>
        <span className="text-bold text-xl">
          {averange >= 1 ? averange : 0}L
        </span>
      </div>
    </div>
  )
}
