const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON bodies

// API route to handle resume data
app.post("/api/generate-resume", (req, res) => {
  const { name, email, phone, experience, education, skills } = req.body;
  
  // Here you can add logic to generate AI-assisted resume or save the data to a database
  // For now, we'll just return the data back
  res.json({
    message: "Resume data received successfully!",
    resume: {
      name,
      email,
      phone,
      experience,
      education,
      skills,
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
