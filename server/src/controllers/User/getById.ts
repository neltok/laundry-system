import { ObjectId } from "mongodb"
import { connectToMongo } from "../../db/db"
import { getUserSchema, validateGetUserById } from "../../schemas/User/getUserByIdSchema"

export const getById = async (getUserData: getUserSchema) => {
  try {
    const validate = validateGetUserById(getUserData)

    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo = await connectToMongo()

    if ("error" in dbo)
      throw new Error(dbo.error)

    const objectsIds = getUserData.usersIds!.map(e => { return new ObjectId(e) })

    const filter: {} = getUserData.usersIds ? { _id: { $in: objectsIds } } : {};
    const users = await dbo.db.collection('users').find(filter).limit(getUserData.top).toArray()

    await dbo.client.close()

    if (users?.length === 0) throw 'User not found'

    return { success: true, users: users }
  } catch (e) {
    return { success: false, error: e }
  }
}