import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import './foundations.sass'

type FoundationProps = {
  children: React.ReactNode
}

export const Foundation: React.FC<FoundationProps> = ({ children }) => (
  <div className='foundation'>{children}</div>
)

type FoundationGroupProps = {
  children: React.ReactNode
  note?: string
  title: string
}

export const FoundationGroup: React.FC<FoundationGroupProps> = ({
  children,
  note,
  title
}) => (
  <section className='foundation-group'>
    <h2 className='foundation-title'>{title}</h2>
    {note !== undefined && <p className='foundation-note'>{note}</p>}
    {children}
  </section>
)

type SpecimenRowProps = {
  children: React.ReactNode
  name: string
  token?: string
}

export const SpecimenRow: React.FC<SpecimenRowProps> = ({
  children,
  name,
  token
}) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [resolved, setResolved] = useState('')

  useEffect(() => {
    if (rowRef.current === null || token === undefined) {
      return
    }

    setResolved(getComputedStyle(rowRef.current).getPropertyValue(token).trim())
  }, [token])

  return (
    <div className='specimen-row' ref={rowRef}>
      <div className='specimen-name'>
        <span>{name}</span>
        {resolved !== '' && <code>{resolved}</code>}
      </div>
      <div>{children}</div>
    </div>
  )
}
