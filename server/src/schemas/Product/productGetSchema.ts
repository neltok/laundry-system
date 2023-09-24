import { ZodError, z } from 'zod'
import { ObjectId } from 'mongodb'

const getProductSchema = z.object({
  top: z.number().min(1).max(50),
  productIds: z.array(
    z.string()
      .refine((val) => ObjectId.isValid(val), "Must be a valid ObjectId")).optional()
})

export type getProductSchema = z.infer<typeof getProductSchema>

export const validateGetProduct = (product: getProductSchema) => {
  try {
    getProductSchema.parse(product)
    return { isValid: true }
  }
  catch (e) {
    if (e instanceof ZodError) {
      console.log('issues', e.issues);
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