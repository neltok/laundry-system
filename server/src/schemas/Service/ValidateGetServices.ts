import { ZodError, z } from 'zod'
import { ObjectId } from 'mongodb'

const GetServicesSchema = z.object({
  limit: z.number().min(1).optional(),
  page: z.number().min(0).optional(),
})

export type GetServices = z.infer<typeof GetServicesSchema >

export const ValidateGetServices = (product: GetServices) => {
  try {
    GetServicesSchema.parse(product)
    return { isValid: true }
  }
  catch (e) {
    if (e instanceof ZodError) {
      return {
        isValid: false, error: e.issues.map(e => {
          return {
            message: e.message,
            path: e.path,
          }
        })
      }
    }
    return { isValid: false, error: e }
  }
}