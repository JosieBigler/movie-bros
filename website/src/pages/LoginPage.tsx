import { FC, useState } from "react";
import { useAuth } from "../authProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginPage : FC = () => {
    const  [userValue, setUserValue] =  useState('');
    const  [passwordValue, setPasswordValue] =  useState('');
    const { setToken } = useAuth();
    const navigate = useNavigate();
    console.log('page loaded');

    //make api call to login.
    const handleLogin = (event: any) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://localhost:7097/login',
            withCredentials: true,
            params: {
                useCookies: 'true'
            },
            data: {
                email: userValue,
                password: passwordValue
            }
          }).then(promise => {
            setToken('loggedIn');
          });

        
    };

    const  handleUserChange = (event : any) => {
		setUserValue(event.target.value);
	};

    const  handlePasswordChange = (event : any) => {
		setPasswordValue(event.target.value);
	};


    return (
    <>
        <form>
            <label>User</label>
            <input  type="text"  value={userValue} onChange={handleUserChange} />
            <label>Password</label>
            <input  type="text"  value={passwordValue} onChange={handlePasswordChange} />
            <button onClick={handleLogin}>Submit</button>
        </form>
    </>
    
    );
}