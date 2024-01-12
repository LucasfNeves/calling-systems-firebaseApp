import { ComponentProps, ReactNode } from 'react'

export type TitleRootProps = ComponentProps<'div'>

export function TitleRoot(props: TitleRootProps) {
  return (
    <div
      className="flexc w-full  flex-row items-center rounded-md bg-gray-100 px-6 py-2 shadow-md"
      {...props}
    />
  )
}

interface TitleProps {
  title: string
  children: ReactNode
}

export function Title({ children, title }: TitleProps) {
  return (
    <div className="flex items-center gap-4 text-lg font-semibold text-zinc-700 ">
      {children}
      <h2>{title}</h2>
    </div>
  )
}
