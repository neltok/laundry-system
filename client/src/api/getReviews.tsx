import { GetReviewsProps } from "../interfaces/GetReviewProps";
import { GetReviewResponse } from "../interfaces/GetReviewResponse";
const API = process.env.REACT_APP_SERVER_ENDPOINT

export const getReviews = async (props: GetReviewsProps) => {
  try {
    const response = await fetch(API + '/review/get', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props)
    })

    const responseData:GetReviewResponse = await response.json();
    if (!responseData.success) throw responseData.error
    
    return {
      success: true,
      reviews: responseData.reviews
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}