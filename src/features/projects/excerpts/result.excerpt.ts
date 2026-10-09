const parse = (input: string): Result<number, 'not_a_number'> => {
  const value = Number(input)
  return Number.isNaN(value)
    ? Result.failure('not_a_number')
    : Result.success(value)
}

const result = parse(raw)
if (result.status === 'failure') return result.error
// → 'not_a_number'
result.data
// → number
