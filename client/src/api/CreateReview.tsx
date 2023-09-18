import { GenericResponse } from "../interfaces/GenericResponse"
import { Review } from "../interfaces/Review"
const API = process.env.REACT_APP_SERVER_ENDPOINT

export const CreateReview = async (reviewData: Review) => {
  try {
    const response = await fetch(API + '/review/create', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData)
    })

    const responseData: GenericResponse = await response.json()

    if (!responseData.success) throw responseData.error

    return {
      success: true,
    }
  } catch (e: any) {
    return { success: false, error: e || e.message }
  }
}