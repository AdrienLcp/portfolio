import type React from 'react'
import { Suspense, use } from 'react'

import { useHomeData } from '@/features/home/home-loader'
import { projectPathFor } from '@/infrastructure/router/navigation'
import { Icon, type IconName } from '@/presentation/components/icon'
import { Stamp, StampList } from '@/presentation/components/stamp'
import { Button } from '@/presentation/components/ui/button'
import { Link } from '@/presentation/components/ui/link'
import { useI18n, useTranslate } from '@/presentation/i18n/i18n-provider'

import { SocketDiagram } from './socket-diagram'

import './box-contents.sass'

type CompartmentProps = {
  area: string
  children?: React.ReactNode
  count: number
  description: string
  title: string
}

const Compartment: React.FC<CompartmentProps> = ({
  area,
  children,
  count,
  description,
  title
}) => (
  <li className={`compartment ${area}`}>
    <h3 className='compartment-title'>
      <span className='count'>{count}</span> {title}
    </h3>
    <p className='compartment-line'>{description}</p>
    {children}
  </li>
)

const GAMES = [
  { face: 'blind-test', icon: 'note', key: 'blindTest' },
  { face: 'buzzer', icon: 'buzzer', key: 'buzzer' },
  { face: 'quiz', icon: 'question', key: 'quiz' }
] as const satisfies readonly { face: string; icon: IconName; key: string }[]

const FeaturedProjectLink: React.FC = () => {
  const { locale, translate } = useI18n()
  const { projects } = useHomeData()
  const result = use(projects)

  if (result.status === 'failure') {
    return null
  }

  const [project] = result.data

  return project === undefined ? null : (
    <Link href={projectPathFor({ locale, slug: project.slug })}>
      {translate('home.contents.games.open', { name: project.name })}
    </Link>
  )
}

type BoxContentsProps = {
  onCloseLid: () => void
  titleRef: React.Ref<HTMLHeadingElement>
}

export const BoxContents: React.FC<BoxContentsProps> = ({
  onCloseLid,
  titleRef
}) => {
  const translate = useTranslate()

  return (
    <section aria-labelledby='box-contents-title' className='box-contents'>
      <div className='contents-head'>
        <h2
          className='contents-title'
          id='box-contents-title'
          ref={titleRef}
          tabIndex={-1}
        >
          {translate('home.contents.title')}
        </h2>
        <p className='contents-lead'>{translate('home.contents.lead')}</p>
      </div>
      <ul className='tray'>
        <Compartment
          area='server'
          count={1}
          description={translate('home.contents.server.description')}
          title={translate('home.contents.server.title')}
        >
          <SocketDiagram />
        </Compartment>
        <Compartment
          area='games'
          count={3}
          description={translate('home.contents.games.description')}
          title={translate('home.contents.games.title')}
        >
          <ul className='game-cards'>
            {GAMES.map(({ face, icon, key }) => (
              <li className={`game-card ${face}`} key={key}>
                <Icon className='game-icon' name={icon} />
                {translate(`home.contents.games.${key}`)}
              </li>
            ))}
          </ul>
          <div className='featured-project'>
            <Suspense fallback={null}>
              <FeaturedProjectLink />
            </Suspense>
          </div>
        </Compartment>
        <Compartment
          area='languages'
          count={2}
          description={translate('home.contents.languages.description')}
          title={translate('home.contents.languages.title')}
        >
          <StampList>
            <Stamp lang='en'>English</Stamp>
            <Stamp lang='fr'>Français</Stamp>
          </StampList>
        </Compartment>
        <Compartment
          area='themes'
          count={2}
          description={translate('home.contents.themes.description')}
          title={translate('home.contents.themes.title')}
        >
          <ul className='theme-chips'>
            <li className='theme-chip day'>{translate('theme.light')}</li>
            <li className='theme-chip night'>{translate('theme.dark')}</li>
          </ul>
        </Compartment>
        <Compartment
          area='flash'
          count={0}
          description={translate('home.contents.flash.description')}
          title={translate('home.contents.flash.title')}
        />
        <Compartment
          area='packages'
          count={2}
          description={translate('home.contents.packages.description')}
          title={translate('home.contents.packages.title')}
        >
          <StampList>
            <Stamp isCode>@adrienlcp/i18n</Stamp>
            <Stamp isCode>@adrienlcp/result</Stamp>
          </StampList>
        </Compartment>
        <Compartment
          area='lint'
          count={1}
          description={translate('home.contents.lint.description')}
          title={translate('home.contents.lint.title')}
        />
        <Compartment
          area='primitives'
          count={1}
          description={translate('home.contents.primitives.description')}
          title={translate('home.contents.primitives.title')}
        />
        <Compartment
          area='hover'
          count={1}
          description={translate('home.contents.hover.description')}
          title={translate('home.contents.hover.title')}
        />
      </ul>
      <Button icon='chevronUp' onPress={onCloseLid}>
        {translate('home.closeLid')}
      </Button>
    </section>
  )
}
