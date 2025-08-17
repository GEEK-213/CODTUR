export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userMessage = req.body.text;
      res.status(200).json({ reply: `CodeMentor says: ${userMessage}` });
    } catch (error) {
      console.error("Error handling message:", error);
      res.status(500).json({ reply: "⚠️ Server error!" });
    }
  } else {
    res.status(405).json({ reply: "Method not allowed" });
  }
}
