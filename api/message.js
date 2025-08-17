export default function handler(req, res) {
  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { text } = JSON.parse(body);
        res.status(200).json({ reply: `Hello from server! You said: ${text}` });
      } catch (err) {
        res.status(400).json({ reply: "Invalid JSON" });
      }
    });
  } else {
    res.status(200).json({ reply: "Hello from server (GET request)" });
  }
}
