import type React from 'react'
import { useId } from 'react'

type EntryBlockProps = {
  children: React.ReactNode
  /** Anchors the block, for the links that lead down to it. */
  id?: string
  lead?: React.ReactNode
  title: string
}

/** One titled part of an entry, its text set in the register's text column. */
export const EntryBlock: React.FC<EntryBlockProps> = ({
  children,
  id,
  lead,
  title
}) => {
  const titleId = useId()

  return (
    <section aria-labelledby={titleId} className='entry-block' id={id}>
      <div className='block-head'>
        <h2 id={titleId}>{title}</h2>
        {lead !== undefined && <p>{lead}</p>}
      </div>
      {children}
    </section>
  )
}

/** What shipped, one numbered line each: the order is the order they matter. */
export const ShippedLines: React.FC<{ lines: readonly string[] }> = ({
  lines
}) => (
  <ol className='shipped-lines'>
    {lines.map((line) => (
      <li key={line}>{line}</li>
    ))}
  </ol>
)
