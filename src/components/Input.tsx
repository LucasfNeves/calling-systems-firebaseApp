/**
 * @patern_de_composição
 *
 * O patern de composição é uma técnica de desenvolvimento de componentes que consiste em dividir o componente em partes menores.
 *
 * O componente Input é um exemplo de patern de composição, pois ele é composto por 3 componentes menores: InputRoot, InputControl e InputPrefix.
 *
 * Isso permite que o componente Input seja mais flexível, pois cada uma das partes menores podem ser usadas separadamente.
 */

import { ComponentProps } from 'react'

type inputPrefixProps = ComponentProps<'div'>

export function InputPrefix(props: inputPrefixProps) {
  return <div className="absolute right-3 " {...props} />
}

type InputControlProps = ComponentProps<'input'>

export function InputControl(props: InputControlProps) {
  return (
    <input
      {...props}
      className="w-full flex-1 px-4 font-normal text-zinc-700 outline-none placeholder:font-normal placeholder:text-zinc-500 focus:ring-0"
    />
  )
}

export type InputRootProps = ComponentProps<'div'>

export function InputRoot(props: InputRootProps) {
  return (
    <div
      className="relative flex w-full max-w-[37.5rem] items-center rounded-lg border border-zinc-300 bg-white px-4 py-3 shadow-md  outline-none placeholder:text-zinc-500 focus-within:border-violet-300 focus-within:ring-1 focus-within:ring-violet-300"
      {...props}
    />
  )
}

/**
 * Focus-within: é um pseudo seletor que permite estilizar um elemento quando um de seus filhos está em foco.
 * ring faz um efeito de sombra no elemento que está em foco.
 *
 */
