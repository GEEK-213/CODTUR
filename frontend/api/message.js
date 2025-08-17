// frontend/api/message.js

export default function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;

    // Simple test reply
    res.status(200).json({
      reply: `👋 Hi! You said: "${text}"`,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
