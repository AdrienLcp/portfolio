import {
  Group,
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps,
  SelectionIndicator,
  SharedElementTransition,
  ToggleButton,
  ToggleButtonGroup
} from 'react-aria-components'

import { composeClassName } from '@/presentation/components/compose-class-name'

import {
  ariaCurrentLeftOutOfLinkProps,
  restoreHrefLangDroppedByReactAria
} from './link-quirks'
import { VisuallyHidden } from './visually-hidden'

import './rail.sass'

export type RailItem<TId extends string> = {
  id: TId
  label: string
  lang?: string
  name?: string
}

type RailProps = {
  'aria-label': string
  className?: string
}

type RailSlotLabelProps<TId extends string> = {
  item: RailItem<TId>
}

const RailSlotLabel = <TId extends string>({
  item
}: RailSlotLabelProps<TId>) =>
  item.name === undefined ? (
    <span className='rail-slot-label'>{item.label}</span>
  ) : (
    <>
      <span aria-hidden className='rail-slot-label'>
        {item.label}
      </span>
      <VisuallyHidden elementType='span'>{item.name}</VisuallyHidden>
    </>
  )

type ChoiceRailProps<TId extends string> = RailProps & {
  items: RailItem<TId>[]
  onSelect: (id: TId) => void
  selectedId: TId
}

export const ChoiceRail = <TId extends string>({
  className,
  items,
  onSelect,
  selectedId,
  ...props
}: ChoiceRailProps<TId>) => (
  <ToggleButtonGroup
    {...props}
    className={composeClassName(className, 'rail')}
    disallowEmptySelection
    onSelectionChange={(keys) => {
      const picked = items.find((item) => keys.has(item.id))

      if (picked !== undefined) {
        onSelect(picked.id)
      }
    }}
    selectedKeys={[selectedId]}
    selectionMode='single'
  >
    {items.map((item) => (
      <ToggleButton
        className='rail-slot'
        id={item.id}
        key={item.id}
        lang={item.lang}
      >
        <SelectionIndicator className='rail-pawn' />
        <RailSlotLabel item={item} />
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
)

export type LinkRailItem<TId extends string> = RailItem<TId> & {
  href: string
  hrefLang?: string
}

type LinkRailProps<TId extends string> = RailProps &
  Pick<ReactAriaLinkProps, 'routerOptions'> & {
    currentId: TId
    items: LinkRailItem<TId>[]
  }

export const LinkRail = <TId extends string>({
  className,
  currentId,
  items,
  routerOptions,
  ...props
}: LinkRailProps<TId>) => (
  <Group {...props} className={composeClassName(className, 'rail')}>
    <SharedElementTransition>
      {items.map((item) => {
        const isCurrent = item.id === currentId

        return (
          <ReactAriaLink
            {...ariaCurrentLeftOutOfLinkProps(isCurrent, 'true')}
            className='rail-slot'
            href={item.href}
            key={item.id}
            lang={item.lang}
            render={restoreHrefLangDroppedByReactAria(item.hrefLang)}
            routerOptions={routerOptions}
          >
            <SelectionIndicator className='rail-pawn' isSelected={isCurrent} />
            <RailSlotLabel item={item} />
          </ReactAriaLink>
        )
      })}
    </SharedElementTransition>
  </Group>
)
