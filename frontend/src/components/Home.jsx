import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPalette, FaRegSave, FaLayerGroup } from "react-icons/fa";
import backgroundImage from "../assets/illustrate-a-futuristic--robotic-boy-in-a-dynamic-.png";
import Navbar from "./Navbar";

const Home = ({ isLoggedIn, profileName, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRestrictedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-[#F5F8FA] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} profileName={profileName} setIsLoggedIn={setIsLoggedIn} />

      {/* Hero Section */}
      <section
        className="hero min-h-screen bg-cover bg-center text-white flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        {/* Overlay for darkening the background image slightly for text clarity */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content Wrapper */}
        <div className="relative text-center w-full px-4 z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to ColoUI</h1>
          <p className="mb-6 max-w-2xl mx-auto">
            Unleash your creativity with our AI-driven color selection tool. ColoUI helps designers find perfect color harmonies and build stunning UI palettes.
          </p>
          <div>
            <button
              onClick={() => handleRestrictedNavigation("/how-it-works")}
              className="btn btn-primary bg-[#FF5A5F] text-white mr-4 px-6 py-3 rounded-lg"
            >
              Get Started
            </button>
            <Link to="/register" className="btn btn-outline btn-secondary px-6 py-3 rounded-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-[#F5F8FA] text-center">
        <h2 className="text-4xl font-bold text-[#4A90E2] mb-10">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-screen-lg mx-auto">
          <div className="card card-compact bg-white w-80 shadow-xl transition-transform transform hover:scale-105 p-6 text-center">
            <FaPalette className="text-7xl text-[#FF5A5F] mb-4" />
            <h2 className="card-title text-[#4A90E2]">Choose Your Colors</h2>
            <p>Pick a base color, and ColoUI will suggest harmonious colors.</p>
          </div>
          <div className="card card-compact bg-white w-80 shadow-xl transition-transform transform hover:scale-105 p-6 text-center">
            <FaLayerGroup className="text-7xl text-[#FF5A5F] mb-4" />
            <h2 className="card-title text-[#4A90E2]">Explore Color Harmonies</h2>
            <p>Experiment with color schemes like complementary and triadic colors.</p>
          </div>
          <div className="card card-compact bg-white w-80 shadow-xl transition-transform transform hover:scale-105 p-6 text-center">
            <FaRegSave className="text-7xl text-[#FF5A5F] mb-4" />
            <h2 className="card-title text-[#4A90E2]">Save Your Palettes</h2>
            <p>Save your custom color palettes for future projects.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100 text-center">
        <h2 className="text-4xl font-bold text-[#4A90E2] mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
          <div className="card card-compact bg-white shadow-lg p-6 transition-transform transform hover:scale-105 text-center">
            <h3 className="card-title text-[#FF5A5F] mb-4">Real-Time Color Suggestions</h3>
            <p>Receive instant color suggestions based on color theory.</p>
          </div>
          <div className="card card-compact bg-white shadow-lg p-6 transition-transform transform hover:scale-105 text-center">
            <h3 className="card-title text-[#FF5A5F] mb-4">Customizable Colors</h3>
            <p>Adjust and save your colors to create unique palettes.</p>
          </div>
          <div className="card card-compact bg-white shadow-lg p-6 transition-transform transform hover:scale-105 text-center">
            <h3 className="card-title text-[#FF5A5F] mb-4">User-Friendly Interface</h3>
            <p>Easy to use with intuitive controls and a modern design.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-[#4A90E2] text-white text-center">
        <div className="container mx-auto">
          <p>© 2024 ColoUI. All rights reserved.</p>
          <p className="text-sm mt-1">Developed by Thanusiyan</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
