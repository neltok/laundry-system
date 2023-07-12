interface Login {
  password: string,
  email: string
}

export const Login = async (userData: Login) => {
  try {
    const response = await fetch('http://127.0.0.1:3001/user/get', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    const responseData = await response.json();
    if (!responseData.success) throw responseData.error
    console.log(responseData);
    

    return {
      success: true,
      userId: responseData.user[0]._id
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}