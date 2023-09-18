import { connectToMongo } from "../../db/db"
import { ObjectId } from "mongodb"
import { validateGetProduct, getProductSchema } from "../../models/Product/productGetSchema"

export const get = async (props: getProductSchema) => {
  try {
    const validate = validateGetProduct(props)

    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo = await connectToMongo()
    const objectsIds = props.productIds ? props.productIds!.map(e => { return new ObjectId(e) }) : []
    const filter: {} = props.productIds ? { _id : { $in : objectsIds}} : {}
    const products = await dbo.db.collection('products').find(filter).limit(props.top).toArray()

    await dbo.client.close()

    return { success: true, products: products }
  } catch (e) {
    return { success: false, error: e }
  }
}