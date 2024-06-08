import React, {createContext, ReactNode, useContext, useState} from 'react';

export type AuthContextType = {
    signedIn: boolean;
    token: string;
    refreshToken: string;
    signIn: (props: SignInContextType) => void;
};

const defaultValue: AuthContextType = {
    signedIn: false,
    token: '',
    refreshToken: '',
    signIn: () => {}
};

export type SignInContextType = {
    token: string;
    refreshToken: string;
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthContextType>(defaultValue);

    const signIn = (props: SignInContextType) => {
        setAuth({
            signedIn: true,
            token: props.token,
            refreshToken: props.refreshToken,
            signIn
        });
    }

    return (
        <AuthContext.Provider value={{ ...auth, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext is undefined");
    }
    return context;
};
