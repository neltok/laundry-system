import { validateReview } from "../../models/Review/reviewSchema"
import { connectToMongo } from "../../db/db"
import { Review } from "../../models/Review/Review"

export const create = async (newReview: Review) => {
    try {
        const validate = validateReview(newReview)
        if (!validate.isValid) throw JSON.stringify(validate.error)
        
        const dbo = await connectToMongo()
        await dbo.db.collection('reviews').insertOne(newReview)
        await dbo.client.close()

        return { success: true }
    } catch (e) {
        return { success: false, error: e }
    }
}