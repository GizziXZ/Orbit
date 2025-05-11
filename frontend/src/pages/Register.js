import React from "react";
import "../styles/Register.css";

function Register() {
    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Create an Account</h1>
                <form className="register-form">
                    <input
                        type="text"
                        placeholder="Username"
                        className="register-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="register-input"
                    />
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
                <p className="register-footer">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;