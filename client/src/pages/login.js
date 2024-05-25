import '../css/LoginPage.css'
import { useUserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'

function LoginPage() {

    let [, setUser] = useUserContext()
    
    let handleLogin = (e) => {
        e.preventDefault()
        
        let email = e.target.elements.email.value
        let password = e.target.elements.password.value
        
        if(email==="email@email.com" && password==="password") {
            localStorage.setItem("user", email)
            setUser(email)
        }
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
            </form> 
        </div>
    )
}

export default LoginPage