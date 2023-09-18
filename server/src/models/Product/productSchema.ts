import { ZodError, z } from 'zod'
import { ObjectId } from 'mongodb'

const productSchema = z.object({
  name: z.string().max(50),
  image: z.string().max(200),
  description: z.string().max(200),
  price: z.string().refine((value) => /^(0|[1-9]\d*)(\.\d+)?$/.test(value)).transform(Number),
  userId: z.string().refine((val) => ObjectId.isValid(val), "Must be a valid ObjectId")
})

type Product = z.infer<typeof productSchema>

export const validateProduct = (product: Product) => {
  try {
    productSchema.parse(product)
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