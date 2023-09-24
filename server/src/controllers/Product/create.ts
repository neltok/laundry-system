import { validateProduct } from "../../schemas/Product/productSchema"
import { connectToMongo } from "../../db/db"
import { Product } from "../../schemas/Product/Product"

export const create = async (newProduct: Product) => {
  try {
    const validate = validateProduct(newProduct)

    if (!validate.isValid) throw JSON.stringify(validate.error)

    const dbo = await connectToMongo()

    if ("error" in dbo) throw new Error(dbo.error)
    await dbo.db.collection('products').insertOne(newProduct)
    await dbo.client.close()

    return { success: true }
  } catch (e) {
    return { success: false, error: e }
  }
}