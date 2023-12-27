import  AuthProvider  from "./authProvider";
import Routes from "./routes/ProtectedRoute";

function App() {

  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  )
}

export default App
