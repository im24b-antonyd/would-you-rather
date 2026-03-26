import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1"

const apiClient = axios.create({
    baseURL: REST_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000
})

export default apiClient