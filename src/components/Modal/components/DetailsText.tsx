import { ComponentProps } from 'react'

type DetailsTextProps = ComponentProps<'span'>

export function DetailsTextRoot(props: DetailsTextProps) {
  return <span className="font-bold" {...props} />
}

type DetailsTextIProps = ComponentProps<'i'>

export function DetailsTextI(props: DetailsTextIProps) {
  return <i className="mx-1 mr-2 rounded-md px-2 py-1 font-normal" {...props} />
}
