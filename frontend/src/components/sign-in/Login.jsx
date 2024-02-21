import "./Login.css"
import LoginForm from "./LoginForm"

export default function Login() {
    return(
        <div className="loginContainer">

            <h1 className="loginRegisterHeader">HikeHustle</h1>

            <div className="formContainer">
                <h2>Login</h2>
                <LoginForm />
            </div>

        </div>
    )
}