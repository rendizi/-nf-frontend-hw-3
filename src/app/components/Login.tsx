import React, {ChangeEvent, FormEvent, useState} from "react";
import loginRequest from "@/app/actions/login";
import {useAuth} from "@/app/config/context/authContext";
import {useTheme} from "@/app/config/context/themeContext";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {signIn} = useAuth()
    const {darkMode} = useTheme()

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginRequest(username, password).then(([returnedToken, returnedRefreshToken]) => {
            signIn({token: returnedToken, refreshToken: returnedRefreshToken})
            localStorage.setItem("token", returnedToken)
            localStorage.setItem("refreshToken", returnedRefreshToken)
        }).catch(error => {
            console.error(error);
        })
    };

    return (
        <div className={`hero min-h-screen bg-base-200`}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="username"
                                className="input input-bordered"
                                required
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
