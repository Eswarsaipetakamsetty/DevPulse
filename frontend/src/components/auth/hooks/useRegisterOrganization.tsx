import { useState } from "react"
import { apiClient } from "../../../api"

const useRegisterOrganization = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegisterOrganization = async (
        data : {
            email: string,
            organization_name: string,
            description: string,
        }
    ) => {
        setError(null)
        setLoading(true)

        try {
            const response = apiClient.request("POST", "api/auth/create", undefined, data)
            return response
        } catch(err:any){
            setError(err.response?.data?.detail)
        } finally {
            setLoading(false)
        }
    }
    return {handleRegisterOrganization, loading, error}
}

export default useRegisterOrganization