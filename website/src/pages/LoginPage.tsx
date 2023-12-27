import { FC } from "react";
import { useAuth } from "../authProvider";
import { useNavigate } from "react-router-dom";

export const LoginPage : FC = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setToken("this is a test token");
        navigate("/", { replace: true });
    };

    setTimeout(() => {
        handleLogin();
    }, 3 * 1000);

    return <>Login Page</>;
}