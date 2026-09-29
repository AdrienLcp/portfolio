const TABNABBING_SAFE_REL = 'noopener noreferrer'

export const relForTarget = ({
  rel,
  target
}: {
  rel?: string
  target?: string
}): string | undefined =>
  target === '_blank' ? (rel ?? TABNABBING_SAFE_REL) : rel
