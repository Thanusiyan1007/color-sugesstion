// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLoggedIn, setProfileName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true); // Update login status
      setProfileName(response.data.name || email); // Set profile name dynamically
      navigate("/"); // Redirect to homepage on successful login
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const response = await axios.post("http://localhost:5000/auth/google", { token });
      toast.success(`Welcome, ${response.data.name}`);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true); // Update login status
      setProfileName(response.data.name); // Set profile name from response
      navigate("/"); // Redirect to homepage on successful Google sign-in
    } catch (error) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl">
        <figure className="lg:w-1/2">
          <img src="https://picsum.photos/seed/login/800/600" alt="Login" className="object-cover w-full h-full" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin}>
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
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="form-control mt-4">
            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full">
              Sign in with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <p>Don't have an account?</p>
            <Link to="/register" className="link link-primary">Sign up now</Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
