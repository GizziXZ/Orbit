import React from "react";
import "../styles/Register.css";

function Register() {
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        const newErrors = {};

        if (!username) newErrors.username = "Username is required";
        if (username.length < 5) newErrors.username = "Username must be at least 5 characters long";
        if (username.length > 20) newErrors.username = "Username must be less than 20 characters long";
        if (!/^[a-zA-Z0-9._]+$/.test(username) || /\s/.test(username)) newErrors.username = "Username can only contain letters, numbers, underscores, dots, and no spaces";
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";
        if (password !== confirmPassword || !confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert("Registration successful");
                // TODO - Redirect to login or home page
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Create an Account</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    {errors.username && <p className="error-message">{errors.username}</p>}
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={`register-input ${errors.username ? "error-border" : ""}`}
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`register-input ${errors.email ? "error-border" : ""}`}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`register-input ${errors.password ? "error-border" : ""}`}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className={`register-input ${errors.confirmPassword ? "error-border" : ""}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
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