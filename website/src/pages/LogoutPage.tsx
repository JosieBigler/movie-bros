import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider";
import axios from "axios";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();


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
    //navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return <>Logout Page</>;
};

export default Logout;
