import { error } from 'console'
import { ZodError, z } from 'zod'

const userSchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
})

type User = z.infer<typeof userSchema>

export const validateUser = (user: User) => {
    try {
        userSchema.parse(user)
        return { valid: true }
    }
    catch (e) {      
        if (e instanceof ZodError)
            return { valid: false, error: e.issues}
        return { valid: false, error: e }
    }
}