import { ZodError, z } from 'zod'

const userSchema = z.object({
    name: z.string().max(50),
    password: z.string().max(50),
    email: z.string().max(50),
})

type User = z.infer<typeof userSchema>

export const validateUser = (user: User) => {
    try {
        userSchema.parse(user)
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