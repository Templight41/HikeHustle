import { useState } from "react"
import axios from "axios"
import validator from "validator"
import { json, Link } from "react-router-dom";

export default function LoginForm({apiUrl, setAuthToken, authToken}) {
    let [error, setError] = useState("");
    
    let [loginForm, setLoginForm] = useState(
        {
            email: "",
            password: ""
        }
    );

    const formChange = (e) => {
        setLoginForm(formData => ({
            ...formData, [e.target.id]: e.target.value  
        }))
    }

    const formSubmit = (e) => {
        if(validator.isEmail(loginForm.email) && loginForm.password.length >= '8') {

            // Submit form
            setError("")
            axios.post(`${apiUrl}/login`, {...loginForm})
            .then((res) => {
                setAuthToken(res.data.accessToken)
                localStorage.setItem("token", JSON.stringify({accessToken: res.data.accessToken, refreshToken: res.data.refreshToken}))
                localStorage.setItem("userData", JSON.stringify({email: res.data.email, username: res.data.username, level: res.data.level}))
            })
            .then((res) => {
                window.location = "/"
            })
            .catch((err) => {
                if(err.response.status == 404) setError("User does not exist, create account")
                if(err.response.status == 401) setError("Email and password do not match")
            })
        } else if(!validator.isEmail(loginForm.email)){

            //invalid email
            setError("Enter a valid email")

        } else {
            //Invalid password
            setError("Password must be greater than 8 characters")
        }
    }

    return (
        <form className="loginForm">
            <div className="formElementsContainer username">
                <label htmlFor="email">Email</label>
                <div className="inputContainer">
                    <input type="email" id="email" onChange={formChange}/>
                </div>
            </div>
            <div className="formElementsContainer password">
                <label htmlFor="password">Password</label>
                <div className="inputContainer">
                    <input type="password" id="password" onChange={formChange}/>
                </div>
            </div>
            <p id="error">{error}</p>
            <button id="submit" className="submit" type="button" onClick={formSubmit}>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
    )
}