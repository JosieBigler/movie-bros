import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { Movies, MoviesList } from './components/Movies'

const movies : MoviesList[] = [
  {title: 'Test'},
  {title: 'Shadowrunner'}
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GoogleOAuthProvider clientId="732674353767-69gt8nud7n9b0atdkj4piifn8cjge5e9.apps.googleusercontent.com">
      <Header />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Movies movies={movies}></Movies>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
