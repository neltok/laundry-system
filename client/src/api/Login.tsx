interface Login {
  password: string,
  email: string
}

const API = process.env.REACT_APP_SERVER_ENDPOINT

export const Login = async (userData: Login) => {
  try {
    const response = await fetch(API + '/user/get', {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })

    console.log(response);
    
    const responseData = await response.json();
    if (!responseData.success) throw responseData.error
    console.log(responseData);


    return {
      success: true,
      userId: responseData.user[0]._id
    }
  } catch (e: any) {
    console.log(e);
    return { success: false, error: e.message || e}
  }
}