import { ComponentProps } from 'react'

export type TableProps = ComponentProps<'table'>

export function Table({ children, ...props }: TableProps) {
  return (
    <table
      className="w-full table-fixed border-collapse border-0 md:rounded-2xl md:border md:border-gray-400 md:bg-gray-100 md:shadow-lg"
      {...props}
    >
      {children}
    </table>
  )
}

export type TableHeadProps = ComponentProps<'thead'>

export function TableHead({ children, ...props }: TableHeadProps) {
  return (
    <thead
      className="absolute  m-[-1px]  h-[1px] w-[1px] overflow-hidden border-0 p-0 md:relative md:m-0 md:h-auto md:w-auto  "
      {...props}
    >
      <tr className="mb-4  block  w-full border-b-2 py-2 md:table-row md:border-b md:border-gray-400">
        {children}
      </tr>
    </thead>
  )
}

export type TableHeadCellProps = ComponentProps<'th'>

export function TableHeadCell({ children, ...props }: TableHeadCellProps) {
  return (
    <th className="w-full p-2 text-center uppercase" scope="coll" {...props}>
      {children}
    </th>
  )
}

export type TableBodyProps = ComponentProps<'tbody'>

export function TableBody({ children, ...props }: TableBodyProps) {
  return <tbody {...props}>{children}</tbody>
}

export type TableRowProps = ComponentProps<'tr'>

export function TableRow({ children, ...props }: TableRowProps) {
  return (
    <tr
      className="md: mb-4 block w-full rounded-lg border-b-2 border-gray-400 bg-gray-100 py-2 md:table-row md:border-b md:border-gray-400 md:bg-transparent lg:rounded-none"
      {...props}
    >
      {children}
    </tr>
  )
}

export type TableBodyCellProps = React.ComponentPropsWithoutRef<'td'> & {
  'data-label'?: string
}

export function TableBodyCell({ children, ...props }: TableBodyCellProps) {
  const dataLabel = props['data-label'] || ''
  return (
    <td
      className="relative block border-b border-gray-300 p-2 text-right before:data-[data-label]:absolute md:table-cell md:border-0 md:text-center"
      {...props}
    >
      {children}
      <span className="absolute bottom-2 left-2  block font-bold uppercase md:hidden">
        {dataLabel}
      </span>
    </td>
  )
}
