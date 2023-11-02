import axios from "axios";

const API_URL = "http://localhost:3000";

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        try {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        } catch (e) {
            console.log(error);
            console.log(e);
        }

        return Promise.reject(error);
    }
);


export default apiClient;