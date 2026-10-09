const EN = defineDictionary({ greeting: 'Hello {name}' })

translate('greeting', { name: 'Ada' })

translate('greeting')
// ✗ Expected 2 arguments, but got 1

translate('greeting', { nom: 'Ada' })
// ✗ 'nom' does not exist in type '{ name: string }'

translate('greting', { name: 'Ada' })
// ✗ not assignable to '"greeting"'
