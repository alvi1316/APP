import '../css/LoginPage.css'
import { useUserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../utils/Constants'
import { useState } from 'react'

function LoginPage () {

    let [, setUser] = useUserContext()
    let [error, setError] = useState("")
    
    let handleLogin = (e) => {
        e.preventDefault()
        
        let email = e.target.elements.email.value
        let password = e.target.elements.password.value
        
        fetch(SERVER_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if(res.status !== 200) {
                throw new Error();
            }
            return res.json()
        })
        .then(data => {
            localStorage.setItem("authData", JSON.stringify(data.data))
            setUser(data.data)
        })
        .catch((e) => {
            setError("Login Failed!")
        })
    }

    return (
        <div className="loginpage">
            <form onSubmit={handleLogin}>
                <input placeholder="Email" type="email" name="email"/>
                <br/>
                <input placeholder="Password" type="password" name="password"/>
                <br/>
                <input value="Login" type="submit"/>
                <br/>
                <p>Forgot Password? <Link to="/forgotpassword">click here</Link></p>
                <p className='error'>{error}</p>
            </form> 
        </div>
    )
}

export default LoginPage