import { z } from 'zod'

export const textSchema = z.string().trim().min(1)
