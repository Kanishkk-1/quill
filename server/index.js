const express = require('express')
const app = express()

app.get("/health", (req, res) => {
  res.send("Welcome mf!");
});



app.listen(3001, () => {
  console.log("Server listening on port 3001");
});