// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ColorSuggestionPage from "./components/ColorSuggestion"; // Ensure this is the correct path
import Navbar from "./components/Navbar"; // Import Navbar component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState("");

  return (
    <Router>
      <div>
        {/* Only show Navbar if not on /login route */}
        {window.location.pathname !== "/login" && (
          <Navbar isLoggedIn={isLoggedIn} profileName={profileName} setIsLoggedIn={setIsLoggedIn} />
        )}
        
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} profileName={profileName} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/how-it-works"
            element={<ColorSuggestionPage />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setProfileName={setProfileName} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
