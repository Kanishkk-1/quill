const express = require('express');
const { testConnection, pool } = require('./db');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
testConnection();

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Welcome mf!");
});

// Document routes
app.get("/documents", async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, created_at FROM documents');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: 'Failed to fetch docs' });
  }
});

app.post("/documents", (req, res) => {
  res.json({ message: "POST route working" });
});

app.get("/documents/:id", (req, res) => {
  res.json({ id: req.params.id, message: "GET by ID route working" });
});

app.put("/documents/:id", (req, res) => {
  res.json({ id: req.params.id, message: "PUT route working" });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
