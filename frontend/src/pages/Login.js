import React from "react";
import "../styles/Login.css";

function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome to Orbit</h1>
                <form className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <p className="login-footer">
                    Don't have an account? <a href="/register">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;