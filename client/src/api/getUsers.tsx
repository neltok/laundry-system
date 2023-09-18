import { GetUsersProps } from "../interfaces/GetUsersProps";
import { GetUsersResponse } from "../interfaces/GetUsersResponse";
const API = process.env.REACT_APP_SERVER_ENDPOINT

export const getUsers = async (props: GetUsersProps) => {
  try {
    const response = await fetch(API + '/user/getById', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props)
    })

    const responseData: GetUsersResponse = await response.json();
    if (!responseData.success) throw responseData.error

    return {
      success: true,
      users: responseData.users
    }
  } catch (e: any) {
    return { success: false, error: e || e.message }
  }
}