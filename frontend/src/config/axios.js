import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        const refreshToken = localStorage.getItem("refreshToken")

        if(error.response.status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true

            return axiosInstance.post("/refresh-token", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
                }
            })
        }
    }
)