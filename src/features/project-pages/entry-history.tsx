import type React from 'react'

import {
  HOUSE_PACKAGE_NAMES,
  HOUSE_PACKAGE_SCOPE,
  type HousePackageName,
  scopedNameOf
} from '@/features/packages/house-package'
import type { ProjectHistory } from '@/features/projects/project'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import { EntryBlock } from './entry-block'
import type { PackageRowHref } from './entry-installs'

/** `react-router` before `react`, or the alternation stops at the shorter. */
const LONGEST_NAMES_FIRST = [...HOUSE_PACKAGE_NAMES].sort(
  (left, right) => right.length - left.length
)

const HOUSE_PACKAGE_MENTION = new RegExp(
  `(${HOUSE_PACKAGE_SCOPE}(?:${LONGEST_NAMES_FIRST.join('|')}))(?![\\w-])`
)

type SubjectProps = {
  /** Where a mentioned package's row lives, when its page exists. */
  packageRowHref: PackageRowHref | null
  subject: string
}

const mentionedPackage = (part: string): HousePackageName | undefined =>
  HOUSE_PACKAGE_NAMES.find((name) => scopedNameOf(name) === part)

/** A commit subject, each house package it names leading to that package. */
const Subject: React.FC<SubjectProps> = ({ packageRowHref, subject }) => (
  <span className='history-subject'>
    {subject.split(HOUSE_PACKAGE_MENTION).map((part, index) => {
      const name = mentionedPackage(part)

      return packageRowHref !== null && name !== undefined ? (
        // biome-ignore lint/suspicious/noArrayIndexKey: a subject's parts never reorder
        <RegisterLink href={packageRowHref(name)} key={index}>
          {part}
        </RegisterLink>
      ) : (
        part
      )
    })}
  </span>
)

type EntryHistoryProps = {
  history: ProjectHistory
  packageRowHref: PackageRowHref | null
}

/**
 * The git log, abridged, newest first. Commits are written in English, so the
 * list says so to a French screen reader.
 */
export const EntryHistory: React.FC<EntryHistoryProps> = ({
  history,
  packageRowHref
}) => {
  const { locale, translate } = useI18n()
  const firstIndex = history.lines.length - 1

  return (
    <EntryBlock
      lead={translate('project.historyLead', {
        commits: String(history.commits),
        shown: String(history.lines.length)
      })}
      title={translate('project.history')}
    >
      <ol className='history-lines' lang='en'>
        {history.lines.map((line, index) => (
          <li
            className={
              index === 0
                ? 'newest'
                : index === firstIndex
                  ? 'first'
                  : undefined
            }
            key={`${line.date} ${line.subject}`}
          >
            <time dateTime={line.date}>{line.date}</time>
            <span>
              <Subject packageRowHref={packageRowHref} subject={line.subject} />
              {index === firstIndex && (
                <span className='first-mark' lang={locale}>
                  {translate('project.firstCommit')}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </EntryBlock>
  )
}
