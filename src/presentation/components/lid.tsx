import type React from 'react'

import './lid.sass'

type LidProps = {
  band: React.ReactNode
  isTall?: boolean
  title: string
  titleRef?: React.Ref<HTMLHeadingElement>
}

export const Lid: React.FC<LidProps> = ({
  band,
  isTall = false,
  title,
  titleRef
}) => (
  <div className={isTall ? 'lid tall' : 'lid'}>
    <div className='lid-field'>
      <h1
        className='lid-title'
        ref={titleRef}
        tabIndex={titleRef === undefined ? undefined : -1}
      >
        {title}
      </h1>
    </div>
    <div className='lid-band'>{band}</div>
  </div>
)
