import type { AtRule, Node, Plugin, Rule } from 'postcss'

/** The site's cascade layers, weakest first; unlayered rules beat them all. */
const CASCADE_LAYER_ORDER: readonly string[] = [
  'reset',
  'tokens',
  'base',
  'components'
]

/**
 * The most id selectors one selector may carry. A layer outranks the one
 * below it by one more id than this, so no selector in the weaker layer can
 * out-specify it.
 */
const IDS_IN_A_SELECTOR_AT_MOST = 1

const IDS_PER_LAYER_RANK = IDS_IN_A_SELECTOR_AT_MOST + 1

/** Matches every element, and weighs one id. */
const ONE_ID_OF_SPECIFICITY = ':not(#\\#)'

const UNLAYERED_RANK = CASCADE_LAYER_ORDER.length

const LEADING_TYPE_SELECTOR = /^(?:\*|(?:[a-zA-Z_-]|\\.)(?:[\w-]|\\.)*)?/

const ID_SELECTOR = /#/g

const ATTRIBUTE_OR_ESCAPE = /\[[^\]]*\]|\\./g

const isAtRule = (node: { type: string }): node is AtRule =>
  node.type === 'atrule'

const enclosingAtRules = (node: Node): AtRule[] => {
  const { parent } = node

  if (parent === undefined) {
    return []
  }

  return isAtRule(parent)
    ? [parent, ...enclosingAtRules(parent)]
    : enclosingAtRules(parent)
}

const enclosingLayer = (rule: Rule): AtRule | undefined =>
  enclosingAtRules(rule).find((atRule) => atRule.name === 'layer')

/**
 * An anonymous layer is a library's, outside the site's order — react-aria's
 * press style in `index.html` — and is left to the browsers that read it.
 */
const isAnonymousLayer = (atRule: AtRule): boolean =>
  atRule.name === 'layer' && atRule.params === ''

const isLeftAsIs = (rule: Rule): boolean =>
  enclosingAtRules(rule).some(
    (atRule) => atRule.name.endsWith('keyframes') || isAnonymousLayer(atRule)
  )

const rankOf = (rule: Rule): number => {
  const layer = enclosingLayer(rule)

  if (layer === undefined) {
    return UNLAYERED_RANK
  }

  const rank = CASCADE_LAYER_ORDER.indexOf(layer.params)

  if (rank === -1) {
    throw layer.error(
      `Unknown cascade layer "${layer.params}": add it to CASCADE_LAYER_ORDER`
    )
  }

  if (rule.some((node) => node.type === 'decl' && node.important === true)) {
    throw rule.error(
      'An !important declaration inside a cascade layer reverses the layer order, which the flattening does not reproduce'
    )
  }

  return rank
}

const idCountOf = (selector: string): number =>
  selector.replace(ATTRIBUTE_OR_ESCAPE, '').match(ID_SELECTOR)?.length ?? 0

/** Inserted after a leading type selector, which must stay first in its compound. */
const withExtraIds = (selector: string, ids: number): string => {
  const leadingType = LEADING_TYPE_SELECTOR.exec(selector)?.[0] ?? ''

  return `${leadingType}${ONE_ID_OF_SPECIFICITY.repeat(ids)}${selector.slice(leadingType.length)}`
}

/**
 * Rewrites `@layer` blocks into plain rules that cascade the same way, for the
 * browsers that drop every `@layer` block (Chromium before 99, Safari before
 * 15.4) and so render the site unstyled. Each rule gains id specificity by its
 * layer's rank — never matching anything else — so a stronger layer wins
 * whatever the selectors, as it does natively. Every stylesheet is rewritten
 * on its own, so the order and the weights are constants, not read per file.
 */
export const flattenedCascadeLayers = (): Plugin => ({
  OnceExit(root) {
    root.walkRules((rule) => {
      if (isLeftAsIs(rule)) {
        return
      }

      const rank = rankOf(rule)

      for (const selector of rule.selectors) {
        if (idCountOf(selector) > IDS_IN_A_SELECTOR_AT_MOST) {
          throw rule.error(
            `"${selector}" carries more ids than IDS_IN_A_SELECTOR_AT_MOST`
          )
        }
      }

      if (rank > 0) {
        rule.selectors = rule.selectors.map((selector) =>
          withExtraIds(selector, rank * IDS_PER_LAYER_RANK)
        )
      }
    })

    root.walkAtRules('layer', (layer) => {
      if (isAnonymousLayer(layer)) {
        return
      }

      if (layer.nodes === undefined) {
        layer.remove()
      } else {
        layer.replaceWith(layer.nodes)
      }
    })
  },
  postcssPlugin: 'flattened-cascade-layers'
})
