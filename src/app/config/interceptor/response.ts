import axios from 'axios'
import tokenRefresh from "@/app/actions/refresh";

const setUpResponse = () => {
    axios.interceptors.response.use((response) => {
        return response
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response) {
            if (error.response.status === 404) {
                console.log("not found");
            }
            if (error.response.status === 403) {
                console.log("unauthorized");
            }
            if (error.response.status === 401 && error.response.data && error.response.data.name && error.response.data.name === "TokenExpiredError") {
                try {
                    await tokenRefresh();
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    throw refreshError;
                }
            }
        }
        return error;
    });
}

export default setUpResponse;
