import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider";
import axios from "axios";
import { useEffect } from "react";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    handleLogout();
   });

  const serverLogout = async () => {
    const response = await axios({
      method: 'post',
      url: 'https://localhost:7097/logout',
      withCredentials: true,
      params: {
          useCookies: 'true'
      },
    });

    console.log(response);
  }
  const handleLogout = () => {
    serverLogout();
    setToken();
    navigate("/", { replace: true });
  };

  return <></>;
};

export default Logout;
