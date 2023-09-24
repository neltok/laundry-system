import { ObjectId } from 'mongodb'
import { ZodError, z } from 'zod'

const reviewSchema = z.object({
  comment: z.string().max(200).optional(),
  rating: z.string().refine((value) => /^[1-5]$/.test(value)).transform(Number),
  userId: z.string().refine((val) => ObjectId.isValid(val), "Must be a valid ObjectId"),
  productId: z.string().refine((val) => ObjectId.isValid(val), "Must be a valid ObjectId")
})

type Review = z.infer<typeof reviewSchema>

export const validateReview = (review: Review) => {
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