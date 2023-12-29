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

    const handleKeyDown = async (event : any) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    const handleSubmit = async (event: any) => {
      event.preventDefault();
      handleLogin();
    }
    //make api call to login.
    const handleLogin = async () => {
        await axios({
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
          });

          
          setToken('loggedIn');
          navigate('/');

        
    };

    return (
    <>
        <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="********"
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            type="button"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
    </>
    
    );
}