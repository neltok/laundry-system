import { ZodError, z } from 'zod'
import { ObjectId } from 'mongodb'

const regex = new RegExp(/^[0-9]\d{9}$/)

const ServiceSchema = z.object({
  clientName: z.string().min(8).max(50).refine((value) => value.trim() !== "", {
    message: "Name is required",
  }),
  // phoneNumber: z.string().optional().refine((value) => value && /^[0-9]\d{9}$/.test(value), {
  phoneNumber: z.string().optional(),
  weight: z.number().min(1).max(100).refine((value) => value >= 1, {
    message: "At least 1 Kg is required",
  }),
  pay: z.boolean().refine((value) => typeof value === "boolean", {
    message: "Pay option is required",
  }),
});

export type Service = z.infer<typeof ServiceSchema>

export const ValidateCreateService = (service: Service) => {
  try {
    const a = ServiceSchema.parse(service)

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