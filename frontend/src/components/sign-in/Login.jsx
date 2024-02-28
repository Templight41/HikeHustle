import "./Login.css"
import LoginForm from "./LoginForm"

export default function Login({apiUrl, setAuthToken, authToken}) {
    return(
        <div className="loginContainer">

            <h1 className="loginRegisterHeader"><a href="/">HikeHustle</a></h1>


            <div className="formContainer">
                <h2>Login</h2>
                <LoginForm authToken={authToken} setAuthToken={setAuthToken} apiUrl={apiUrl}/>
            </div>

        </div>
    )
}