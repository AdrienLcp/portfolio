import type React from 'react'

/** One labelled part of a mechanism diagram. */
export type MechanismPart = {
  detail?: string
  name: string
}

type MechanismKeyProps = {
  /** The sentence the diagram writes beside its parts. */
  note?: string
  parts: readonly MechanismPart[]
}

/**
 * The diagram's words in plain text, for the screen that shrinks the drawing
 * past reading size. Hidden from assistive technology: the diagram's own title
 * already says all of it.
 */
export const MechanismKey: React.FC<MechanismKeyProps> = ({ note, parts }) => (
  <div aria-hidden='true' className='mechanism-key'>
    <dl>
      {parts.map(({ detail, name }) => (
        <div key={name}>
          <dt>{name}</dt>
          {detail !== undefined && <dd>{detail}</dd>}
        </div>
      ))}
    </dl>
    {note !== undefined && <p>{note}</p>}
  </div>
)
