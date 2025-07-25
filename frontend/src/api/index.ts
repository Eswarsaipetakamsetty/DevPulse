import ApiClient from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = new ApiClient(BASE_URL)