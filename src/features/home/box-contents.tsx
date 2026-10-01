import { COLOR_SCHEMES } from '@adrienlcp/theme-preference'
import type React from 'react'
import { Suspense, use } from 'react'

import { useHomeData } from '@/features/home/home-loader'
import { projectPathFor } from '@/infrastructure/router/navigation'
import { Icon, type IconName } from '@/presentation/components/icon'
import { Stamp, StampList } from '@/presentation/components/stamp'
import { Button } from '@/presentation/components/ui/button'
import { Link } from '@/presentation/components/ui/link'
import { useI18n, useTranslate } from '@/presentation/i18n/i18n-provider'
import { LOCALE_NAMES, LOCALES } from '@/presentation/i18n/locale'

import { OfflineDiagram } from './offline-diagram'
import { RecordDiagram } from './record-diagram'
import { SocketDiagram } from './socket-diagram'

import './box-contents.sass'

type CompartmentProps = {
  /** Names the compartment's slot in the tray. */
  area: string
  children?: React.ReactNode
  count: number
  description: string
  title: string
}

/**
 * The count is part of the title: "1 realtime server" is one fact, read at
 * once.
 */
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

const PACKAGES = [
  '@adrienlcp/i18n',
  '@adrienlcp/result',
  '@adrienlcp/theme-preference',
  '@adrienlcp/safe-storage',
  '@adrienlcp/browser',
  '@adrienlcp/react',
  '@adrienlcp/react-aria',
  '@adrienlcp/styles',
  '@adrienlcp/tsconfig',
  '@adrienlcp/biome-config',
  '@adrienlcp/react-router'
] as const

type ProjectRulesLinkProps = {
  /** Replaces the default label, which names the project. */
  label?: string
  slug: string
}

/** Leads to a project's page, and prints nothing while that project is absent. */
const ProjectRulesLink: React.FC<ProjectRulesLinkProps> = ({ label, slug }) => {
  const { locale, translate } = useI18n()
  const { projects } = useHomeData()
  const result = use(projects)

  if (result.status === 'failure') {
    return null
  }

  const project = result.data.find((candidate) => candidate.slug === slug)

  return project === undefined ? null : (
    <Link href={projectPathFor({ locale, slug: project.slug })}>
      {label ??
        translate(`projects.open.${project.kind}`, { name: project.name })}
    </Link>
  )
}

type BoxContentsProps = {
  onCloseLid: () => void
  titleRef: React.Ref<HTMLHeadingElement>
}

/** The board game's contents list: every piece counted, nothing missing. */
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
          area='taverla'
          count={GAMES.length}
          description={translate('home.contents.taverla.description')}
          title={translate('home.contents.taverla.title')}
        >
          <SocketDiagram />
          <ul className='game-cards'>
            {GAMES.map(({ face, icon, key }) => (
              <li className={`game-card ${face}`} key={key}>
                <Icon className='game-icon' name={icon} />
                {translate(`home.contents.taverla.${key}`)}
              </li>
            ))}
          </ul>
          <div className='project-link'>
            <Suspense fallback={null}>
              <ProjectRulesLink slug='taverla' />
            </Suspense>
          </div>
        </Compartment>
        <Compartment
          area='seance'
          count={0}
          description={translate('home.contents.seance.description')}
          title={translate('home.contents.seance.title')}
        >
          <OfflineDiagram />
          <div className='project-link'>
            <Suspense fallback={null}>
              <ProjectRulesLink slug='seance' />
            </Suspense>
          </div>
        </Compartment>
        <Compartment
          area='on-record'
          count={1}
          description={translate('home.contents.onRecord.description')}
          title={translate('home.contents.onRecord.title')}
        >
          <RecordDiagram />
          <div className='project-link'>
            <Suspense fallback={null}>
              <ProjectRulesLink slug='on-record' />
            </Suspense>
          </div>
        </Compartment>
        <Compartment
          area='packages'
          count={PACKAGES.length}
          description={translate('home.contents.packages.description')}
          title={translate('home.contents.packages.title')}
        >
          <StampList>
            {PACKAGES.map((name) => (
              <Stamp isCode key={name}>
                {name}
              </Stamp>
            ))}
          </StampList>
          <div className='project-link'>
            <Suspense fallback={null}>
              <ProjectRulesLink
                label={translate('home.contents.packages.open')}
                slug='packages'
              />
            </Suspense>
          </div>
        </Compartment>
        <Compartment
          area='languages'
          count={LOCALES.length}
          description={translate('home.contents.languages.description')}
          title={translate('home.contents.languages.title')}
        >
          <StampList>
            {LOCALES.map((locale) => (
              <Stamp key={locale} lang={locale}>
                {LOCALE_NAMES[locale]}
              </Stamp>
            ))}
          </StampList>
        </Compartment>
        <Compartment
          area='themes'
          count={COLOR_SCHEMES.length}
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
