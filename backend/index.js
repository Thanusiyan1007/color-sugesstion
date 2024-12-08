// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const firebaseAdmin = require("firebase-admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { createCanvas } = require("canvas"); // Import node-canvas for image generation

const app = express();
const PORT = 5000;
const JWT_SECRET = "TDqFq24AfzGDEwveLCW5ekbq9WOcpL5D";
const OPENAI_API_KEY = "#"; // Replace with your actual OpenAI API key

// Firebase Admin SDK initialization with service account
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require("./serviceAccountKey.json")),
});

app.use(cors());
app.use(bodyParser.json());

const users = []; // In-memory user store (for demo purposes)

// Endpoint to handle Google authentication
app.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    let user = users.find((user) => user.uid === uid);
    if (!user) {
      user = { uid, email, name };
      users.push(user);
    }

    const jwtToken = jwt.sign({ uid, email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token: jwtToken, name });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Endpoint to register new users
app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Endpoint for manual login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Color Suggestion API Endpoint with User-Provided Prompt
app.post("/api/color-suggestions", async (req, res) => {
  const { promptText } = req.body;

  if (!promptText) {
    return res.status(400).json({ message: "Prompt text is required" });
  }

  try {
    const prompt = `
      The user wants to design a website and needs guidance on color choices. 
      Given the following description: "${promptText}", suggest 1 unique color palette (with 5 colors) based on color psychology and color theory.
      Use principles like complementary colors, triadic colors, and contrast.
      Provide recommendations on how each color code in this palette can be used in a design (e.g., primary color, accent, background).
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Use gpt-4 if available and preferred
        messages: [{ role: "user", content: prompt }],
        max_tokens: 350,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const output = response.data.choices[0].message.content;
    const palettes = [];
    const recommendations = [];

    output.split("\n\n").forEach((block) => {
      if (block.startsWith("Palette")) {
        const colors = block.match(/#[0-9a-fA-F]{6}/g);
        if (colors) palettes.push(colors);
      } else if (block.trim()) {
        recommendations.push(block.trim());
      }
    });

    res.json({ palettes, recommendations });
  } catch (error) {
    res.status(500).json({ message: "Error generating color suggestions" });
  }
});

// New Endpoint to Generate Color Palette Image
app.post("/api/color-palette-image", async (req, res) => {
  const { palette } = req.body;

  if (!palette || !Array.isArray(palette)) {
    return res.status(400).json({ message: "Invalid color palette" });
  }

  const canvas = createCanvas(300, 60); // Width: 300px, Height: 60px
  const ctx = canvas.getContext("2d");

  // Draw each color in the palette as a rectangle
  palette.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(index * 60, 0, 60, 60); // Each color square is 60x60px
  });

  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
