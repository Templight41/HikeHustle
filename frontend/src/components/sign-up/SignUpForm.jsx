import { useState } from "react"
import axios from "axios"
import validator from "validator";


export default function SignUpForm() {
    let [error, setError] = useState("");
    
    let [signUpForm, setSignUpForm] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    );

    const formChange = (e) => {
        setSignUpForm(formData => ({
            ...formData, [e.target.id]: e.target.value  
        }))
    }

    const formSubmit = (e) => {
        if(validator.isEmail(signUpForm.email) && signUpForm.password.length >= '8' && signUpForm.username.length >= '3') {

            // Submit form
            setError("")
            axios.post("http://localhost:3000/signup", {...signUpForm}, {withCredentials: true})
            .then((res) => {
                localStorage.setItem("token", JSON.stringify(res.data))
            })
            .then((res) => {
                window.location = "/"
            })
            .catch((err) => {
                if(err.response.status == 409) setError("User already exists, login")
            })
        } else if(!validator.isEmail(signUpForm.email)){

            //invalid email
            setError("Enter a valid email")

        } else {
            //Invalid password
            setError("Password must be greater than 8 characters")
        }
    }
    
    return (
        <form className="signUpForm">
            <div className="formElementsContainer username">
                <label htmlFor="username">Username</label>
                <div className="inputContainer">
                    <input onChange={formChange} type="text" id="username"/>
                </div>
            </div>
            <div className="formElementsContainer email">
                <label htmlFor="email">Email</label>
                <div className="inputContainer">
                    <input onChange={formChange} type="email" id="email"/>
                </div>
            </div>
            <div className="formElementsContainer password">
                <label htmlFor="password">Password</label>
                <div className="inputContainer">
                    <input onChange={formChange} type="password" id="password" minLength={8}/>
                </div>
            </div>
            <p id="error">{error}</p>
            <button id="submit" className="submit" type="button" onClick={formSubmit}>Sign Up</button>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>
    )
}