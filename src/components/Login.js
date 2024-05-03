import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; //import for the authentication method
import { auth } from "/Users/jana/Desktop/jayskitchen/src/firebase.js"; // Firebase Authentication instance
import "/Users/jana/Desktop/jayskitchen/src/Login.css"; 

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // ensure the page starts at the top
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to ensure this effect rans only once

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // using this method to sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                navigate("/home"); // will go back to home after successful login
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            alert("Incorrect login details. Please try again.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2 className="auth-heading">Login to Your Account</h2>

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email" // setting the ID
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password" // setting the ID to match the label
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">Login</button>
                </form>

                <div className="auth-link">
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
