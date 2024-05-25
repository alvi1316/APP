import '../css/ForgotPassword.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPasswordPage() {

    let [msg, setMsg] = useState("")

    let handleSubmit = (e) => {
        e.preventDefault()
        let email = e.target.elements.email.value
        if(email === "email@email.com") {
            setMsg("Instruction is sent to your email.")
        } else {
            setMsg("This email isn't associated with any account.")
        }
    }

    return (
        <div className="forgotpasswordpage">
            <form onSubmit={handleSubmit}>
                <label>Please provide email of your account: </label>
                <br/>
                <input placeholder='Email' type='email' name='email' />
                <br/>
                <input type='submit' value="submit"/>
                <br/>
                {
                    msg!==""
                    ? <>{msg}<br/></>
                    : null
                }
                <br/>
                <Link to="/">Go back to login</Link>
            </form>
        </div>
    )
}

export default ForgotPasswordPage