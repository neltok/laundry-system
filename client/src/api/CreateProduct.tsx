import { GenericResponse } from "../interfaces/GenericResponse"
import { Product } from "../interfaces/Product"
const API = process.env.REACT_APP_SERVER_ENDPOINT

export const CreateProduct = async (productData: Product) => {
  try {
    const response = await fetch(API + '/product/create', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productData})
    })

    const responseData: GenericResponse = await response.json()

    if (!responseData.success) throw responseData.error

    return {
      success: true,
      data: responseData
    }
  } catch (e: any) {
    return { success: false, error: e || e.message }
  }
}