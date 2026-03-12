import React, { use, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/dashboard");
    };

    return(
        <>
            <div>
                <h2>Login Page</h2>
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    );
};

export default Login;