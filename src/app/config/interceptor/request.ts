import axios from 'axios'
import getToken from "@/app/actions/getToken";

const setUpRequest = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = getToken()
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            console.log("Request Error:", error)
            return Promise.reject(error);
        }
    );
}

export default setUpRequest;