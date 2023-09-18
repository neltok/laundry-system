import { ObjectId } from 'mongodb'
import { ZodError, z } from 'zod'

const getUserSchema = z.object({
  top: z.number().min(1).max(50),
  usersIds: z.array(
    z.string()
       .refine((val) => new ObjectId(val), "Must be a valid ObjectId").optional()
  ).optional()
})

export type getUserSchema = z.infer<typeof getUserSchema>

export const validateGetUserById = (userArray: getUserSchema) => {
  try {
    getUserSchema.parse(userArray)
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