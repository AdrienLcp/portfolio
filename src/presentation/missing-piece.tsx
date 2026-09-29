import type React from 'react'

import { Link } from '@/presentation/components/ui/link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import './missing-piece.sass'

type MissingPieceProps = {
  backHref: string
  backLabel: string
  message: string
}

export const MissingPiece: React.FC<MissingPieceProps> = ({
  backHref,
  backLabel,
  message
}) => {
  const translate = useTranslate()

  return (
    <>
      <div className='missing-piece'>
        <span aria-hidden='true' className='empty-slot' />
        <h1 className='missing-message'>{message}</h1>
        <p className='missing-note'>{translate('notFound.note')}</p>
      </div>
      <div className='way-back'>
        <Link href={backHref} variant='accent'>
          {backLabel}
        </Link>
      </div>
    </>
  )
}
