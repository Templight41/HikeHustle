export default function LoginForm() {
    return (
        <form className="loginForm">
            <div className="formElementsContainer username">
                <label htmlFor="username">Username</label>
                <div className="inputContainer">
                    <input type="text" id="username"/>
                </div>
            </div>
            <div className="formElementsContainer password">
                <label htmlFor="password">Password</label>
                <div className="inputContainer">
                    <input type="password" id="password"/>
                </div>
            </div>
            <button id="submit" className="submit" type="button">Login</button>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
    )
}