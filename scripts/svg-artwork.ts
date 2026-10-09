import {
  identifier,
  jsxExpressionContainer,
  memberExpression
} from '@babel/types'
import type { Plugin } from 'vite'
import svgr from 'vite-plugin-svgr'

type SvgrTemplate = NonNullable<
  NonNullable<Parameters<typeof svgr>[0]>['svgrOptions']
>['template']

/**
 * The component draws its children after the artwork, so the words a drawing
 * translates are painted over the shapes the `.svg` file holds, as they were
 * when both lived in one component.
 */
const childrenAfterArtwork: SvgrTemplate = (variables, { tpl }) => {
  variables.jsx.children.push(
    jsxExpressionContainer(
      memberExpression(identifier('props'), identifier('children'))
    )
  )

  return tpl`
${variables.imports};
${variables.interfaces};
const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
${variables.exports};
`
}

/**
 * `import Artwork from './x.svg?react'`: the file's shapes as a React
 * component, kept as drawn (no SVGO pass), so a class, a `pathLength` or a
 * `--d` delay reaches the stylesheet that animates it.
 */
export const svgArtwork = (): Plugin =>
  svgr({
    svgrOptions: {
      expandProps: 'end',
      jsxRuntime: 'automatic',
      svgo: false,
      template: childrenAfterArtwork
    }
  })
