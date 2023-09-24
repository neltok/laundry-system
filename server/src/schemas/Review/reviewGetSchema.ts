import { ObjectId } from 'mongodb'
import { ZodError, z } from 'zod'

const reviewSchema = z.object({
  productId: z.string().refine((val) => ObjectId.isValid(val), "Must be a valid ObjectId").optional(),
  top: z.number().min(1).max(50)
})

type Review = z.infer<typeof reviewSchema>

export const validateGetReview = (review: Review) => {
  try {
    reviewSchema.parse(review)
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