import './App.css';
import LoginPage from './pages/login.js';
import ForgotPasswordPage from './pages/forgotpassword.js';
import { useUserContext } from './providers/UserProvider.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/notfound.js';
import HomePage from './pages/home.js';
import Toast from './components/Toast.js';
import { useEffect } from 'react';
import { SERVER_URL } from './utils/Constants.js';

function LoginRoute() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/landing/*' element={<Navigate to="/"/>}/>
      <Route path='/forgotpassword' element={<ForgotPasswordPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

function HomeRoute() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/landing/"/>}/>
      <Route path='/landing/*' element={<HomePage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

function App() {

  let [authData, setAuthData] = useUserContext()

  useEffect(() => {
    fetch(SERVER_URL+"/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `bearer ${authData?.token}`
      }
    })
    .then(res => {
      if(res.status !== 202) {
        throw new Error()
      }
    })
    .catch((e) => {
      localStorage.clear()
      setAuthData(null)
    })
  },[authData?.token])

  return (
    <div className="app">
      {
        !authData
        ? <LoginRoute/>
        : <HomeRoute/>
      }
      <Toast/>
    </div>
  )
}

export default App;