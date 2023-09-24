import { connectToMongo } from "../../db/db"
import { getUser } from "../../schemas/User/getUser"

export const get = async (user: getUser) => {
  try {
    const dbo = await connectToMongo()

    if ("error" in dbo) throw new Error(dbo.error)

    const filter = { email: user.email, password: user.password }
    const loggedUser = await dbo.db.collection('users').find(filter).toArray()

    await dbo.client.close()

    if (loggedUser?.length === 0) throw 'User not found'

    return { success: true, user: loggedUser }
  } catch (e) {
    return { success: false, error: e }
  }
}