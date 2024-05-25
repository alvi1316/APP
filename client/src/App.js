import './App.css';
import LoginPage from './pages/login.js';
import ForgotPasswordPage from './pages/forgotpassword.js';
import { useUserContext } from './providers/UserProvider.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/notfound.js';
import HomePage from './pages/home.js';
import Toast from './components/Toast.js';

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

  let [user,] = useUserContext()

  return (
    <div className="app">
      {
        !user
        ? <LoginRoute/>
        : <HomeRoute/>
      }
      <Toast/>
    </div>
  )
}

export default App;