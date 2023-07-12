export const getProducts = async (idProduct?: string) => {
  try {
    const response = await fetch('http://127.0.0.1:3001/product/get', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idProduct)
    })

    const responseData = await response.json();
    if (!responseData.success) throw responseData.error

    return {
      success: true,
      products: responseData.products
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}