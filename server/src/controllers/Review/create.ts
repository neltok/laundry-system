import { validateReview } from "../../models/Review/reviewSchema"
import { connectToMongo } from "../../db/db"
import { Review } from "../../models/Review/Review"
import { ObjectId } from "mongodb"

export const create = async (newReview: Review) => {
  try {
    const validate = validateReview(newReview)
    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo = await connectToMongo()
    const inserted = await dbo.db.collection('reviews').insertOne(newReview)

    if (!inserted.insertedId) throw 'Error: Not inserted! ' + JSON.stringify(newReview)

    const result = await dbo.db.collection('products').findOneAndUpdate(
      { _id: new ObjectId(newReview.productId) },
      { $inc: { reviewsCount: 1 } }
    )
    
    if(!result.ok)
      throw JSON.stringify(result.lastErrorObject)
    
    await dbo.client.close()

    return { success: true }
  } catch (e) {
    return { success: false, error: e }
  }
}