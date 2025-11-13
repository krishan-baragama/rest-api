const express = require("express");

const app = express();

// Add Middleware
app.use(express.json());

// Define Routes
app.get("/", (req, res) => {
  res.json({
    firstName: "John",
    lastName: "Doe"
  });
});

// Define the Port
const PORT = 3000;

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
