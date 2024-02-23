import "./SignUp.css"
import SignUpForm from "./SignUpForm"

export default function SignUp() {
    return(
        <div className="signUpContainer">

            <h1 className="loginRegisterHeader"><a href="/">HikeHustle</a></h1>

            <div className="formContainer">
                <h2>Sign Up</h2>
                <SignUpForm />
            </div>

        </div>
    )
}