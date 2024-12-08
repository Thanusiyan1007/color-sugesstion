// src/components/Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, signInWithPopup } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Manual Registration Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", { email, password });
      alert("Registration successful!");
    } catch (error) {
      setError(error.response?.data.message || "Registration failed");
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken(); // Get Firebase token

      const response = await axios.post("http://localhost:5000/auth/google", { token });
      alert(`Welcome, ${response.data.name}`);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl">
        <figure className="lg:w-1/2">
          <img src="https://picsum.photos/seed/register/800/600" alt="Register" className="object-cover w-full h-full" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl font-bold mb-6">Register</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Register</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="form-control mt-4">
            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full">
              Sign in with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <p>Already have an account?</p>
            <Link to="/login" className="link link-primary">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
