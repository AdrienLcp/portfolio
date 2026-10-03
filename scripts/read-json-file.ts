import { readFile } from 'node:fs/promises'

import type { z } from 'zod'

/** Reads a JSON file another tool wrote; throws when its shape has drifted. */
export const readJsonFile = async <Schema extends z.ZodType>(
  path: string,
  schema: Schema
): Promise<z.infer<Schema>> =>
  schema.parse(JSON.parse(await readFile(path, 'utf8')))
