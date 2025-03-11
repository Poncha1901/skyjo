import express from "express";
import path from "path";

const app: express.Application = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3001, () => {
  console.log("Web client listening on *:3001");
});
