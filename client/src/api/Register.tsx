interface Register {
  name: string,
  password: string,
  email: string
}

export const Register = async (userData: Register) => {
  try {
    const response = await fetch('http://127.0.0.1:3001/user/create', {
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
    return { success: false, error: e.message }
  }
}