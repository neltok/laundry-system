export interface Product {
  _id?: string
  name: string,
  price: string,
  description: string,
  image: string,
  userId: string
  rating?: number,
  reviewsCount?: number
}
