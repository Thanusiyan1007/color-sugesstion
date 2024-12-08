import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Updated import
import axios from 'axios'; // Assuming you are using axios

const ColorSuggestionPage = () => {
  const [promptText, setPromptText] = useState("");
  const [suggestedPalettes, setSuggestedPalettes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [paletteImage, setPaletteImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestionFetched, setSuggestionFetched] = useState(false);

  const navigate = useNavigate();  // Replaced useHistory with useNavigate

  const getColorSuggestions = async () => {
    setLoading(true);
    setPaletteImage(null); // Reset image for each new suggestion
    setSuggestionFetched(false);

    try {
      const response = await axios.post("http://localhost:5000/api/color-suggestions", { promptText });
      setSuggestedPalettes(response.data.palettes || []);
      setRecommendations(response.data.recommendations || []);
      setSuggestionFetched(true);
    } catch (error) {
      console.error("Error fetching color suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPaletteImage = async (palette) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/color-palette-image",
        { palette: palette || [] },
        { responseType: "blob" }
      );
      setPaletteImage(URL.createObjectURL(response.data)); // Convert blob to URL for image display
    } catch (error) {
      console.error("Error fetching palette image:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-screen-xl mt-16">
      {/* Add Navbar here if needed */}

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Generate Color Suggestions Based on Your Prompt</h2>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
        {/* Left Side */}
        <div className="flex-1 max-w-md mx-auto md:mx-0">
          <label className="label">
            <span className="label-text text-lg font-semibold text-gray-700">Describe your design needs</span>
          </label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="textarea textarea-bordered w-full mb-4 p-4 text-sm text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 'I need a color palette for a calm, nature-themed wellness blog.'"
            rows="4"
          ></textarea>
          <button
            onClick={getColorSuggestions}
            className="btn btn-primary w-full mb-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            disabled={!promptText || loading}
          >
            {loading ? "Loading..." : "Get Color Suggestions"}
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-1 mt-8 md:mt-0">
          {recommendations.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Usage Recommendations</h3>
              <ul className="list-none space-y-2 text-gray-600">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Display Suggested Color Palette */}
      {suggestedPalettes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Suggested Color Palettes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedPalettes.map((palette, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                onClick={() => getPaletteImage(palette)}
              >
                <div
                  className="h-40"
                  style={{ backgroundColor: palette[0] }}
                ></div>
                <div className="p-4">
                  <p className="font-semibold text-sm">Palette {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Generated Palette Image */}
      {paletteImage && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Generated Palette Image</h3>
          <img src={paletteImage} alt="Generated Color Palette" className="w-full max-w-xs mx-auto border rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default ColorSuggestionPage;
