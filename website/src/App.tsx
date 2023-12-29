import axios from "axios";
import  AuthProvider  from "./authProvider";
import Navbar from "./components/Navbar";
import Routes from "./routes/Routes";

function App() {

  const handleLogout = async () => {
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
      <Navbar onLogout={handleLogout} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  )
}

export default App
