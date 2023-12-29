import axios from "axios";
import { useNavigate } from "react-router-dom";
import  AuthProvider  from "./authProvider";
import Navbar from "./components/Navbar";
import Routes from "./routes/Routes";

function App() {

  const handleLogout = async () => {
    console.log("handleLogout");
    const response = await axios({
      method: 'post',
      url: 'https://localhost:7097/logout',
      withCredentials: true,
      params: {
          useCookies: 'true'
      },
    });

    console.log(response);
  };

  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <Navbar onLogout={handleLogout} />
    </>
  )
}

export default App
