interface Register {
  name: string,
  password: string,
  email: string
}

const API = process.env.REACT_APP_SERVER_ENDPOINT

export const Register = async (userData: Register) => {
  try {
    const response = await fetch(API + '/user/create', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    return {
      success: true,
      data: await response.json()
    }
  } catch (e: any) {
    return { success: false, error: e || e.message }
  }
}