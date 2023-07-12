import { validateUser } from "../../models/User/userSchema"
import { connectToMongo } from "../../db/db"
import { User } from "../../models/User/User"

export const create = async (newUser: User) => {
    try {
        const validate = validateUser(newUser)
        if (!validate.isValid) throw JSON.stringify(validate.error)
        
        const dbo = await connectToMongo()
        const userId = (await dbo.db.collection('users').insertOne(newUser)).insertedId
        await dbo.client.close()

        return { success: true, newUserId: userId}
    } catch (e) {
        return { success: false, error: e }
    }
}