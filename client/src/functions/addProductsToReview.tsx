import { Product } from "../interfaces/Product"
import { Review } from "../interfaces/Review"

export const addProductsToReviews = (reviews: Review[] | undefined, products: Product[] | undefined) => {
  if (reviews === undefined) return []

  if (products === undefined) return reviews

  return reviews.map((r: Review) => {
    let prod: Product | undefined
    prod = products.find((e: Product) => { return e._id?.toString() === r.productId.toString() })

    return {
      ...r,
      productName: prod?.name || ''
    }
  })
}
