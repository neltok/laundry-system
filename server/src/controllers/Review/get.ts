import { ObjectId } from "mongodb"
import { connectToMongo } from "../../db/db"

export const get = async (id?: ObjectId) => {
    try {
        if (id && !ObjectId.isValid(id))
            throw 'Invalid ObjectId'

        const dbo = await connectToMongo()
        const filter = id ? { _id: new ObjectId(id) } : {}
        const products = await dbo.db.collection('reviews').find(filter).toArray()

        await dbo.client.close()

        return { success: true, reviews: products }
    } catch (e) {
        return { success: false, error: e }
    }
}