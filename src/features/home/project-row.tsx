import type React from 'react'
import { useId, useRef } from 'react'
import { Button as ReactAriaButton } from 'react-aria-components'

import { Icon } from '@/presentation/components/icon'

import type { PreviewAnchor } from './use-following-preview'

type ProjectRowProps = {
  children: React.ReactNode
  /** Dimmed while the pointer previews another row. */
  isDimmed: boolean
  isOpen: boolean
  name: string
  onPoint?: (anchor: PreviewAnchor) => void
  onPointAway?: () => void
  onToggle: () => void
  ref?: React.Ref<HTMLLIElement>
  tagline: string
}

/**
 * One name in the index: pressing it unfolds the project in place, pointing at
 * it calls up its picture beside the pointer.
 */
export const ProjectRow: React.FC<ProjectRowProps> = ({
  children,
  isDimmed,
  isOpen,
  name,
  onPoint,
  onPointAway,
  onToggle,
  ref,
  tagline
}) => {
  const panelId = useId()
  const nameRef = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)

  const textRightEdge = (): number =>
    Math.max(
      nameRef.current?.getBoundingClientRect().right ?? 0,
      taglineRef.current?.getBoundingClientRect().right ?? 0
    )

  return (
    <li className={isDimmed ? 'project-row dimmed' : 'project-row'} ref={ref}>
      <h3
        onBlur={onPointAway}
        onFocus={(event) => {
          const name = nameRef.current

          if (
            onPoint === undefined ||
            name === null ||
            !event.target.matches(':focus-visible')
          ) {
            return
          }

          const box = name.getBoundingClientRect()
          onPoint({
            clearOf: textRightEdge(),
            snap: true,
            x: textRightEdge() + 16,
            y: box.top + box.height / 2
          })
        }}
        onPointerLeave={onPointAway}
        onPointerMove={(event) => {
          if (!isOpen && event.pointerType === 'mouse') {
            onPoint?.({
              clearOf: taglineRef.current?.getBoundingClientRect().right ?? 0,
              x: event.clientX,
              y: event.clientY
            })
          }
        }}
      >
        <ReactAriaButton
          aria-controls={panelId}
          aria-expanded={isOpen}
          className='project-toggle'
          onPress={onToggle}
        >
          <span className='project-text'>
            <span className='project-name' ref={nameRef}>
              {name}
            </span>
            <span className='project-tagline' ref={taglineRef}>
              {tagline}
            </span>
          </span>
          <span aria-hidden='true' className='project-plus'>
            <Icon name='plus' />
          </span>
        </ReactAriaButton>
      </h3>
      <div
        className='project-panel'
        data-open={isOpen || undefined}
        id={panelId}
        inert={!isOpen}
      >
        <div className='project-panel-clip'>
          <div className='project-panel-body'>{children}</div>
        </div>
      </div>
    </li>
  )
}
