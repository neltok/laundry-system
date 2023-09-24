import { ObjectId } from "mongodb"
import { connectToMongo } from "../../db/db"
import { validateGetReviewCount } from "../../schemas/Review/reviewGetCountSchema"
import { validateGetReview } from "../../schemas/Review/reviewGetSchema"
import { getReviewsCount } from "../../routes/Review/getCount"

interface Props {
  productId: string
}

interface Result {
  success: boolean,
  count?: number
  error?: any
}

export const getCount = async (props: Props): Promise<Result> => {
  try {
    const validate = validateGetReviewCount(props)

    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo = await connectToMongo()

    if ("error" in dbo) throw new Error(dbo.error)

    const count = (await dbo.db.collection('reviews').find({ productId: new ObjectId(props.productId) }).toArray()).length

    await dbo.client.close()

    return { success: true, count: count }
  } catch (e) {
    return { success: false, error: e }
  }
}