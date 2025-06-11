import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        const newErrors = {};

        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate("/home");
            } else {
                const errorData = await response.json();
                // alert(errorData.message);
                setErrors({ login: errorData.message });
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome to Orbit</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    {errors.login && <p className="error-message">{errors.login}</p>}
                    {errors.username && <p className="error-message">{errors.username}</p>}
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className={`login-input ${errors.username ? " error-border" : ""}`}
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`login-input ${errors.password ? " error-border" : ""}`}
                        value={formData.password}
                        onChange={handleChange}
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