import { z } from 'zod'
import { AppError } from './errors'

export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const parsed = schema.safeParse(data)
  
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    const formatted: Record<string, string> = {}
    
    for (const key in fieldErrors) {
      if (fieldErrors[key] && fieldErrors[key]!.length > 0) {
        formatted[key] = fieldErrors[key]![0]
      }
    }
    
    throw new AppError('Validation failed', formatted, 400)
  }
  
  return parsed.data
}
