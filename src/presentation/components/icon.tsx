import { classNames } from '@adrienlcp/react'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleX,
  Copy,
  Download,
  FileText,
  Mail,
  Monitor,
  Moon,
  Plus,
  Send,
  Sun,
  TextAlignStart,
  TriangleAlert
} from 'lucide-react'
import type React from 'react'

import './icon.sass'

type IconGlyph = React.ComponentType<React.SVGProps<SVGSVGElement>>

/**
 * Lucide's outline set, on a 24-unit grid with round ends. Lucide 1 dropped
 * brand marks, so GitHub and LinkedIn come from Tabler's outline set, drawn
 * on the same grid; `icon.sass` gives every glyph the site's one stroke width.
 */
const ICON_GLYPHS = {
  back: ArrowLeft,
  check: Check,
  copy: Copy,
  download: Download,
  file: FileText,
  forward: ArrowRight,
  github: IconBrandGithub,
  lines: TextAlignStart,
  linkedin: IconBrandLinkedin,
  mail: Mail,
  monitor: Monitor,
  moon: Moon,
  newTab: ArrowUpRight,
  plus: Plus,
  refused: CircleX,
  send: Send,
  sun: Sun,
  warning: TriangleAlert
} as const satisfies Record<string, IconGlyph>

export type IconName = keyof typeof ICON_GLYPHS

type IconProps = {
  className?: string
  name: IconName
}

/** Decorative: the control that holds it carries the name. */
export const Icon: React.FC<IconProps> = ({ className, name }) => {
  const Glyph: IconGlyph = ICON_GLYPHS[name]

  return (
    <Glyph
      aria-hidden='true'
      className={classNames('icon', className)}
      focusable='false'
    />
  )
}
