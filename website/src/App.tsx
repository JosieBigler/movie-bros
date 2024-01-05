import axios from "axios";
import { useNavigate } from "react-router-dom";
import  AuthProvider  from "./authProvider";
import Navbar from "./components/Navbar";
import Routes from "./routes/Routes";

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Navbar  />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
