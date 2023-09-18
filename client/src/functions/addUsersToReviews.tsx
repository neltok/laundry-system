import { Review } from "../interfaces/Review"
import { User } from "../interfaces/User"

export const addUsersToReviews = (reviews: Review[] | undefined, users: User[] | undefined) => {
  if (reviews === undefined) return []

  if (users === undefined) return reviews

  return reviews.map((r: Review) => {
    let usr: User | undefined
    usr = users.find((e: User) => { return e._id?.toString() === r.userId.toString() })

    return {
      ...r,
      userEmail: usr!.email || '',
      userName: usr!.name || ''
    }
  })
}
