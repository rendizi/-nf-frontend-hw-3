import axios from 'axios';
import {SignInContextType, useAuth} from "@/app/config/context/authContext";
import {Dispatch, SetStateAction} from "react";

interface LoginResponse {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    token: string,
    refreshToken: string,
}

const loginRequest = async (username: string, password: string): Promise<[string, string]> => {
    try {
        const resp = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', { username, password });
        return [resp.data.token, resp.data.refreshToken];
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}


export default loginRequest;
