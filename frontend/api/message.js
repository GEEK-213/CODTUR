// api/message.js
export default function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;
    res.status(200).json({ reply: `You said: ${text}` });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
