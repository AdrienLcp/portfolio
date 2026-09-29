import type React from 'react'

import './lid.sass'

type LidProps = {
  /** Printed on the tomato band under the lid. */
  band: React.ReactNode
  /** Fills what the viewport leaves under the header: the home page's cover. */
  isTall?: boolean
  title: string
  /** Makes the title a focus target, for a control that scrolls back to it. */
  titleRef?: React.Ref<HTMLHeadingElement>
}

/** The top of a page printed as a box lid: a petrol field lettered in marigold. */
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
