import { useState } from "react"
import { apiClient } from "../../../api"

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async (
        data : {
            user_email: string,
            username: string,
            first_name: string,
            last_name: string,
            password: string,
            organization_id: string,
            is_manager: boolean,
        }
    ) => {
        setLoading(true)
        setError(null)

        try {
            const response = apiClient.request("POST", "api/auth/register", undefined, data)
            return response
        } catch (err : any){
            setError(err.response?.data?.detail || "Registration failed")
        } finally {
            setLoading(false)
        }
    }
    return {handleRegister, loading, error}
}
export default useRegister