import type React from 'react'
import { useId } from 'react'

type DetailSectionProps = {
  children: React.ReactNode
  className?: string
  /** Anchors the section, for the links that lead down to it. */
  id?: string
  lead?: React.ReactNode
  title: string
}

/** One titled part of a project page. */
export const DetailSection: React.FC<DetailSectionProps> = ({
  children,
  className,
  id,
  lead,
  title
}) => {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className={
        className === undefined
          ? 'detail-section'
          : `detail-section ${className}`
      }
      id={id}
    >
      <h2 className='detail-section-title' id={titleId}>
        {title}
      </h2>
      {lead !== undefined && <p className='detail-section-lead'>{lead}</p>}
      <div className='detail-section-body'>{children}</div>
    </section>
  )
}

/** Short lines, each led by a violet dot, in the order they matter. */
export const DotList: React.FC<{ lines: readonly string[] }> = ({ lines }) => (
  <ul className='dot-list'>
    {lines.map((line) => (
      <li key={line}>{line}</li>
    ))}
  </ul>
)
