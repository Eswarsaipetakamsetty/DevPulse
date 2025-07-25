import { useState } from "react"
import { apiClient } from "../../../api"
import Cookies from "js-cookie"

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (
        data : {
            username: string,
            password: string,
        }
    ) => {
        setLoading(true)
        setError(null)
        try {
            const response = await apiClient.request("POST", "api/auth/login/", undefined, data)
            const access_token = response.access_token  //based on response body
            if(access_token) {
                Cookies.set("access_token", access_token, {
                    expires: 7,
                    secure: true,
                    sameSite: "Lax",
                })
            }
            return response
        } catch (err:any) {
            setError(err.response?.data?.detail || "Login Failed")
        } finally {
            setLoading(false)
        }
    }
    return {handleLogin, loading, error}
}

export default useLogin