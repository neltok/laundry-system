import { GetReviewsCountProps } from "../interfaces/GetReviewCountProps";
import { GetReviewsCountResponse } from "../interfaces/GetReviewCountResponse";
const API = process.env.REACT_APP_REACT_APP_REACT_APP_REACT_APP_SERVER_ENDPOINT

export const getReviewsCount = async (props: GetReviewsCountProps):Promise<GetReviewsCountResponse> => {
  try {
    const response = await fetch(API + '/review/getCount', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props)
    })

    const responseData:GetReviewsCountResponse = await response.json();
    if (!responseData.success) throw responseData.error
    
    return {
      success: true,
      count: responseData.count
    }
  } catch (e: any) {
    return { success: false, error: e.message, count: 0}
  }
}