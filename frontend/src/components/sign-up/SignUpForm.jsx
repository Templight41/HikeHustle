export default function SignUpForm() {
    return (
        <form className="signUpForm">
            <div className="formElementsContainer username">
                <label htmlFor="username">Username</label>
                <div className="inputContainer">
                    <input type="text" id="username"/>
                </div>
            </div>
            <div className="formElementsContainer email">
                <label htmlFor="email">Email</label>
                <div className="inputContainer">
                    <input type="email" id="email"/>
                </div>
            </div>
            <div className="formElementsContainer password">
                <label htmlFor="password">Password</label>
                <div className="inputContainer">
                    <input type="password" id="password"/>
                </div>
            </div>
            <button id="submit" className="submit" type="button">Sign Up</button>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>
    )
}