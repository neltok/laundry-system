interface Product {
  name: string,
  description: string,
  image: string,
  price: number,
  userId?: string
}

interface Response {
  success: boolean,
  products: Product[],
  error?: string | any
}

export const CreateNewProduct = async (productData: Product, userId: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3001/product/create', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productData, userId })
    })

    const responseData:Response = await response.json()

    // console.log(responseData);

    if (!responseData.success) throw responseData.error

    return {
      success: true,
      data: responseData
    }
  } catch (e: any) {
    return { success: false, error: e.message || e }
  }
}