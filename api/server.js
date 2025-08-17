import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/message", async (req, res) => {
  const userMessage = req.body.message;
  res.json({ reply: `CodeMentor says: ${userMessage}` });
});

// ❌ Do not use app.listen()
// ✅ Instead export the app (Vercel handles running it)
export default app;
