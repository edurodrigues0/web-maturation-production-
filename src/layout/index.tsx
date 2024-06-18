import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-[1920px] px-4 w-full h-screen mx-auto text-zinc-50">
      {children}
    </div>
  )
}
