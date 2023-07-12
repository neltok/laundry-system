import { connectToMongo } from "../../db/db"
import { ObjectId } from "mongodb"

export const get = async (id?: ObjectId) => {
    try {
        if (id && !ObjectId.isValid(id))
            throw 'Invalid ObjectId'

        const dbo = await connectToMongo()
        const filter = id ? { _id: new ObjectId(id) } : {}
        const products = await dbo.db.collection('products').find(filter).toArray()

        await dbo.client.close()

        return { success: true, products: products }
    } catch (e) {
        return { success: false, error: e }
    }
}