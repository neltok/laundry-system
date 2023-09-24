import { WithId } from "mongodb"
import { connectToMongo } from "../../db/db"
import { validateGetReview } from "../../schemas/Review/reviewGetSchema"

interface getProps {
  top: number,
  productId?: string,
}

interface Result {
  success: boolean,
  reviews?: WithId<Document>[] | any,
  error?: any
}

export const get = async (props: getProps): Promise<Result> => {
  try {
    // console.log(props);
    const validate = validateGetReview(props)
    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo = await connectToMongo()
    if ("error" in dbo) throw new Error(dbo.error)

    const filter = props.productId ? { productId: props.productId } : {}
    const reviews = await dbo.db.collection('reviews').find(filter).limit(props.top).toArray()

    await dbo.client.close()

    return { success: true, reviews: reviews }
  } catch (e) {
    return { success: false, error: e }
  }
}