import axios, {type Method} from "axios";
import Cookies from "js-cookie";

class ApiClient {
    private baseURL : string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    async request(
        method: Method,
        endPoint: string,
        token?: string,
        data?: any,
        params?: any,
    ) {
        const accessToken = token || Cookies.get("access_token")
        try {
            const response = await axios({
                method,
                url: `${this.baseURL}${endPoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && {Authorization: `Bearer ${accessToken}`})
                },
                data,
                params,
            })

            if (response.status === 401 && data.code == "token_not_valid") {
                Cookies.remove("access_token")
                Cookies.remove("user_data")
                window.location.href = "/login"
            }
            return response.data
        } catch(err:any) {
            console.error("API Error: ", err.response?.data || err.detail)
            throw err
        }

    }
}

export default ApiClient