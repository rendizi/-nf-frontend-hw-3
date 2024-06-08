import axios from 'axios'

interface RefreshResponse {
    token: string
    refreshToken: string
}

const tokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (refreshToken){
        try {
            const resp = await axios.post<RefreshResponse>('https://dummyjson.com/auth/refresh', {refreshToken})
            localStorage.setItem("refreshToken",resp.data.refreshToken)
            localStorage.setItem("token", resp.data.token)
        }catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
}
export default tokenRefresh