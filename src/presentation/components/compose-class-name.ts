import {
  type ClassNameOrFunction,
  composeRenderProps
} from 'react-aria-components'

export const composeClassName = <TRenderProps>(
  incoming: ClassNameOrFunction<TRenderProps> | undefined,
  ...ownClassNames: (string | false | undefined)[]
): ((
  values: TRenderProps & { defaultClassName: string | undefined }
) => string) =>
  composeRenderProps(incoming, (resolved) =>
    [...ownClassNames, resolved].filter(Boolean).join(' ')
  )
